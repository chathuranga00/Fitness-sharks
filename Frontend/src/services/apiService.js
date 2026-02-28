// API Service for FitnessSharks Backend Integration using Axios
import axios from 'axios';
import { getCurrentConfig } from '../config/api.config';

const config = getCurrentConfig();

class ApiService {
  constructor() {
    this.baseURL = config.BASE_URL;
    this.api = null;
    this.initializeApi();
  }

  initializeApi() {
    // Create axios instance with default configuration
    this.api = axios.create({
      baseURL: this.baseURL,
      timeout: config.TIMEOUT,
      headers: config.HEADERS,
      withCredentials: true, // Enable credentials for authenticated requests
    });

    // Add response interceptor for better error handling
    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        console.error('API Error Details:', {
          message: error.message,
          code: error.code,
          response: error.response,
          request: error.request,
          config: error.config
        });
        
        if (error.response) {
          // Server responded with error status
          const message = error.response.data?.message || 
                         error.response.data?.error || 
                         `Server error: ${error.response.status}`;
          throw new Error(message);
        } else if (error.request) {
          // Request was made but no response received - likely CORS or network issue
          if (error.code === 'ERR_NETWORK') {
            throw new Error('Network error: Cannot reach backend server. Check if backend is running on port 8080 and CORS is configured.');
          } else if (error.code === 'ECONNREFUSED') {
            throw new Error('Connection refused: Backend server is not running on port 8080.');
          } else {
            throw new Error(`Connection error (${error.code}): Cannot connect to backend server.`);
          }
        } else {
          // Something else happened
          throw new Error(`Request error: ${error.message}`);
        }
      }
    );
  }

  // Try different backend URLs to find the working one
  async findWorkingBackendUrl() {
    const testEndpoints = ['/trainers', '/memberships', '/plans'];
    
    for (const url of config.FALLBACK_URLS) {
      console.log(`Testing URL: ${url}`);
      
      for (const endpoint of testEndpoints) {
        try {
          const testApi = axios.create({
            baseURL: url,
            timeout: 5000,
            withCredentials: false, // Disable credentials for testing
          });
          
          console.log(`Testing: ${url}${endpoint}`);
          const response = await testApi.get(endpoint);
          
          // If we get here, the connection worked
          this.baseURL = url;
          this.initializeApi();
          console.log(`✅ Successfully connected to backend at: ${url}${endpoint}`);
          return true;
        } catch (error) {
          console.log(`❌ Failed ${url}${endpoint}:`, error.message);
          continue;
        }
      }
    }
    
    console.log('❌ All connection attempts failed');
    return false;
  }

  // Test backend connection
  async testConnection() {
    console.log('Testing connection to:', this.baseURL);
    
    // Try different approaches to test the connection
    const testEndpoints = [
      '/trainers',
      '/memberships', 
      '/plans'
    ];

    for (const endpoint of testEndpoints) {
      try {
        console.log(`Trying endpoint: ${this.baseURL}${endpoint}`);
        
        // Use the main API instance for testing
        const response = await this.api.get(endpoint);
        console.log(`✅ Success! Connected to ${endpoint}:`, response.data);
        
        return {
          success: true,
          message: `Backend connection successful! Connected via ${this.baseURL}${endpoint} and found ${response.data?.length || 0} items.`,
          data: response.data,
          url: this.baseURL,
          endpoint: endpoint
        };
      } catch (error) {
        console.log(`❌ Failed to connect to ${endpoint}:`, error.message);
        continue;
      }
    }

    // If all endpoints fail, try different base URLs
    console.log('All endpoints failed with current URL, trying alternatives...');
    const foundWorking = await this.findWorkingBackendUrl();
    if (foundWorking) {
      return await this.testConnection(); // Retry with new URL
    }

    return {
      success: false,
      message: 'Cannot connect to backend server. Please ensure it is running on port 8080. If using development mode, restart the frontend server to activate the proxy.',
      url: this.baseURL
    };
  }

  // User Registration (Signup)
  async registerUser(userData, role = 'CUSTOMER') {
    try {
      // Create username from fullName or email
      const username = userData.fullName 
        ? userData.fullName.replace(/\s+/g, '').toLowerCase()
        : userData.email.split('@')[0];

      const response = await this.api.post(config.ENDPOINTS.REGISTER, {
        username: username,
        email: userData.email,
        password: userData.password,
        fullName: userData.fullName,
        phone: userData.phone
      });

      // AuthController returns { msg: "created" }
      if (response.data && response.data.msg === 'created') {
        return {
          success: true,
          message: 'Registration successful',
          user: {
            username: username,
            email: userData.email,
            role: role
          }
        };
      } else {
        return {
          success: false,
          message: 'Registration failed'
        };
      }
    } catch (error) {
      return {
        success: false,
        message: error.message
      };
    }
  }

  // User Login
  async loginUser(credentials) {
    try {
      const response = await this.api.post(config.ENDPOINTS.LOGIN, {
        username: credentials.username, // Use username directly
        password: credentials.password
      });

      // AuthController returns { msg: "logged-in", user: {...} }
      if (response.data && response.data.msg === 'logged-in') {
        const userData = response.data.user;
        
        console.log('API Login - User data:', userData);
        
        return {
          success: true,
          message: 'Login successful',
          user: {
            id: userData.id,
            username: userData.username,
            email: userData.email,
            phone: userData.phone,
            role: userData.role
          }
        };
      } else {
        return {
          success: false,
          message: 'Login failed'
        };
      }
    } catch (error) {
      return {
        success: false,
        message: error.message
      };
    }
  }

  // Check Session
  async checkSession() {
    try {
      const response = await this.api.get(config.ENDPOINTS.SESSION);
      
      // AuthController returns { user: "username", userId, email, phone, role }
      if (response.data && response.data.user) {
        console.log('Session Check - User data:', response.data);
        
        return {
          success: true,
          loggedIn: true,
          username: response.data.user,
          userId: response.data.userId,
          email: response.data.email,
          phone: response.data.phone,
          role: response.data.role
        };
      } else {
        return {
          success: false,
          loggedIn: false,
          message: 'No active session'
        };
      }
    } catch (error) {
      return {
        success: false,
        loggedIn: false,
        message: error.message
      };
    }
  }

  // Logout
  async logout() {
    try {
      const response = await this.api.post(config.ENDPOINTS.LOGOUT);
      
      // AuthController returns { msg: "logged out" }
      if (response.data && response.data.msg === 'logged out') {
        return {
          success: true,
          message: 'Logged out successfully'
        };
      } else {
        return {
          success: false,
          message: 'Logout failed'
        };
      }
    } catch (error) {
      return {
        success: false,
        message: error.message
      };
    }
  }

  // Get all users (for admin)
  async getAllUsers() {
    try {
      const response = await this.api.get(config.ENDPOINTS.USERS);
      return {
        success: true,
        users: response.data
      };
    } catch (error) {
      return {
        success: false,
        message: error.message
      };
    }
  }

  // ===== TRAINER MANAGEMENT =====
  
  // Get all trainers
  async getAllTrainers() {
    try {
      const response = await this.api.get('/trainers');
      return {
        success: true,
        trainers: response.data
      };
    } catch (error) {
      return {
        success: false,
        message: error.message
      };
    }
  }

  // Get trainer by ID
  async getTrainerById(id) {
    try {
      const response = await this.api.get(`/trainers/${id}`);
      return {
        success: true,
        trainer: response.data
      };
    } catch (error) {
      return {
        success: false,
        message: error.message
      };
    }
  }

  // Add new trainer (admin only)
  async addTrainer(trainerData) {
    try {
      const response = await this.api.post('/trainers', trainerData);
      return {
        success: true,
        trainer: response.data,
        message: 'Trainer added successfully'
      };
    } catch (error) {
      return {
        success: false,
        message: error.message
      };
    }
  }

  // Update trainer (admin only)
  async updateTrainer(id, trainerData) {
    try {
      const response = await this.api.put(`/trainers/${id}`, trainerData);
      return {
        success: true,
        trainer: response.data,
        message: 'Trainer updated successfully'
      };
    } catch (error) {
      return {
        success: false,
        message: error.message
      };
    }
  }

  // Delete trainer (admin only)
  async deleteTrainer(id) {
    try {
      await this.api.delete(`/trainers/${id}`);
      return {
        success: true,
        message: 'Trainer deleted successfully'
      };
    } catch (error) {
      return {
        success: false,
        message: error.message
      };
    }
  }

  // ===== MEMBERSHIP MANAGEMENT =====
  
  // Get all memberships
  async getAllMemberships() {
    try {
      const response = await this.api.get('/memberships');
      return {
        success: true,
        memberships: response.data
      };
    } catch (error) {
      return {
        success: false,
        message: error.message
      };
    }
  }

  // Get membership by ID
  async getMembershipById(id) {
    try {
      const response = await this.api.get(`/memberships/${id}`);
      return {
        success: true,
        membership: response.data
      };
    } catch (error) {
      return {
        success: false,
        message: error.message
      };
    }
  }

  // Create membership (admin only)
  async createMembership(membershipData) {
    try {
      const response = await this.api.post('/memberships', membershipData);
      return {
        success: true,
        membership: response.data,
        message: 'Membership created successfully'
      };
    } catch (error) {
      return {
        success: false,
        message: error.message
      };
    }
  }

  // Update membership (admin only)
  async updateMembership(id, membershipData) {
    try {
      const response = await this.api.put(`/memberships/${id}`, membershipData);
      return {
        success: true,
        membership: response.data,
        message: 'Membership updated successfully'
      };
    } catch (error) {
      return {
        success: false,
        message: error.message
      };
    }
  }

  // Delete membership (admin only)
  async deleteMembership(id) {
    try {
      await this.api.delete(`/memberships/${id}`);
      return {
        success: true,
        message: 'Membership deleted successfully'
      };
    } catch (error) {
      return {
        success: false,
        message: error.message
      };
    }
  }

  // ===== TRAINING PLANS MANAGEMENT =====
  
  // Get all training plans
  async getAllPlans() {
    try {
      const response = await this.api.get('/plans');
      return {
        success: true,
        plans: response.data
      };
    } catch (error) {
      return {
        success: false,
        message: error.message
      };
    }
  }

  // Create training plan (admin only)
  async createPlan(planData) {
    try {
      const response = await this.api.post('/plans', planData);
      return {
        success: true,
        plan: response.data,
        message: 'Training plan created successfully'
      };
    } catch (error) {
      return {
        success: false,
        message: error.message
      };
    }
  }

  // Update training plan (admin only)
  async updatePlan(id, planData) {
    try {
      const response = await this.api.put(`/plans/${id}`, planData);
      return {
        success: true,
        plan: response.data,
        message: 'Training plan updated successfully'
      };
    } catch (error) {
      return {
        success: false,
        message: error.message
      };
    }
  }

  // Delete training plan (admin only)
  async deletePlan(id) {
    try {
      const response = await this.api.delete(`/plans/${id}`);
      return {
        success: true,
        message: response.data || 'Training plan deleted successfully'
      };
    } catch (error) {
      return {
        success: false,
        message: error.message
      };
    }
  }

  // ===== SUBSCRIPTION MANAGEMENT =====
  
  // Subscribe user to membership and optional plan
  async subscribeUser(userId, membershipId, planId = null) {
    try {
      const params = new URLSearchParams({
        userId: userId,
        membershipId: membershipId
      });
      if (planId) {
        params.append('planId', planId);
      }
      
      const response = await this.api.post(`/subscriptions/subscribe?${params}`);
      return {
        success: true,
        subscription: response.data,
        message: 'Subscription created successfully'
      };
    } catch (error) {
      return {
        success: false,
        message: error.message
      };
    }
  }

  // Get all subscriptions (admin)
  async getAllSubscriptions() {
    try {
      const response = await this.api.get('/subscriptions');
      return {
        success: true,
        subscriptions: response.data
      };
    } catch (error) {
      return {
        success: false,
        message: error.message
      };
    }
  }

  // Get user subscriptions
  async getUserSubscriptions(userId) {
    try {
      const response = await this.api.get(`/subscriptions/user/${userId}`);
      return {
        success: true,
        subscriptions: response.data
      };
    } catch (error) {
      return {
        success: false,
        message: error.message
      };
    }
  }

  // Delete user (admin only)
  async deleteUser(userId) {
    try {
      console.log('Attempting to delete user with ID:', userId);
      const response = await this.api.delete(`/users/${userId}`);
      console.log('Delete user response:', response.data);
      return {
        success: true,
        message: response.data?.message || 'User deleted successfully'
      };
    } catch (error) {
      console.error('Delete user error:', error);
      return {
        success: false,
        message: error.response?.data?.message || error.message || 'Failed to delete user'
      };
    }
  }
}

// Create and export API instance
const apiService = new ApiService();
export default apiService;