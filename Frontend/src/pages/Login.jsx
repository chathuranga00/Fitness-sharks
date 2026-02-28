import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Phone, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function AuthPage({ defaultMode }) {
  const navigate = useNavigate();
  const { login, signup } = useAuth();
  const [isLogin, setIsLogin] = useState(defaultMode === 'signup' ? false : true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    phone: '',
    confirmPassword: '',
    userType: 'member' // 'admin' or 'member'
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear errors when user starts typing
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  // Password strength validation
  const validatePassword = (password) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (password.length < minLength) {
      return 'Password must be at least 8 characters long';
    }
    if (!hasUpperCase) {
      return 'Password must contain at least one uppercase letter';
    }
    if (!hasLowerCase) {
      return 'Password must contain at least one lowercase letter';
    }
    if (!hasNumbers) {
      return 'Password must contain at least one number';
    }
    if (!hasSpecialChar) {
      return 'Password must contain at least one special character';
    }
    return '';
  };

  // Get password strength level
  const getPasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength++;
    return strength;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    const newErrors = {};

    // Validate username for login, email for signup
    if (isLogin) {
      if (!formData.username) {
        newErrors.username = 'Username is required';
      }
    } else {
      if (!formData.email) {
        newErrors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Email is invalid';
      }
    }

    // Validate password
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (!isLogin) {
      const passwordError = validatePassword(formData.password);
      if (passwordError) {
        newErrors.password = passwordError;
      }
    }

    // Validate signup fields
    if (!isLogin) {
      if (!formData.phone) {
        newErrors.phone = 'Phone number is required';
      }
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        if (isLogin) {
          // Real login with backend API
          const credentials = {
            username: formData.username,
            password: formData.password
          };

          const result = await login(credentials);
          
          if (result.success) {
            console.log('Login successful:', result.user);
            console.log('User type from backend:', result.user.userType);
            console.log('Selected user type:', formData.userType);
            
            // Check if user type matches the selected login type
            if (formData.userType === 'admin' && result.user.userType !== 'admin') {
              setErrors({ general: 'These credentials belong to a member account. Please use the member login or contact admin.' });
              return;
            }
            
            if (formData.userType === 'member' && result.user.userType === 'admin') {
              setErrors({ general: 'These credentials belong to an admin account. Please use the admin login.' });
              return;
            }
            
            // Show welcome popup
            const userName = result.user.fullName || result.user.username || 'User';
            
            // Create and show professional welcome notification
            const notification = document.createElement('div');
            notification.className = 'fixed top-6 right-6 bg-white border border-gray-200 shadow-xl rounded-xl px-6 py-4 z-50 transform transition-all duration-300 ease-out max-w-sm';
            notification.style.transform = 'translateX(400px)';
            notification.innerHTML = `
              <div class="flex items-start gap-4">
                <div class="flex-shrink-0 w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <div class="flex-1 min-w-0">
                  <div class="text-sm font-semibold text-gray-900">Login Successful</div>
                  <div class="text-sm text-gray-600 mt-1">Welcome back, ${userName}</div>
                </div>
                <button onclick="this.parentElement.parentElement.remove()" class="flex-shrink-0 text-gray-400 hover:text-gray-600">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
            `;
            document.body.appendChild(notification);
            
            // Animate in
            setTimeout(() => {
              notification.style.transform = 'translateX(0)';
            }, 100);
            
            // Auto-remove after 5 seconds with animation
            setTimeout(() => {
              if (document.body.contains(notification)) {
                notification.style.transform = 'translateX(400px)';
                setTimeout(() => {
                  if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                  }
                }, 300);
              }
            }, 5000);
            
            // Redirect based on user type
            if (result.user.userType === 'admin') {
              console.log('Redirecting to admin dashboard...');
              navigate('/admin-dashboard');
            } else {
              console.log('Redirecting to home...');
              navigate('/');
            }
          } else {
            // Show error message
            setErrors({ general: result.message || 'Login failed. Please check your credentials.' });
          }
        } else {
          // Real signup with backend API
          const userData = {
            email: formData.email,
            password: formData.password,
            phone: formData.phone,
            userType: 'member' // Force member type for signup
          };

          const result = await signup(userData);
          
          if (result.success) {
            console.log('Account created successfully:', result.user);
            // Always redirect to home for new member signups
            navigate('/');
          } else {
            // Show error message
            setErrors({ general: result.message || 'Registration failed. Please try again.' });
          }
        }
      } catch (error) {
        console.error('Authentication error:', error);
        setErrors({ general: 'An error occurred. Please try again.' });
      }
    }

    setIsSubmitting(false);
  };

  const handleSocialLogin = (provider) => {
    alert(`${provider} login coming soon!`);
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500">
      {/* Back Button */}
      <button
        onClick={() => navigate('/')}
        className="absolute flex items-center gap-2 font-semibold text-white transition top-6 left-6 hover:opacity-80"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Home
      </button>

      {/* Auth Card */}
      <div className="w-full max-w-md overflow-hidden bg-white shadow-2xl rounded-3xl">
        {/* Header */}
        <div className={`p-8 text-center text-white ${formData.userType === 'admin'
          ? 'bg-gradient-to-r from-purple-600 to-pink-600'
          : 'bg-gradient-to-r from-blue-600 to-purple-600'
          }`}>
          <div className="mb-4 text-5xl">
            {formData.userType === 'admin' ? '👑' : '🦈'}
          </div>
          <h2 className="mb-2 text-3xl font-bold">
            {isLogin ? 'Welcome Back!' : 'Join Fitness Sharks'}
          </h2>
          <p className="opacity-90">
            {isLogin
              ? formData.userType === 'admin'
                ? 'Admin login to manage the platform'
                : 'Login to continue your fitness journey'
              : 'Start your fitness transformation today'
            }
          </p>
        </div>

        {/* Form */}
        <div className="p-8">
          <div className="space-y-4">
            {/* User Type Selection */}
            <div>
              <label className="block mb-3 text-sm font-semibold text-gray-700">
                {isLogin ? 'Login as' : 'Sign up as'}
              </label>
              {isLogin ? (
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, userType: 'member' })}
                    className={`p-4 rounded-xl border-2 transition-all ${formData.userType === 'member'
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 hover:border-gray-300'
                      }`}
                  >
                    <div className="flex flex-col items-center gap-2">
                      <div className="text-2xl">🦈</div>
                      <div className="font-semibold">Member</div>
                      <div className="text-xs text-gray-500">Fitness Sharks Member</div>
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, userType: 'admin' })}
                    className={`p-4 rounded-xl border-2 transition-all ${formData.userType === 'admin'
                      ? 'border-purple-500 bg-purple-50 text-purple-700'
                      : 'border-gray-200 hover:border-gray-300'
                      }`}
                  >
                    <div className="flex flex-col items-center gap-2">
                      <div className="text-2xl">👑</div>
                      <div className="font-semibold">Admin</div>
                      <div className="text-xs text-gray-500">Administrator</div>
                    </div>
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-3">
                  <div className="p-4 rounded-xl border-2 border-blue-500 bg-blue-50 text-blue-700">
                    <div className="flex flex-col items-center gap-2">
                      <div className="text-2xl">🦈</div>
                      <div className="font-semibold">Member</div>
                      <div className="text-xs text-gray-500">Join as a Fitness Sharks Member</div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Username for Login, Email for Signup */}
            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-700">
                {isLogin ? 'Username' : 'Email Address'}
              </label>
              <div className="relative">
                {isLogin ? (
                  <User className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                ) : (
                  <Mail className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                )}
                <input
                  type={isLogin ? "text" : "email"}
                  name={isLogin ? "username" : "email"}
                  value={isLogin ? formData.username : formData.email}
                  onChange={handleChange}
                  placeholder={isLogin ? "Enter your username" : "you@example.com"}
                  className={`w-full py-3 pl-12 pr-4 transition border-2 rounded-xl focus:outline-none ${
                    (isLogin ? errors.username : errors.email) 
                      ? 'border-red-500 focus:border-red-500' 
                      : 'border-gray-200 focus:border-blue-500'
                  }`}
                />
              </div>
              {isLogin ? (
                errors.username && (
                  <p className="mt-1 text-sm text-red-600">{errors.username}</p>
                )
              ) : (
                errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )
              )}
            </div>

            {/* Phone - Signup Only */}
            {!isLogin && (
              <div>
                <label className="block mb-2 text-sm font-semibold text-gray-700">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 (555) 123-4567"
                    className={`w-full py-3 pl-12 pr-4 transition border-2 rounded-xl focus:outline-none ${errors.phone ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-blue-500'
                      }`}
                  />
                </div>
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                )}
              </div>
            )}

            {/* Password */}
            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-700">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  autoComplete="new-password"
                  className={`w-full py-3 pl-12 pr-12 transition border-2 rounded-xl focus:outline-none ${errors.password ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-blue-500'
                    }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute text-gray-400 transform -translate-y-1/2 right-3 top-1/2 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
              )}

              {/* Password Strength Indicator - Only for Signup */}
              {!isLogin && formData.password && (
                <div className="mt-2">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs text-gray-600">Password strength:</span>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((level) => (
                        <div
                          key={level}
                          className={`h-1 w-4 rounded ${level <= getPasswordStrength(formData.password)
                            ? getPasswordStrength(formData.password) <= 2
                              ? 'bg-red-500'
                              : getPasswordStrength(formData.password) <= 3
                                ? 'bg-yellow-500'
                                : 'bg-green-500'
                            : 'bg-gray-200'
                            }`}
                        />
                      ))}
                    </div>
                    <span className={`text-xs font-medium ${getPasswordStrength(formData.password) <= 2
                      ? 'text-red-600'
                      : getPasswordStrength(formData.password) <= 3
                        ? 'text-yellow-600'
                        : 'text-green-600'
                      }`}>
                      {getPasswordStrength(formData.password) <= 2
                        ? 'Weak'
                        : getPasswordStrength(formData.password) <= 3
                          ? 'Medium'
                          : 'Strong'}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Confirm Password - Signup Only */}
            {!isLogin && (
              <div>
                <label className="block mb-2 text-sm font-semibold text-gray-700">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className={`w-full py-3 pl-12 pr-12 transition border-2 rounded-xl focus:outline-none ${errors.confirmPassword ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-blue-500'
                      }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute text-gray-400 transform -translate-y-1/2 right-3 top-1/2 hover:text-gray-600"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
                )}
                {formData.confirmPassword && formData.password === formData.confirmPassword && (
                  <p className="mt-1 text-sm text-green-600">✓ Passwords match</p>
                )}
              </div>
            )}

            {/* Forgot Password - Login Only */}
            {isLogin && (
              <div className="text-right">
                <button
                  type="button"
                  className="text-sm font-semibold text-blue-600 hover:text-blue-700"
                >
                  Forgot Password?
                </button>
              </div>
            )}

            {/* General Error Message */}
            {errors.general && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
                <div className="text-sm text-red-800">
                  {errors.general}
                </div>
              </div>
            )}



            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className={`w-full py-3 rounded-xl font-bold text-lg transition transform shadow-lg ${isSubmitting
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:scale-[1.02]'
                } text-white`}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  {isLogin ? 'Logging in...' : 'Creating Account...'}
                </div>
              ) : (
                isLogin ? 'Login' : 'Create Account'
              )}
            </button>
          </div>



          {/* Toggle Login/Signup */}
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button
                type="button"
                onClick={() => {
                  setIsLogin(!isLogin);
                  setErrors({}); // Clear errors
                  // Clear form data and set appropriate defaults
                  if (isLogin) {
                    // Switching to signup mode
                    setFormData({ 
                      username: '',
                      email: '',
                      password: '',
                      phone: '',
                      confirmPassword: '',
                      userType: 'member' 
                    });
                  } else {
                    // Switching to login mode
                    setFormData({ 
                      username: '',
                      email: '',
                      password: '',
                      phone: '',
                      confirmPassword: '',
                      userType: 'member' 
                    });
                  }
                }}
                className="font-bold text-blue-600 hover:text-blue-700"
              >
                {isLogin ? 'Sign Up' : 'Login'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}