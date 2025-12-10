import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../theme';

interface ThemeSwitcherProps {
  compact?: boolean;
}

export function ThemeSwitcher({ compact }: ThemeSwitcherProps) {
  const { mode, setMode, colors } = useTheme();

  const toggleTheme = () => {
    const newMode = mode === 'light' ? 'dark' : 'light';
    setMode(newMode);
  };

  return (
    <TouchableOpacity
      style={[
        styles.button, 
        { 
          backgroundColor: colors.card,
          borderColor: colors.border,
        }
      ]}
      onPress={toggleTheme}
      activeOpacity={0.7}
    >
      <Text style={styles.icon}>{mode === 'light' ? '☀️' : '🌙'}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  icon: {
    fontSize: 20,
  },
});
