import React, { type ReactNode } from 'react';
import { View, Text, StyleSheet, type ViewProps } from 'react-native';
import { useTheme } from '../../theme';

interface CardProps extends ViewProps {
  children: ReactNode;
  title?: string;
  description?: string;
}

export function Card({ children, title, description, style, ...props }: CardProps) {
  const { colors } = useTheme();

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: colors.card,
          borderColor: colors.border,
        },
        style,
      ]}
      {...props}
    >
      {title && (
        <Text style={[styles.title, { color: colors.cardForeground }]}> 
          {title}
        </Text>
      )}
      {description && (
        <Text style={[styles.description, { color: colors.mutedForeground }]}> 
          {description}
        </Text>
      )}
      <View style={styles.content}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    marginBottom: 12,
  },
  content: {},
});
