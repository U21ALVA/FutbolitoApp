// ============================================================
// TODO(eliminar líneas 1-80): ARCHIVO COMPLETO con todos los datos mock
// Este archivo completo debe ser eliminado cuando el backend esté listo
// Solo conservar las líneas 82-106 (API_ENDPOINTS)
// ============================================================

export const MOCK_ENABLED = true; // Cambiar a false cuando el backend esté disponible

export const MOCK_TRAINING = {
  id: '1',
  date: 'HOY - LUNES 15 ENERO',
  title: 'ENTRENAMIENTO DE JAVIER',
  time: '18:00 - 19:30',
  location: 'Campo Norte',
  objective: 'Mejora de técnica de pase y control',
  materials: 'Botellas de agua, espinilleras',
  status: 'upcoming' as const, // 'upcoming' | 'ongoing' | 'completed'
};

export const MOCK_TRAINING_DETAILS = {
  objectives: [
    'Mejorar precisión en pases largos',
    'Trabajar control orientado',
    'Ejercicios de transición ofensiva',
  ],
  coachNotes: '"Trabajaremos específicamente en la pierna no dominante"',
  materials: [
    'Botellas de agua (mínimo 1L)',
    'Espinilleras obligatorias',
    'Ropa de abrigo (entrenamos al aire libre)',
  ],
};

export const MOCK_TRAINING_ONGOING = {
  timeElapsed: '20 minutos',
  attendance: '14/16 jugadores',
  playerStatus: 'PRESENTE (llegada: 17:55)',
  coach: 'Carlos López',
  exercises: [
    { name: 'Calentamiento', progress: 5, total: 5, status: 'completado' },
    { name: 'Rondo técnico', progress: 3, total: 5, status: 'en curso' },
    { name: 'Partido posicional', progress: 0, total: 5, status: 'pendiente' },
  ],
};

export const MOCK_TRAINING_COMPLETED = {
  duration: '105 minutos',
  intensity: 'Media-Alta',
  rating: 'Muy positiva',
  exercisesCompleted: '6/6',
  coachFeedback:
    '"Javier mostró buena actitud y mejora notable en pases con pierna izquierda. Mantener el trabajo."',
  exercises: [
    'Calentamiento dinámico - 15 min',
    'Rondo 4v2 - 20 min',
    'Pases en movimiento - 25 min',
    'Partido posicional - 30 min',
    'Finalización - 10 min',
    'Vuelta a la calma - 5 min',
  ],
};

export const MOCK_UPCOMING_EVENTS = [
  { 
    id: '1',
    day: 'Miércoles 17', 
    date: '2024-01-17',
    description: 'Entrenamiento', 
    time: '18:00',
    type: 'training' as const
  },
  { 
    id: '2',
    day: 'Sábado 20',
    date: '2024-01-20', 
    description: 'Partido vs. Ciudad Deportiva',
    type: 'match' as const
  },
];

export const MOCK_MATCH = {
  id: '2',
  date: '2024-01-20',
  day: 'Sábado 20 Enero',
  event: 'Partido de Liga',
  time: '11:00 - 12:30',
  versus: 'Juvenil A vs. Ciudad Deportiva',
  location: 'Campo Municipal Los Olivos',
  address: 'C/ Deportes, 23',
  requiresConfirmation: true,
  details: {
    uniform: '👕 Equipación oficial completa',
    arrivalTime: '⏰ Llegada jugadores: 10:15',
    parking: '🚗 Aparcamiento: Zona azul gratuita',
    meal: '🍽️ Comida equipo: 14:00 (opcional)',
    contact: '📞 Contacto: Carlos - 600 123 456',
    weather: '🌦️ Previsión meteorológica: Soleado, 18°C',
  },
};

export const MOCK_PAYMENTS = [
  {
    id: 'pay-1',
    month: 'Diciembre 2023',
    status: 'paid' as const,
    date: '05/12/2023',
    amount: 60,
    currency: '€',
    method: 'Efectivo',
    registeredBy: 'Administración',
  },
  {
    id: 'pay-2',
    month: 'Noviembre 2023',
    status: 'paid' as const,
    date: '03/11/2023',
    amount: 60,
    currency: '€',
    method: 'Transferencia',
    registeredBy: 'Administración',
  },
  {
    id: 'pay-3',
    month: 'Enero 2024',
    status: 'paid' as const,
    date: '03/01/2024',
    amount: 60,
    currency: '€',
    method: 'Efectivo',
    registeredBy: 'Administración',
  },
];

export const MOCK_PLAYER_STATS = {
  lastEvaluations: [
    { skill: 'Técnica de pase', score: 8, maxScore: 10, trend: 'up' as const, change: 1 },
    { skill: 'Control orientado', score: 7, maxScore: 10, trend: 'up' as const, change: 2 },
    { skill: 'Actitud en equipo', score: 9, maxScore: 10, trend: 'stable' as const, change: 0 },
  ],
};

// Endpoints reales para cuando el backend esté listo
export const API_ENDPOINTS = {
  // Autenticación
  LOGIN: '/auth/login',
  FORGOT_PASSWORD: '/auth/forgot-password',
  
  // Usuario
  GET_USER_PROFILE: '/users/me',
  UPDATE_PASSWORD: '/users/me/password',
  
  // Entrenamientos
  GET_TRAININGS: '/trainings',
  GET_TRAINING_DETAIL: (id: string) => `/trainings/${id}`,
  GET_TRAINING_STATUS: (id: string) => `/trainings/${id}/status`,
  
  // Eventos y Calendario
  GET_UPCOMING_EVENTS: '/events/upcoming',
  GET_CALENDAR: '/calendar',
  CONFIRM_ATTENDANCE: (eventId: string) => `/events/${eventId}/attendance`,
  
  // Pagos
  GET_PAYMENTS: '/payments',
  GET_PAYMENT_STATUS: '/payments/status',
  
  // Stats del jugador
  GET_PLAYER_STATS: (playerId: string) => `/players/${playerId}/stats`,
  GET_PLAYER_EVALUATIONS: (playerId: string) => `/players/${playerId}/evaluations`,
};
