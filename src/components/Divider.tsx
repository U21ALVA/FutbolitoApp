import React from 'react';
import { View, StyleSheet, type ViewProps } from 'react-native';
import { useTheme } from '../theme';

interface DividerProps extends ViewProps {
  orientation?: 'horizontal' | 'vertical';
}

export function Divider({ orientation = 'horizontal', style, ...props }: DividerProps) {
  const { colors } = useTheme();

  return (
    <View
      style={[
        orientation === 'horizontal' ? styles.horizontal : styles.vertical,
        { backgroundColor: colors.border },
        style,
      ]}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  horizontal: {
    height: 1,
    width: '100%',
    marginVertical: 12,
  },
  vertical: {
    width: 1,
    height: '100%',
    marginHorizontal: 12,
  },
});
