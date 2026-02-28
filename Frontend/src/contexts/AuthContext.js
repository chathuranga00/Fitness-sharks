import React, { createContext, useContext, useState, useEffect } from 'react';
import apiService from '../services/apiService';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing session on app load
  useEffect(() => {
    const checkSession = async () => {
      try {
        // First check localStorage for user data
        const savedUser = localStorage.getItem('fitnessSharksUser');
        if (savedUser) {
          const userData = JSON.parse(savedUser);
          
          // Migrate old purchases to new user-specific format
          if (userData.purchases && userData.purchases.length > 0) {
            const existingUserPurchases = JSON.parse(localStorage.getItem(`userPurchases_${userData.username}`) || '[]');
            if (existingUserPurchases.length === 0) {
              // Migrate old purchases
              localStorage.setItem(`userPurchases_${userData.username}`, JSON.stringify(userData.purchases));
            }
          }
          
          // Load user's purchases from localStorage
          const userPurchases = JSON.parse(localStorage.getItem(`userPurchases_${userData.username}`) || '[]');
          userData.purchases = userPurchases;
          setUser(userData);
        }

        // Then verify session with backend
        const sessionResult = await apiService.checkSession();
        if (sessionResult.success && sessionResult.loggedIn) {
          // Session is valid, update user data if needed
          if (!savedUser || savedUser.username !== sessionResult.username) {
            const userInfo = {
              id: sessionResult.userId,
              username: sessionResult.username,
              email: sessionResult.email,
              phone: sessionResult.phone,
              userType: sessionResult.role === 'ADMIN' ? 'admin' : 'member',
              loginTime: new Date().toISOString(),
            };
            // Load user's purchases from localStorage
            const userPurchases = JSON.parse(localStorage.getItem(`userPurchases_${userInfo.username}`) || '[]');
            userInfo.purchases = userPurchases;
            setUser(userInfo);
            localStorage.setItem('fitnessSharksUser', JSON.stringify(userInfo));
          }
        } else {
          // Session invalid, clear local data
          if (savedUser) {
            localStorage.removeItem('fitnessSharksUser');
            setUser(null);
          }
        }
      } catch (error) {
        console.error('Error checking session:', error);
        // Clear invalid session data
        localStorage.removeItem('fitnessSharksUser');
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();
  }, []);

  const login = async (credentials) => {
    try {
      setIsLoading(true);
      const result = await apiService.loginUser(credentials);
      
      if (result.success && result.user) {
        const userInfo = {
          id: result.user.id,
          username: result.user.username,
          email: result.user.email,
          phone: result.user.phone,
          userType: result.user.role === 'ADMIN' ? 'admin' : 'member',
          loginTime: new Date().toISOString(),
        };
        
        // Load user's purchases from localStorage
        const userPurchases = JSON.parse(localStorage.getItem(`userPurchases_${userInfo.username}`) || '[]');
        userInfo.purchases = userPurchases;
        
        console.log('Login successful:', userInfo);
        console.log('User type determined:', userInfo.userType);
        console.log('Backend role:', result.user.role);
        console.log('Phone:', userInfo.phone);
        console.log('Loaded purchases:', userPurchases);
        setUser(userInfo);
        localStorage.setItem('fitnessSharksUser', JSON.stringify(userInfo));
        return { success: true, user: userInfo };
      } else {
        return { success: false, message: result.message || 'Login failed' };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, message: error.message || 'Login failed' };
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (userData) => {
    try {
      setIsLoading(true);
      const role = userData.userType === 'admin' ? 'ADMIN' : 'CUSTOMER';
      const result = await apiService.registerUser(userData, role);
      
      if (result.success && result.user) {
        const userInfo = {
          id: result.user.id,
          username: result.user.username,
          email: result.user.email || userData.email,
          phone: userData.phone,
          userType: result.user.role === 'ADMIN' ? 'admin' : 'member',
          signupTime: new Date().toISOString(),
        };
        
        console.log('Signup successful:', userInfo);
        setUser(userInfo);
        localStorage.setItem('fitnessSharksUser', JSON.stringify(userInfo));
        return { success: true, user: userInfo };
      } else {
        return { success: false, message: result.message || 'Registration failed' };
      }
    } catch (error) {
      console.error('Signup error:', error);
      return { success: false, message: error.message || 'Registration failed' };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await apiService.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
      localStorage.removeItem('fitnessSharksUser');
    }
  };

  const addPurchase = (purchaseData) => {
    if (!user) return;
    
    const newPurchase = {
      id: Date.now(),
      type: purchaseData.type,
      name: purchaseData.name,
      price: purchaseData.price,
      purchaseDate: new Date().toISOString(),
      status: 'active',
      ...purchaseData
    };
    
    let existingPurchases = user.purchases || [];
    
    // If this is a membership, replace any existing membership
    if (purchaseData.type === 'membership') {
      // Remove any existing active memberships
      existingPurchases = existingPurchases.filter(p => p.type !== 'membership' || p.status !== 'active');
    }
    
    // If this is a day pass, don't allow multiple active day passes
    if (purchaseData.type === 'day-pass') {
      // Remove any existing active day passes
      existingPurchases = existingPurchases.filter(p => p.type !== 'day-pass' || p.status !== 'active');
    }
    
    const updatedUser = {
      ...user,
      purchases: [
        ...existingPurchases,
        newPurchase
      ]
    };
    
    // Save purchases per user in localStorage
    localStorage.setItem(`userPurchases_${user.username}`, JSON.stringify(updatedUser.purchases));
    
    setUser(updatedUser);
    localStorage.setItem('fitnessSharksUser', JSON.stringify(updatedUser));
    return updatedUser;
  };

  const removePurchase = (purchaseId) => {
    if (!user) return;
    
    const updatedPurchases = (user.purchases || []).filter(p => p.id !== purchaseId);
    
    const updatedUser = {
      ...user,
      purchases: updatedPurchases
    };
    
    // Save purchases per user in localStorage
    localStorage.setItem(`userPurchases_${user.username}`, JSON.stringify(updatedPurchases));
    
    setUser(updatedUser);
    localStorage.setItem('fitnessSharksUser', JSON.stringify(updatedUser));
    return updatedUser;
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    signup,
    logout,
    addPurchase,
    removePurchase,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
