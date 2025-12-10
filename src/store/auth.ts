// Store de autenticación (Zustand) como Single Source of Truth
import { create } from 'zustand';
import { AuthState, AuthTokens, User } from '../types/auth';
import { api } from '../services/api';
import { clearTokens, getTokens, saveTokens } from '../utils/secureStore';

// ============================================================
// TODO(eliminar líneas 8-9): Bandera para login mock. Borrar cuando backend esté listo
// ============================================================
const MOCK_LOGIN_ENABLED = true;

type Actions = {
  loadFromStorage: () => Promise<void>;
  login: (dni: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  setUser: (user: User | null) => void;
  setTokens: (tokens: AuthTokens | null) => void;
};

type Store = AuthState & Actions;

// Exponer una forma de acceder al store fuera de React (interceptors)
export const getAuthStore = () => useAuthStore;

export const useAuthStore = create<Store>((set, get) => ({
  status: 'idle',
  user: null,
  tokens: null,
  error: null,

  setUser: (user) => set({ user }),
  setTokens: (tokens) => set({ tokens }),

  loadFromStorage: async () => {
    try {
      set({ status: 'loading' });
      const tokens = await getTokens();
      if (tokens?.accessToken) {
        set({ tokens });
        // Intentar recuperar el usuario
        const me = await api.get('/users/me');
        set({ user: me.data as User, status: 'authenticated', error: null });
      } else {
        set({ status: 'unauthenticated', user: null, tokens: null });
      }
    } catch (e) {
      set({ status: 'unauthenticated', user: null, tokens: null, error: 'Sesión inválida' });
      await clearTokens();
    }
  },

  login: async (dni: string, password: string) => {
    try {
      set({ status: 'loading', error: null });
      
      // ============================================================
      // TODO(eliminar líneas 57-69): Bloque de login mock. Borrar completamente
      // ============================================================
      if (MOCK_LOGIN_ENABLED && dni === '12345678' && password === 'password123') {
        const mockUser: User = {
          id: 'mock-1',
          nombre: 'Usuario',
          apellido: 'Demo',
          rol: 'padre',
          dni: '12345678',
          email: 'usuario.demo@example.com',
        };
        set({ user: mockUser, tokens: null, status: 'authenticated', error: null });
        return;
      }
      // ============================================================
      // BACKEND READY - Descomentar líneas 71-82 cuando backend esté listo:
      // ============================================================
      const res = await api.post('/auth/login', { dni, password });
      // Manejo flexible de estructura de respuesta
      const data = res.data || {};
      const accessToken: string = data.accessToken || data.token;
      const refreshToken: string | undefined = data.refreshToken;
      if (!accessToken) throw new Error('Token no recibido');
      await saveTokens(accessToken, refreshToken);
      set({ tokens: { accessToken, refreshToken } });

      // Cargar perfil
      const me = await api.get('/users/me');
      set({ user: me.data as User, status: 'authenticated', error: null });
    } catch (e: any) {
      set({ status: 'unauthenticated', error: e?.message || 'Error al iniciar sesión' });
      throw e;
    }
  },

  logout: async () => {
    await clearTokens();
    set({ status: 'unauthenticated', user: null, tokens: null, error: null });
  },
}));
