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

## 📱 Funcionalidades Principales

### 🏠 Pantalla de Inicio
- Bienvenida personalizada con el nombre del usuario
- **CUADRO 1**: Entrenamiento del día (HOY) con toda la información
  - Horario, campo, objetivo, material necesario
  - Al presionar se ven los detalles completos
- **CUADRO 2**: Próximos eventos (entrenamientos y partidos)

### 📅 Calendario
- Vista de eventos programados por semana
- Información completa de partidos (uniforme, llegada, aparcamiento, contacto)
- Confirmación de asistencia para cada evento
- Previsión meteorológica

### 📋 Detalles de Entrenamiento
- **CUADRO 3**: Estados según el momento
  - **Próximo**: Objetivos específicos, observaciones del entrenador, material requerido
  - **En curso**: Tiempo transcurrido, asistencia, ejercicios en progreso
  - **Completado**: Reporte detallado con valoraciones y ejercicios realizados

### 👤 Perfil de Usuario
- Información personal (nombre, rol, DNI)
- Cambiar contraseña
- Cerrar sesión

### 🎨 Navegación
- Barra de navegación inferior con 3 secciones:
  - 🏠 Inicio
  - 📅 Calendario
  - 👤 Perfil
- Avatar en el header con color según el rol (padre: verde, entrenador: verde oscuro)

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
- React Navigation (Stack + Drawer)
- Zustand (estado global)
- Axios (HTTP)
- React Hook Form + Zod
- Expo SecureStore

## 🏗️ Arquitectura y Patrones

### ✅ Estado Global con Zustand
- Store centralizado en `src/store/auth.ts`
- Gestión de autenticación, usuario y tokens
- Accesible desde cualquier componente vía hooks

### ✅ Componentes Reutilizables
Todos en `src/components/`:
- `Button`, `Card`, `TextInput`, `Divider`
- `TrainingCard`, `EventCard`
- `ThemeSwitcher`
- Exportados mediante barril (barrel) en `index.ts`

### ✅ Sistema de Temas (Claro/Oscuro)
- Paleta Green House personalizada (11 tonos)
- ThemeContext con `useTheme()` hook
- Soporte completo para modo claro y oscuro
- Aplicado automáticamente en toda la app

### ✅ Barriles (Barrels) para Importaciones Limpias
```typescript
// En lugar de:
import { useAuthStore } from '../store/auth';
import { api } from '../services/api';

// Ahora:
import { useAuthStore } from '../store';
import { api } from '../services';
```

Barriles creados en:
- `src/components/index.ts`
- `src/store/index.ts`
- `src/services/index.ts`
- `src/types/index.ts`
- `src/constants/index.ts`

### ✅ Constantes Centralizadas
Archivo `src/constants/mockData.ts`:
- Todos los datos mock comentados con `TODO(eliminar)`
- Endpoints del backend documentados
- Bandera `MOCK_ENABLED` para activar/desactivar
- Fácil migración cuando el backend esté listo

### ✅ API Centralizada
- Cliente Axios configurado en `src/services/api.ts`
- Interceptores automáticos para Authorization
- Manejo de errores 401 (logout automático)
- baseURL configurable desde `.env`

## 🎨 Navegación

### Menú Lateral (Drawer Navigation)
- **3 barras (hamburguesa)** en el header izquierdo
- Secciones principales:
  - 🏠 Inicio
  - 📅 Calendario
  - 👤 Perfil
- Avatar del usuario con información
- Botón "Cerrar Sesión" en el drawer
- Indicador visual de rol (color del borde)

---

**Desarrollado con React Native + Expo**
