import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../theme';

interface TrainingCardProps {
  date: string;
  title: string;
  time: string;
  location: string;
  objective: string;
  materials: string;
  onPress: () => void;
}

export * from '../shared/components/TrainingCard';
