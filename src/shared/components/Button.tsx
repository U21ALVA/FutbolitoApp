import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  type TouchableOpacityProps,
  ActivityIndicator,
} from 'react-native';
import { useTheme } from '../../theme';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'destructive' | 'ghost' | 'success';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
}

export function Button({
  title,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled,
  style,
  ...props
}: ButtonProps) {
  const { colors } = useTheme();

  const getBackgroundColor = () => {
    if (disabled) return colors.muted;
    switch (variant) {
      case 'primary':
        return colors.primary;
      case 'secondary':
        return colors.secondary;
      case 'outline':
      case 'ghost':
        return 'transparent';
      case 'destructive':
        return colors.destructive;
      case 'success':
        return colors.greenHouse[500];
      default:
        return colors.primary;
    }
  };

  const getTextColor = () => {
    if (disabled) return colors.mutedForeground;
    switch (variant) {
      case 'primary':
        return colors.primaryForeground;
      case 'secondary':
        return colors.secondaryForeground;
      case 'outline':
        return colors.foreground;
      case 'ghost':
        return colors.foreground;
      case 'destructive':
        return '#ffffff';
      case 'success':
        return '#ffffff';
      default:
        return colors.primaryForeground;
    }
  };

  const getBorderColor = () => {
    if (variant === 'outline') return colors.border;
    return 'transparent';
  };

  const getPadding = () => {
    switch (size) {
      case 'sm':
        return { paddingVertical: 8, paddingHorizontal: 12 };
      case 'md':
        return { paddingVertical: 12, paddingHorizontal: 16 };
      case 'lg':
        return { paddingVertical: 16, paddingHorizontal: 24 };
      default:
        return { paddingVertical: 12, paddingHorizontal: 16 };
    }
  };

  const getFontSize = () => {
    switch (size) {
      case 'sm':
        return 14;
      case 'md':
        return 16;
      case 'lg':
        return 18;
      default:
        return 16;
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor: getBackgroundColor(),
          borderColor: getBorderColor(),
          ...getPadding(),
        },
        style,
      ]}
      disabled={disabled || loading}
      activeOpacity={0.7}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={getTextColor()} size="small" />
      ) : (
        <Text
          style={[
            styles.text,
            {
              color: getTextColor(),
              fontSize: getFontSize(),
            },
          ]}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 10,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  text: {
    fontWeight: '600',
  },
});
