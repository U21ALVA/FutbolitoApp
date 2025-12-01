// Navegación protegida por autenticación con React Navigation
import { useEffect } from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme, Theme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthStackParamList, AppStackParamList } from './types';
import { useAuthStore } from '../store/auth';
import LoginScreen from '../screens/LoginScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { View, ActivityIndicator, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '../theme';

// Param lists tipadas para stacks
const AuthStack = createNativeStackNavigator<AuthStackParamList>();
const AppStack = createNativeStackNavigator<AppStackParamList>();

function AuthNavigator() {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      <AuthStack.Screen name="ForgotPassword" component={ForgotPasswordScreen} options={{ title: 'Recuperar contraseña' }} />
    </AuthStack.Navigator>
  );
}

function PrivateNavigator() {
  const { colors } = useTheme();
  const store = useAuthStore();
  const user = store.user;

  const initials = (user?.nombre || 'U')
    .split(' ')
    .map((p) => p[0])
    .join('')
    .toUpperCase();

  // Rol-based color ring for quick visual role hint
  const roleRingColor = user?.rol === 'entrenador' ? colors.greenHouse['700'] : colors.greenHouse['500'];

  return (
    <AppStack.Navigator>
      <AppStack.Screen
        name="Home"
        component={HomeScreen}
        options={({ navigation }) => ({
          title: 'Inicio',
          headerRight: () => (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TouchableOpacity
                accessibilityRole="button"
                accessibilityLabel="Abrir perfil"
                onPress={() => navigation.navigate('Profile')}
                style={{ marginRight: 12 }}
              >
                <View
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 16,
                    backgroundColor: colors.card,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderWidth: 2,
                    borderColor: roleRingColor,
                  }}
                >
                  <Text style={{ color: colors.foreground, fontWeight: '600', fontSize: 12 }}>{initials}</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                accessibilityRole="button"
                accessibilityLabel="Cerrar sesión"
                onPress={() => store.logout()}
                style={{ paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8, backgroundColor: colors.destructive }}
              >
                <Text style={{ color: 'white', fontWeight: '600', fontSize: 12 }}>Salir</Text>
              </TouchableOpacity>
            </View>
          ),
        })}
      />
      <AppStack.Screen name="Profile" component={ProfileScreen} options={{ title: 'Mi Perfil' }} />
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
