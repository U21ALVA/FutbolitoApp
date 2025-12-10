# 🚀 Guía de Migración - Backend Integration

Esta guía te indica **exactamente** qué líneas eliminar y qué código descomentar cuando tu backend esté listo.

## 📋 Resumen de Archivos a Modificar

Cuando el backend esté listo, deberás modificar estos archivos en el siguiente orden:

1. `src/constants/mockData.ts` - **ELIMINAR CASI TODO EL ARCHIVO**
2. `src/store/auth.ts` - Eliminar login mock
3. `src/screens/HomeScreen.tsx` - Conectar entrenamientos y eventos
4. `src/screens/TrainingDetailScreen.tsx` - Conectar detalles de entrenamiento
5. `src/screens/CalendarScreen.tsx` - Conectar calendario y confirmación

---

## 🗑️ 1. src/constants/mockData.ts

**ACCIÓN:** Eliminar casi todo el archivo, conservar solo los endpoints.

### ❌ ELIMINAR LÍNEAS 1-80
Todo el contenido de datos mock:
- `MOCK_ENABLED`
- `MOCK_TRAINING`
- `MOCK_TRAINING_DETAILS`
- `MOCK_TRAINING_ONGOING`
- `MOCK_TRAINING_COMPLETED`
- `MOCK_UPCOMING_EVENTS`
- `MOCK_MATCH`

### ✅ CONSERVAR LÍNEAS 82-106
```typescript
// Endpoints reales para cuando el backend esté listo
export const API_ENDPOINTS = {
  // ... todo el objeto de endpoints
};
```

**RESULTADO:** El archivo `mockData.ts` solo debe tener `API_ENDPOINTS`.

---

## 🔐 2. src/store/auth.ts

### ❌ ELIMINAR LÍNEAS 8-9
```typescript
// ============================================================
// TODO(eliminar líneas 8-9): Bandera para login mock. Borrar cuando backend esté listo
// ============================================================
const MOCK_LOGIN_ENABLED = true;
```

### ❌ ELIMINAR LÍNEAS 57-69
```typescript
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
```

### ✅ RESULTADO
La función `login` quedará solo con el código real del backend (líneas 71-82).

---

## 🏠 3. src/screens/HomeScreen.tsx

### ❌ ELIMINAR LÍNEA 7
```typescript
// TODO(eliminar línea 7): Import de datos mock
import { MOCK_TRAINING, MOCK_UPCOMING_EVENTS } from '../constants';
```

### ✅ DESCOMENTAR LÍNEAS 9-12
```typescript
// BACKEND READY - Descomentar cuando el backend esté listo:
import { useState, useEffect } from 'react';
import { api } from '../services';
import { API_ENDPOINTS } from '../constants';
```

### ❌ ELIMINAR LÍNEAS 17-18
```typescript
// TODO(eliminar líneas 17-18): Datos mock hardcodeados
const todayTraining = MOCK_TRAINING;
const upcomingEvents = MOCK_UPCOMING_EVENTS;
```

### ✅ DESCOMENTAR LÍNEAS 20-29
```typescript
// BACKEND READY - Descomentar:
const [todayTraining, setTodayTraining] = useState(null);
const [upcomingEvents, setUpcomingEvents] = useState([]);

useEffect(() => {
  api.get(API_ENDPOINTS.GET_TRAININGS).then(res => setTodayTraining(res.data[0]));
  api.get(API_ENDPOINTS.GET_UPCOMING_EVENTS).then(res => setUpcomingEvents(res.data));
}, []);
```

### ✅ RESULTADO
Los datos vendrán del backend en tiempo real, con estados de carga y manejo de null.

---

## 📝 4. src/screens/TrainingDetailScreen.tsx

### ❌ ELIMINAR LÍNEAS 7-14
```typescript
// TODO(eliminar líneas 7-14): Imports de datos mock
import {
  MOCK_TRAINING_DETAILS,
  MOCK_TRAINING_ONGOING,
  MOCK_TRAINING_COMPLETED,
} from '../constants';
// import { api } from '../services';
// import { API_ENDPOINTS } from '../constants';
// import { useState, useEffect } from 'react';
```

### ✅ DESCOMENTAR las 3 líneas comentadas
```typescript
import { api } from '../services';
import { API_ENDPOINTS } from '../constants';
import { useState, useEffect } from 'react';
```

