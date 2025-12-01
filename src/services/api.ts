// Cliente Axios con middleware Authorization y baseURL desde app.config.js
import axios from 'axios';
import Constants from 'expo-constants';
import { getAuthStore } from '../store/auth';

const API_URL = (Constants.expoConfig?.extra as any)?.API_URL || 'http://10.0.2.2:3000/api';

export const api = axios.create({
  baseURL: API_URL,
});

// Interceptor para añadir Authorization automáticamente
api.interceptors.request.use((config) => {
  const store = getAuthStore();
  const token = store.getState().tokens?.accessToken;
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Opcional: manejar 401 para logout futuro / refresh
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    // Aquí podríamos intentar refresh o redirigir al login si 401
    if (error?.response?.status === 401) {
      const store = getAuthStore();
      // Evitar loop si ya estamos desautenticados
      if (store.getState().status === 'authenticated') {
        // Logout silencioso
        store.getState().logout();
      }
    }
    return Promise.reject(error);
  },
);
