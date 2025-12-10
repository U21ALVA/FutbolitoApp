// Tipos centralizados de navegación (Single Source of Truth para rutas)
export type AuthStackParamList = {
  Login: undefined;
  ForgotPassword: undefined;
};

export type TabsParamList = {
  Home: undefined;
  Calendar: undefined;
  Payments: undefined;
};

export type AppStackParamList = {
  MainTabs: undefined;
  TrainingDetail: { trainingId: string };
};
