// Single Source of Truth: Tipos centrales de Autenticación y Usuario
// Roles vigentes: padre y entrenador (se elimina hijo/admin para este alcance)

export type UserRole = 'padre' | 'entrenador';

export interface User {
  id: string;
  nombre: string;
  apellido?: string;
  rol: UserRole; // padre | entrenador
  email?: string;
  dni?: string;
}

export interface AuthTokens {
  accessToken: string; // Usado en Authorization: Bearer
  refreshToken?: string; // Opcional, según backend
}

export interface AuthState {
  status: 'idle' | 'loading' | 'authenticated' | 'unauthenticated';
  user: User | null;
  tokens: AuthTokens | null;
  error?: string | null;
}
