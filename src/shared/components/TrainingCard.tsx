import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../../theme';

interface TrainingCardProps {
  date: string;
  title: string;
  time: string;
  location: string;
  objective: string;
  materials: string;
  onPress: () => void;
}

export function TrainingCard({ date, title, time, location, objective, materials, onPress }: TrainingCardProps) {
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.card, { backgroundColor: colors.card, borderColor: colors.greenHouse['500'] }]}
      activeOpacity={0.7}
    >
      <Text style={[styles.date, { color: colors.greenHouse['700'] }]}>{date}</Text>
      <View style={styles.divider} />
      
      <View style={styles.row}>
        <Text style={styles.emoji}>⚽</Text>
        <Text style={[styles.title, { color: colors.foreground }]}>{title}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.emoji}>🕕</Text>
        <Text style={[styles.info, { color: colors.mutedForeground }]}>{time} | {location}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.emoji}>🎯</Text>
        <Text style={[styles.info, { color: colors.mutedForeground }]}>Objetivo: {objective}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.emoji}>📦</Text>
        <Text style={[styles.info, { color: colors.mutedForeground }]}>Material: {materials}</Text>
      </View>

      <Text style={[styles.tapHint, { color: colors.greenHouse['500'] }]}>👆 Toca para ver detalles completos</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  date: {
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 8,
  },
  divider: {
    height: 1,
    backgroundColor: '#ccc',
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  emoji: {
    fontSize: 16,
    marginRight: 8,
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
    flex: 1,
  },
  info: {
    fontSize: 14,
    flex: 1,
  },
  tapHint: {
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 8,
  },
});
