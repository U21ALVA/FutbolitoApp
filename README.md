# ⚽ Fut-Mobile-App - Academia de Fútbol

App móvil desarrollada con **React Native + Expo** para gestión de una academia de fútbol.

---

## 🚀 Usuario de Prueba

Para probar la app usa estas credenciales:

```
DNI: 12345678
Contraseña: password123
Rol: padre
```

---

## 📋 Características Implementadas

### ✅ APP-1: Flujo de Autenticación

- **APP-1.1** - Navegación protegida con React Navigation
- **APP-1.2** - Pantalla Login con DNI y contraseña
- **APP-1.3** - Tokens guardados en SecureStore
- **APP-1.4** - Auto-login automático
- **APP-1.5** - Middleware Authorization en requests

### ✅ APP-2: Perfil de Usuario

- **APP-2.1** - Pantalla "Mi Perfil" con datos del usuario
- **APP-2.2** - Formulario "Cambiar Contraseña"
- **APP-2.3** - Botón "Cerrar Sesión"

### 🔐 Roles Soportados

- `padre` - Padres de familia
- `entrenador` - Entrenadores de la academia
- *(Preparado para escalar a más roles)*

## 🗂️ Estructura del Proyecto (Single Source of Truth)

```
Fut-Mobile-App/
├── src/
│   ├── components/          # Componentes reutilizables UI
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Divider.tsx
│   │   ├── TextInput.tsx
│   │   └── ThemeSwitcher.tsx
│   │
│   ├── navigation/          # Configuración de rutas
│   │   ├── AppNavigator.tsx    # Navegación principal con guards
│   │   └── types.ts            # Tipos centralizados de rutas
│   │
│   ├── screens/             # Pantallas de la app
│   │   ├── LoginScreen.tsx          # Login con DNI/password
│   │   ├── ForgotPasswordScreen.tsx # Recuperar contraseña
│   │   ├── HomeScreen.tsx           # Pantalla inicial autenticada
│   │   └── ProfileScreen.tsx        # Perfil + cambio password
│   │
│   ├── services/            # Integraciones externas
│   │   └── api.ts           # Cliente Axios con middleware Auth
│   │
│   ├── store/               # Estado global (Zustand)
│   │   └── auth.ts          # Store de autenticación
│   │
│   ├── theme/               # Sistema de temas
│   │   ├── colors.ts        # Paleta de colores (light/dark)
│   │   ├── ThemeContext.tsx # Provider de tema
│   │   └── index.ts
│   │
│   ├── types/               # Tipos TypeScript centralizados
│   │   └── auth.ts          # User, UserRole, AuthTokens, AuthState
│   │
│   └── utils/               # Utilidades
│       └── secureStore.ts   # Wrapper de Expo SecureStore
│
├── App.tsx                  # Punto de entrada
├── app.config.js            # Configuración Expo (API_URL)
├── package.json
└── tsconfig.json
```

## 🚀 Instalación y Ejecución

```powershell
# Instalar dependencias
pnpm install

# Iniciar la app
pnpm start

# Presiona 'a' para Android, 'i' para iOS
```

## 🏗️ Arquitectura

- **Tipos**: `src/types/auth.ts` - Tipos centralizados
- **Estado**: `src/store/auth.ts` - Zustand store
- **Navegación**: `src/navigation/` - React Navigation
- **API**: `src/services/api.ts` - Cliente Axios
- **Temas**: `src/theme/` - Colores y estilos

## 🔧 Tecnologías

- React Native + Expo
- TypeScript
- React Navigation
- Zustand (estado global)
- Axios (HTTP)
- React Hook Form + Zod

---

**Desarrollado con React Native + Expo**
