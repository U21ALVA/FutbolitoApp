import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useTheme } from '../theme';

// Mantenemos la prop 'compact' solo para que no te de error en HomeScreen,
// pero visualmente siempre se verá igual de bien.
interface ThemeSwitcherProps {
  compact?: boolean;
}

export function ThemeSwitcher({ compact }: ThemeSwitcherProps) {
  const { mode, setMode, colors } = useTheme();

  // Función simplificada: Solo alterna entre 'light' y 'dark'
  const toggleTheme = () => {
    const newMode = mode === 'light' ? 'dark' : 'light';
    setMode(newMode);
  };

  return (
    <TouchableOpacity
      // Usamos un estilo de botón redondo
      style={[
        styles.button, 
        { 
          backgroundColor: colors.card, // Fondo suave según el tema
          borderColor: colors.border,   // Borde sutil
        }
      ]}
      onPress={toggleTheme}
      activeOpacity={0.7}
    >
      <Text style={styles.icon}>
        {/* Si es light muestra Sol, si es dark muestra Luna */}
        {mode === 'light' ? '☀️' : '🌙'}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 40,
    height: 40,
    borderRadius: 20, // Esto lo hace perfectamente redondo
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1, // Un borde fino para que se distinga
    // Una pequeña sombra para darle relieve
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3, // Sombra para Android
  },
  icon: {
    fontSize: 20,
  },
});