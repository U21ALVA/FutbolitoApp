import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../theme';

interface ThemeSwitcherProps {
  compact?: boolean;
}

export function ThemeSwitcher({ compact = false }: ThemeSwitcherProps) {
  const { mode, setMode, isDark, colors } = useTheme();

  const options: { value: 'light' | 'dark' | 'system'; label: string; icon: string }[] = [
    { value: 'light', label: 'Claro', icon: '☀️' },
    { value: 'dark', label: 'Oscuro', icon: '🌙' },
    { value: 'system', label: 'Sistema', icon: '📱' },
  ];

  if (compact) {
    return (
      <TouchableOpacity
        style={[styles.compactButton, { backgroundColor: colors.secondary }]}
        onPress={() => {
          const nextMode = mode === 'light' ? 'dark' : mode === 'dark' ? 'system' : 'light';
          setMode(nextMode);
        }}
      >
        <Text style={styles.icon}>
          {mode === 'light' ? '☀️' : mode === 'dark' ? '🌙' : '📱'}
        </Text>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: colors.foreground }]}>Tema</Text>
      <View
        style={[
          styles.segmentedControl,
          { backgroundColor: colors.muted, borderColor: colors.border },
        ]}
      >
        {options.map((option) => (
          <TouchableOpacity
            key={option.value}
            style={[
              styles.segment,
              mode === option.value && {
                backgroundColor: colors.card,
              },
            ]}
            onPress={() => setMode(option.value)}
          >
            <Text style={styles.icon}>{option.icon}</Text>
            <Text
              style={[
                styles.segmentText,
                {
                  color: mode === option.value ? colors.foreground : colors.mutedForeground,
                },
              ]}
            >
              {option.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
  },
  segmentedControl: {
    flexDirection: 'row',
    borderRadius: 10,
    borderWidth: 1,
    padding: 4,
  },
  segment: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 4,
    borderRadius: 8,
    gap: 4,
  },
  icon: {
    fontSize: 16,
  },
  segmentText: {
    fontSize: 13,
    fontWeight: '500',
  },
  compactButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
