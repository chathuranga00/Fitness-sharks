// API Configuration for FitnessSharks Frontend-Backend Connection
const API_CONFIG = {
  // Backend base URL - Update this to match your backend server
  BASE_URL: 'http://localhost:5000/api', // Change port if your backend runs on different port
  
  // API endpoints
  ENDPOINTS: {
    // Authentication
    AUTH: {
      LOGIN: '/auth/login',
      REGISTER: '/auth/register',
      LOGOUT: '/auth/logout',
      REFRESH_TOKEN: '/auth/refresh',
      FORGOT_PASSWORD: '/auth/forgot-password',
      RESET_PASSWORD: '/auth/reset-password',
      VERIFY_EMAIL: '/auth/verify-email'
    },
    
    // User Management
    USERS: {
      PROFILE: '/users/profile',
      UPDATE_PROFILE: '/users/profile',
      DELETE_ACCOUNT: '/users/delete',
      CHANGE_PASSWORD: '/users/change-password'
    },
    
    // Workout Plans
    WORKOUTS: {
      GET_ALL: '/workouts',
      GET_BY_ID: '/workouts/:id',
      CREATE: '/workouts',
      UPDATE: '/workouts/:id',
      DELETE: '/workouts/:id',
      USER_WORKOUTS: '/workouts/user/:userId'
    },
    
    // Progress Tracking
    PROGRESS: {
      GET_USER_PROGRESS: '/progress/user/:userId',
      ADD_PROGRESS: '/progress',
      UPDATE_PROGRESS: '/progress/:id',
      DELETE_PROGRESS: '/progress/:id'
    },
    
    // Gym Management
    GYM: {
      GET_INFO: '/gym/info',
      GET_TOURS: '/gym/tours',
      BOOK_TOUR: '/gym/book-tour',
      GET_EQUIPMENT: '/gym/equipment'
    },
    
    // Blog/Articles
    BLOG: {
      GET_ALL_ARTICLES: '/blog/articles',
      GET_ARTICLE: '/blog/articles/:id',
      CREATE_ARTICLE: '/blog/articles',
      UPDATE_ARTICLE: '/blog/articles/:id',
      DELETE_ARTICLE: '/blog/articles/:id'
    },
    
    // Contact
    CONTACT: {
      SEND_MESSAGE: '/contact/send',
      GET_MESSAGES: '/contact/messages'
    }
  },
  
  // Request timeout
  TIMEOUT: 10000,
  
  // Headers
  HEADERS: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
};

export default API_CONFIG;