// API Service for FitnessSharks - Handles all backend communication
import API_CONFIG from './api-config.js';

class ApiService {
  constructor() {
    this.baseURL = API_CONFIG.BASE_URL;
    this.timeout = API_CONFIG.TIMEOUT;
  }

  // Helper method to get auth token from localStorage
  getAuthToken() {
    return localStorage.getItem('authToken');
  }

  // Helper method to set auth token
  setAuthToken(token) {
    localStorage.setItem('authToken', token);
  }

  // Helper method to remove auth token
  removeAuthToken() {
    localStorage.removeItem('authToken');
  }

  // Generic request method
  async makeRequest(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const token = this.getAuthToken();
    
    const config = {
      method: options.method || 'GET',
      headers: {
        ...API_CONFIG.HEADERS,
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers
      },
      ...options
    };

    // Add body for POST, PUT, PATCH requests
    if (options.body && config.method !== 'GET') {
      config.body = JSON.stringify(options.body);
    }

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), this.timeout);
      
      config.signal = controller.signal;
      
      const response = await fetch(url, config);
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('API Request failed:', error);
      throw error;
    }
  }

  // Authentication Methods
  async login(credentials) {
    const response = await this.makeRequest(API_CONFIG.ENDPOINTS.AUTH.LOGIN, {
      method: 'POST',
      body: credentials
    });
    
    if (response.token) {
      this.setAuthToken(response.token);
    }
    
    return response;
  }

  async register(userData) {
    return await this.makeRequest(API_CONFIG.ENDPOINTS.AUTH.REGISTER, {
      method: 'POST',
      body: userData
    });
  }

  async logout() {
    try {
      await this.makeRequest(API_CONFIG.ENDPOINTS.AUTH.LOGOUT, {
        method: 'POST'
      });
    } finally {
      this.removeAuthToken();
    }
  }

  async forgotPassword(email) {
    return await this.makeRequest(API_CONFIG.ENDPOINTS.AUTH.FORGOT_PASSWORD, {
      method: 'POST',
      body: { email }
    });
  }

  async resetPassword(token, newPassword) {
    return await this.makeRequest(API_CONFIG.ENDPOINTS.AUTH.RESET_PASSWORD, {
      method: 'POST',
      body: { token, newPassword }
    });
  }

  // User Methods
  async getUserProfile() {
    return await this.makeRequest(API_CONFIG.ENDPOINTS.USERS.PROFILE);
  }

  async updateUserProfile(profileData) {
    return await this.makeRequest(API_CONFIG.ENDPOINTS.USERS.UPDATE_PROFILE, {
      method: 'PUT',
      body: profileData
    });
  }

  async changePassword(passwordData) {
    return await this.makeRequest(API_CONFIG.ENDPOINTS.USERS.CHANGE_PASSWORD, {
      method: 'PUT',
      body: passwordData
    });
  }

  // Workout Methods
  async getAllWorkouts() {
    return await this.makeRequest(API_CONFIG.ENDPOINTS.WORKOUTS.GET_ALL);
  }

  async getWorkoutById(id) {
    const endpoint = API_CONFIG.ENDPOINTS.WORKOUTS.GET_BY_ID.replace(':id', id);
    return await this.makeRequest(endpoint);
  }

  async createWorkout(workoutData) {
    return await this.makeRequest(API_CONFIG.ENDPOINTS.WORKOUTS.CREATE, {
      method: 'POST',
      body: workoutData
    });
  }

  async updateWorkout(id, workoutData) {
    const endpoint = API_CONFIG.ENDPOINTS.WORKOUTS.UPDATE.replace(':id', id);
    return await this.makeRequest(endpoint, {
      method: 'PUT',
      body: workoutData
    });
  }

  async deleteWorkout(id) {
    const endpoint = API_CONFIG.ENDPOINTS.WORKOUTS.DELETE.replace(':id', id);
    return await this.makeRequest(endpoint, {
      method: 'DELETE'
    });
  }

  async getUserWorkouts(userId) {
    const endpoint = API_CONFIG.ENDPOINTS.WORKOUTS.USER_WORKOUTS.replace(':userId', userId);
    return await this.makeRequest(endpoint);
  }

  // Progress Tracking Methods
  async getUserProgress(userId) {
    const endpoint = API_CONFIG.ENDPOINTS.PROGRESS.GET_USER_PROGRESS.replace(':userId', userId);
    return await this.makeRequest(endpoint);
  }

  async addProgress(progressData) {
    return await this.makeRequest(API_CONFIG.ENDPOINTS.PROGRESS.ADD_PROGRESS, {
      method: 'POST',
      body: progressData
    });
  }

  async updateProgress(id, progressData) {
    const endpoint = API_CONFIG.ENDPOINTS.PROGRESS.UPDATE_PROGRESS.replace(':id', id);
    return await this.makeRequest(endpoint, {
      method: 'PUT',
      body: progressData
    });
  }

  // Gym Methods
  async getGymInfo() {
    return await this.makeRequest(API_CONFIG.ENDPOINTS.GYM.GET_INFO);
  }

  async getGymTours() {
    return await this.makeRequest(API_CONFIG.ENDPOINTS.GYM.GET_TOURS);
  }

  async bookGymTour(tourData) {
    return await this.makeRequest(API_CONFIG.ENDPOINTS.GYM.BOOK_TOUR, {
      method: 'POST',
      body: tourData
    });
  }

  // Blog Methods
  async getAllArticles() {
    return await this.makeRequest(API_CONFIG.ENDPOINTS.BLOG.GET_ALL_ARTICLES);
  }

  async getArticle(id) {
    const endpoint = API_CONFIG.ENDPOINTS.BLOG.GET_ARTICLE.replace(':id', id);
    return await this.makeRequest(endpoint);
  }

  // Contact Methods
  async sendContactMessage(messageData) {
    return await this.makeRequest(API_CONFIG.ENDPOINTS.CONTACT.SEND_MESSAGE, {
      method: 'POST',
      body: messageData
    });
  }
}

// Create and export a singleton instance
const apiService = new ApiService();
export default apiService;