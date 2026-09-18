import axios from 'axios';

// Use the configured API or the Vite/production same-origin API route.
export const API_URL = (import.meta.env.VITE_API_URL || '/api').replace(/\/$/, '');
export const API_ORIGIN = new URL(API_URL, window.location.origin).origin;

export const getApiAssetUrl = (path: string) =>
  path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:') || path.startsWith('blob:')
    ? path
    : `${API_ORIGIN}${path.startsWith('/') ? path : `/${path}`}`;

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add response interceptor for better error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    const isLoginRequest = String(error.config?.url || '').endsWith('/admin/login');
    if (error.response?.status === 401 && !isLoginRequest) {
      localStorage.removeItem('adminToken');
      window.location.href = '/admin/login';
    }
    return Promise.reject(error);
  }
);

// Gallery APIs
export const galleryAPI = {
  getAll: () => api.get('/gallery'),
  getById: (id: string) => api.get(`/gallery/${id}`),
  create: (data: FormData) => api.post('/gallery', data, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  update: (id: string, data: FormData) => api.put(`/gallery/${id}`, data, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  delete: (id: string) => api.delete(`/gallery/${id}`),
};

// Career APIs
export const careerAPI = {
  getAll: () => api.get('/careers'),
  getAllAdmin: () => api.get('/careers/all'),
  getById: (id: string) => api.get(`/careers/${id}`),
  create: (data: any) => {
    console.log('Sending create request with data:', data);
    return api.post('/careers', data);
  },
  update: (id: string, data: any) => {
    console.log('Sending update request for ID:', id, 'with data:', data);
    return api.put(`/careers/${id}`, data);
  },
  delete: (id: string) => api.delete(`/careers/${id}`),
};

// Blog APIs
export const blogAPI = {
  getAll: () => api.get('/blogs'),
  getAllAdmin: () => api.get('/blogs/admin/all'),
  getBySlug: (slug: string) => api.get(`/blogs/slug/${slug}`),
  getById: (id: string) => api.get(`/blogs/${id}`),
  create: (data: FormData) => api.post('/blogs', data, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  update: (id: string, data: FormData) => api.put(`/blogs/${id}`, data, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  delete: (id: string) => api.delete(`/blogs/${id}`),
};

// Add this to your api.ts file after blogAPI

// Project APIs
export const projectAPI = {
  getAll: (params?: { category?: string; featured?: boolean }) => {
    const queryParams = new URLSearchParams();
    if (params?.category) queryParams.append('category', params.category);
    if (params?.featured) queryParams.append('featured', 'true');
    const queryString = queryParams.toString();
    return api.get(`/projects${queryString ? `?${queryString}` : ''}`);
  },
  getById: (id: string) => api.get(`/projects/${id}`),
  getCategories: () => api.get('/projects/categories'),
  create: (data: FormData) => api.post('/projects', data, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  update: (id: string, data: FormData) => api.put(`/projects/${id}`, data, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  delete: (id: string) => api.delete(`/projects/${id}`),
};
// Admin API
export const adminAPI = {
  login: (email: string, password: string) => api.post('/admin/login', { email, password }),
};


export default api;
