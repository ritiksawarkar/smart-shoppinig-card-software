/**
 * Authentication Service for Smart Shopping Cart Admin Portal
 * 
 * Provides modular authentication API functions.
 * Currently uses simulated asynchronous API calls for frontend prototype,
 * structured for direct replacement with real REST API endpoints (Axios/Fetch).
 */

const STORAGE_KEY_USER = 'smartcart_admin_user';
const STORAGE_KEY_TOKEN = 'smartcart_admin_token';

// Helper to determine active storage (localStorage vs sessionStorage)
const getStorage = () => {
  if (localStorage.getItem(STORAGE_KEY_USER)) {
    return localStorage;
  }
  return sessionStorage;
};

export const authService = {
  /**
   * Admin Login function
   * @param {Object} credentials - { username, password, rememberMe }
   * @returns {Promise<Object>} User object and auth token
   */
  async login({ username, password, rememberMe = false }) {
    // Simulate backend network latency
    await new Promise((resolve) => setTimeout(resolve, 700));

    const cleanUsername = username.trim();
    const cleanPassword = password.trim();

    // Basic credentials validation
    if (!cleanUsername || !cleanPassword) {
      throw new Error('Email or username and password are required.');
    }

    // Demo Authentication Rule
    // Accepts "admin@smartcart.com" / "admin123" OR "admin" / "admin123" OR any valid demo credentials
    // Rejects obviously invalid tests like "wrong" or incorrect passwords if specific demo check is targeted
    if (cleanUsername.toLowerCase() === 'error' || cleanPassword === 'wrongpass') {
      throw new Error('Invalid email/username or password.');
    }

    // Generate mock admin user response
    const user = {
      id: 'adm_01',
      name: 'System Administrator',
      email: cleanUsername.includes('@') ? cleanUsername : `${cleanUsername}@smartcart.internal`,
      username: cleanUsername,
      role: 'Super Admin',
      storeLocation: 'Main Supermarket Branch #01',
      lastLogin: new Date().toISOString(),
    };

    const token = `mock_jwt_token_${Date.now()}`;

    // Select storage based on Remember Me option
    const targetStorage = rememberMe ? localStorage : sessionStorage;
    
    // Clear old tokens from both storages first
    localStorage.removeItem(STORAGE_KEY_USER);
    localStorage.removeItem(STORAGE_KEY_TOKEN);
    sessionStorage.removeItem(STORAGE_KEY_USER);
    sessionStorage.removeItem(STORAGE_KEY_TOKEN);

    // Save session
    targetStorage.setItem(STORAGE_KEY_USER, JSON.stringify(user));
    targetStorage.setItem(STORAGE_KEY_TOKEN, token);

    return { user, token };
  },

  /**
   * Admin Logout function
   */
  logout() {
    localStorage.removeItem(STORAGE_KEY_USER);
    localStorage.removeItem(STORAGE_KEY_TOKEN);
    sessionStorage.removeItem(STORAGE_KEY_USER);
    sessionStorage.removeItem(STORAGE_KEY_TOKEN);
  },

  /**
   * Get current authenticated user from storage
   * @returns {Object|null}
   */
  getCurrentUser() {
    const storage = getStorage();
    const userStr = storage.getItem(STORAGE_KEY_USER);
    if (!userStr) return null;
    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  },

  /**
   * Get current auth token
   * @returns {string|null}
   */
  getToken() {
    const storage = getStorage();
    return storage.getItem(STORAGE_KEY_TOKEN);
  },

  /**
   * Check if session exists
   * @returns {boolean}
   */
  isAuthenticated() {
    return Boolean(this.getToken() && this.getCurrentUser());
  }
};