### ❌ ELIMINAR LÍNEAS 20-22
```typescript
// TODO(eliminar líneas 20-22): Status mock hardcodeado
// NOTA: Cambiar 'upcoming' por 'ongoing' o 'completed' para testear diferentes estados
const status: 'upcoming' | 'ongoing' | 'completed' = 'upcoming' as 'upcoming' | 'ongoing' | 'completed';
```

### ✅ DESCOMENTAR LÍNEAS 24-28
```typescript
const [status, setStatus] = useState<'upcoming' | 'ongoing' | 'completed'>('upcoming');
useEffect(() => {
  api.get(API_ENDPOINTS.GET_TRAINING_STATUS(trainingId))
    .then(res => setStatus(res.data.status));
}, [trainingId]);
```

### ❌ ELIMINAR LÍNEAS 39-48
```typescript
// TODO(eliminar líneas 39-48): Variable mock hardcodeada
const trainingDetails = MOCK_TRAINING_DETAILS;
// BACKEND READY - Descomentar:
// const [trainingDetails, setTrainingDetails] = useState(null);
// useEffect(() => {
//   api.get(API_ENDPOINTS.GET_TRAINING_DETAIL(trainingId))
//     .then(res => setTrainingDetails(res.data));
// }, [trainingId]);
```

### ✅ DESCOMENTAR el bloque useState + useEffect

### ❌ ELIMINAR referencias a MOCK_TRAINING_ONGOING (líneas 58, 73, 84, 99, 102, 105, 108, 117)
Cambiar todas las referencias de `MOCK_TRAINING_ONGOING` por el estado del backend.

### ❌ ELIMINAR referencias a MOCK_TRAINING_COMPLETED (líneas 135, 138, 141, 144, 157, 160, 168, 176)
Cambiar todas las referencias de `MOCK_TRAINING_COMPLETED` por el estado del backend.

---

## 📅 5. src/screens/CalendarScreen.tsx

### ❌ ELIMINAR LÍNEA 6
```typescript
// TODO(eliminar línea 6): Import de datos mock
import { MOCK_MATCH } from '../constants';
```

### ✅ DESCOMENTAR LÍNEAS 8-10
```typescript
// BACKEND READY - Descomentar:
import { useState, useEffect } from 'react';
import { api } from '../services';
import { API_ENDPOINTS } from '../constants';
```

### ❌ ELIMINAR LÍNEAS 17-24
```typescript
// TODO(eliminar líneas 17-24): Datos mock hardcodeados
const matchData = MOCK_MATCH;
// BACKEND READY - Descomentar:
// const [matchData, setMatchData] = useState(null);
// useEffect(() => {
//   api.get(API_ENDPOINTS.GET_CALENDAR).then(res => setMatchData(res.data));
// }, []);
```

### ✅ DESCOMENTAR el bloque useState + useEffect

### ❌ ELIMINAR LÍNEAS 30-44 (handleConfirmAttendance)
```typescript
// TODO(eliminar líneas 30-44): Alert mock, reemplazar con POST al backend
Alert.alert('Confirmación', '¡Gracias! Tu asistencia ha sido confirmada.');
// BACKEND READY - Descomentar líneas 32-39:
// try {
//   await api.post(API_ENDPOINTS.CONFIRM_ATTENDANCE(matchData.id), { confirmed: true });
//   Alert.alert('Confirmación', '¡Gracias! Tu asistencia ha sido confirmada.');
// } catch (error) {
//   Alert.alert('Error', 'No se pudo confirmar la asistencia');
// }
```

### ✅ DESCOMENTAR el bloque try/catch con la llamada POST real

### ❌ ELIMINAR todas las referencias a MOCK_MATCH (líneas 68-85)
Cambiar todas por `matchData` del estado.

---

## ✅ Checklist de Migración

Cuando empieces la migración, sigue este orden:

- [ ] **1. Configurar variables de entorno**
  - Actualizar `API_BASE_URL` en `src/services/api.ts`
  - Configurar endpoints reales en el backend

- [ ] **2. Eliminar mockData.ts líneas 1-80**
  - Conservar solo `API_ENDPOINTS`

- [ ] **3. Actualizar src/store/auth.ts**
  - Eliminar `MOCK_LOGIN_ENABLED` (líneas 8-9)
  - Eliminar bloque de login mock (líneas 57-69)

