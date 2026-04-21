// src/services/api.ts
// API service for connecting to the backend server

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

/**
 * Fetch wrapper with error handling
 */
async function apiCall(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  const token = localStorage.getItem('token');

  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });

    // Handle 401 - token expired or invalid
    if (response.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/signin';
    }

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'API error');
    }

    return data;
  } catch (error) {
    console.error(`API Error: ${endpoint}`, error);
    throw error;
  }
}

// ============================================
// Authentication API
// ============================================

export const authAPI = {
  signup: async (name, email, password) => {
    const response = await apiCall('/api/auth/signup', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    });
    
    if (response.data?.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    
    return response.data;
  },

  signin: async (email, password) => {
    const response = await apiCall('/api/auth/signin', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    
    if (response.data?.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getToken: () => localStorage.getItem('token'),
  getUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },
};

// ============================================
// Products API
// ============================================

export const productsAPI = {
  getAll: async () => {
    const response = await apiCall('/api/products', { method: 'GET' });
    return response.data;
  },

  getById: async (id) => {
    const response = await apiCall(`/api/products/${id}`, { method: 'GET' });
    return response.data;
  },

  add: async (productUrl, targetPrice) => {
    const response = await apiCall('/api/products', {
      method: 'POST',
      body: JSON.stringify({ productUrl, targetPrice }),
    });
    return response.data;
  },

  update: async (id, updates) => {
    const response = await apiCall(`/api/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
    return response.data;
  },

  delete: async (id) => {
    await apiCall(`/api/products/${id}`, { method: 'DELETE' });
  },

  getPriceHistory: async (id, limit = 100, skip = 0) => {
    const response = await apiCall(
      `/api/products/${id}/history?limit=${limit}&skip=${skip}`,
      { method: 'GET' }
    );
    return response.data;
  },
};

// ============================================
// Health Check API
// ============================================

export const healthAPI = {
  check: async () => {
    try {
      const response = await apiCall('/api/health', { method: 'GET' });
      return response.success;
    } catch (error) {
      return false;
    }
  },
};
