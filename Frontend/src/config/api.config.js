// API Configuration for FitnessSharks Frontend
export const API_CONFIG = {
  // Backend URL - Update this to match your backend server
  BASE_URL: process.env.REACT_APP_API_URL || '/api',
  
  // Alternative URLs to try if the main URL fails
  FALLBACK_URLS: [
    '/api',
    'http://localhost:8080/api',
    'http://localhost:8080',
    'http://127.0.0.1:8080/api',
    'http://127.0.0.1:8080'
  ],
  
  // Request timeout in milliseconds
  TIMEOUT: 10000,
  
  // Enable credentials (cookies, authorization headers)
  WITH_CREDENTIALS: false, // Disable by default to avoid CORS issues
  
  // API endpoints
  ENDPOINTS: {
    HEALTH: '/auth/session', // Use session check as health check
    REGISTER: '/auth/register',
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    SESSION: '/auth/session',
    USERS: '/users'
  },
  
  // Default headers
  HEADERS: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
};

// Environment-specific configurations
export const ENV_CONFIG = {
  development: {
    BASE_URL: '/api', // Use relative URL with proxy
    DEBUG: true
  },
  production: {
    BASE_URL: 'https://your-production-domain.com/api',
    DEBUG: false
  }
};

// Get current environment config
export const getCurrentConfig = () => {
  const env = process.env.NODE_ENV || 'development';
  return {
    ...API_CONFIG,
    ...ENV_CONFIG[env]
  };
};