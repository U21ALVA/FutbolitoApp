// Navegación protegida por autenticación con React Navigation
import { useEffect, useState } from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme, Theme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AuthStackParamList, AppStackParamList, TabsParamList } from './types';
import { useAuthStore } from '../store';
import { useTheme } from '../theme';
import LoginScreen from '../features/auth/screens/LoginScreen';
import ForgotPasswordScreen from '../features/auth/screens/ForgotPasswordScreen';
import HomeScreen from '../features/home/screens/HomeScreen';
import ProfileScreen from '../features/profile/screens/ProfileScreen';
import TrainingDetailScreen from '../features/training/screens/TrainingDetailScreen';
import CalendarScreen from '../features/calendar/screens/CalendarScreen';
import PaymentsScreen from '../features/payments/screens/PaymentsScreen';
import { View, ActivityIndicator, Text, TouchableOpacity } from 'react-native';
import { ThemeSwitcher, ProfileModal } from '../components';

// Param lists tipadas para navegadores
const AuthStack = createNativeStackNavigator<AuthStackParamList>();
const Tab = createBottomTabNavigator<TabsParamList>();
const AppStack = createNativeStackNavigator<AppStackParamList>();

function AuthNavigator() {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      <AuthStack.Screen name="ForgotPassword" component={ForgotPasswordScreen} options={{ title: 'Recuperar contraseña' }} />
    </AuthStack.Navigator>
  );
}

function HeaderRight() {
  const { colors } = useTheme();
  const [profileModalVisible, setProfileModalVisible] = useState(false);
  const logout = useAuthStore((s) => s.logout);
  const user = useAuthStore((s) => s.user);

  const getInitials = () => {
    if (!user) return 'U';
    const firstInitial = user.nombre?.[0] || '';
    const lastInitial = user.apellido?.[0] || '';
    return `${firstInitial}${lastInitial}`.toUpperCase();
  };

  const handleLogout = async () => {
    setProfileModalVisible(false);
    await logout();
  };

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 16, gap: 12 }}>
      <ThemeSwitcher />
      <TouchableOpacity
        onPress={() => setProfileModalVisible(true)}
        style={{
          width: 36,
          height: 36,
          borderRadius: 18,
          backgroundColor: colors.greenHouse['700'],
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text style={{ color: '#fff', fontSize: 14, fontWeight: '700' }}>
          {getInitials()}
        </Text>
      </TouchableOpacity>
      <ProfileModal
        visible={profileModalVisible}
        onClose={() => setProfileModalVisible(false)}
        onLogout={handleLogout}
      />
    </View>
  );
}

function TabsNavigator() {
  const { colors } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.card,
        },
        headerTintColor: colors.foreground,
        headerRight: () => <HeaderRight />,
        tabBarStyle: {
          backgroundColor: colors.card,
          borderTopColor: colors.border,
          borderTopWidth: 1,
        },
        tabBarActiveTintColor: colors.greenHouse['700'],
        tabBarInactiveTintColor: colors.mutedForeground,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Inicio',
          tabBarLabel: 'Inicio',
          tabBarIcon: () => <Text style={{ fontSize: 20 }}>🏠</Text>,
        }}
      />
      <Tab.Screen
        name="Calendar"
        component={CalendarScreen}
        options={{
          title: 'Calendario',
          tabBarLabel: 'Calendario',
          tabBarIcon: () => <Text style={{ fontSize: 20 }}>📅</Text>,
        }}
      />
      <Tab.Screen
        name="Payments"
        component={PaymentsScreen}
        options={{
          title: 'Pagos',
          tabBarLabel: 'Pagos',
          tabBarIcon: () => <Text style={{ fontSize: 20 }}>💳</Text>,
        }}
      />
    </Tab.Navigator>
  );
}

function PrivateNavigator() {
  const { colors } = useTheme();

  return (
    <AppStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.card,
        },
        headerTintColor: colors.foreground,
      }}
    >
      <AppStack.Screen
        name="MainTabs"
        component={TabsNavigator}
        options={{ headerShown: false }}
      />
      <AppStack.Screen
        name="TrainingDetail"
        component={TrainingDetailScreen}
        options={{ title: 'Detalles del Entrenamiento' }}
      />
    </AppStack.Navigator>
  );
}

function Splash() {
  const { colors } = useTheme();
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.background }}>
      <ActivityIndicator color={colors.primary} size="large" />
    </View>
  );
}

export default function AppNavigator() {
  const status = useAuthStore((s) => s.status);
  const loadFromStorage = useAuthStore((s) => s.loadFromStorage);
  const { colors, isDark } = useTheme();

  useEffect(() => {
    // Cargar tokens al inicio (auto-login)
    loadFromStorage();
  }, [loadFromStorage]);

  // Construimos un Theme compatible con React Navigation usando nuestros colores
  const base = isDark ? DarkTheme : DefaultTheme;
  const theme: Theme = {
    ...base,
    colors: {
      ...base.colors,
      background: colors.background,
      card: colors.card,
      text: colors.foreground,
      border: colors.border,
      primary: colors.primary,
      notification: colors.primary,
    },
  };

  return (
    <NavigationContainer theme={theme}>
      {status === 'idle' || status === 'loading' ? (
        <Splash />
      ) : status === 'authenticated' ? (
        <PrivateNavigator />
      ) : (
        <AuthNavigator />
      )}
    </NavigationContainer>
  );
}