- [ ] **4. Actualizar src/screens/HomeScreen.tsx**
  - Eliminar imports mock (línea 7)
  - Descomentar imports backend (líneas 9-12)
  - Eliminar variables mock (líneas 17-18)
  - Descomentar useState/useEffect (líneas 20-29)
  - Eliminar TODOs de líneas 48-62

- [ ] **5. Actualizar src/screens/TrainingDetailScreen.tsx**
  - Eliminar imports mock (líneas 7-14)
  - Descomentar imports backend
  - Eliminar status mock (líneas 20-22)
  - Descomentar useState/useEffect para status (líneas 24-28)
  - Eliminar trainingDetails mock (líneas 39-48)
  - Descomentar useState/useEffect para trainingDetails
  - Reemplazar todas las referencias a `MOCK_TRAINING_ONGOING` y `MOCK_TRAINING_COMPLETED`

- [ ] **6. Actualizar src/screens/CalendarScreen.tsx**
  - Eliminar import mock (línea 6)
  - Descomentar imports backend (líneas 8-10)
  - Eliminar matchData mock (líneas 17-24)
  - Descomentar useState/useEffect
  - Actualizar handleConfirmAttendance (líneas 30-44)
  - Reemplazar todas las referencias a `MOCK_MATCH`

- [ ] **7. Probar la aplicación**
  - Verificar que el login funciona
  - Verificar que se cargan los entrenamientos
  - Verificar que se carga el calendario
  - Verificar que la confirmación de asistencia funciona

---

## 🎯 Notas Importantes

1. **No olvides actualizar la URL del backend** en `src/services/api.ts`
2. **Verifica los tipos de respuesta** del backend coincidan con los esperados en TypeScript
3. **Maneja los estados de carga** con spinners o skeletons donde sea necesario
4. **Maneja errores** con try/catch y muestra mensajes al usuario
5. **Prueba cada pantalla** después de migrar para verificar que funciona

---

## 📞 Estructura de Respuesta Esperada del Backend

### Login (`POST /auth/login`)
```json
{
  "accessToken": "jwt-token",
  "refreshToken": "refresh-token-optional"
}
```

### User Profile (`GET /users/me`)
```json
{
  "id": "user-id",
  "nombre": "Juan",
  "apellido": "Pérez",
  "rol": "padre",
  "dni": "12345678",
  "email": "juan@example.com"
}
```

### Trainings (`GET /trainings`)
```json
[
  {
    "id": "training-id",
    "date": "2024-01-15",
    "title": "ENTRENAMIENTO DE JAVIER",
    "time": "18:00 - 19:30",
    "location": "Campo Norte",
    "objective": "Mejora de técnica",
    "materials": "Botellas de agua",
    "status": "upcoming"
  }
]
```

### Training Detail (`GET /trainings/:id`)
```json
{
  "objectives": ["Objetivo 1", "Objetivo 2"],
  "coachNotes": "Notas del entrenador",
  "materials": ["Material 1", "Material 2"]
}
```

### Training Status (`GET /trainings/:id/status`)
```json
{
  "status": "upcoming" | "ongoing" | "completed"
}
```

### Calendar (`GET /calendar`)
```json
{
  "id": "event-id",
  "day": "SÁBADO 20 ENERO",
  "event": "⚽ PARTIDO DE LIGA",
  "time": "🕚 11:00 - 12:30",
  "versus": "🆚 Juvenil A vs. Ciudad Deportiva",
  "location": "📍 Campo Municipal",
  "address": "C/ Deportes, 23",
  "details": {
    "uniform": "👕 Equipación oficial",
    "arrivalTime": "⏰ 10:15",
    // ... más detalles
  }
}
```

### Confirm Attendance (`POST /events/:id/attendance`)
```json
{
  "confirmed": true
}
```

**Respuesta:**
```json
{
  "success": true,
  "message": "Asistencia confirmada"
}
```

---

## 🚨 Troubleshooting

### Error: "Cannot read property 'data' of undefined"
- Verifica que el backend esté corriendo
- Verifica la URL en `api.ts`
- Revisa la consola de red para ver la respuesta

### Error: "Token no recibido"
- Verifica que el backend retorne `accessToken` o `token`
- Revisa la estructura de respuesta del login

### Error: TypeScript "Property does not exist"
- Actualiza los tipos en `src/types/` para que coincidan con las respuestas del backend

---

¡Listo! Con esta guía podrás migrar fácilmente del sistema mock al backend real. 🎉
