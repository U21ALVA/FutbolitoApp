import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../theme';

interface PlayerStatsProps {
  lastEvaluations: any[];
}

export function PlayerStats({ lastEvaluations }: PlayerStatsProps) {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.card, borderColor: colors.border }]}> 
      <Text style={[styles.title, { color: colors.foreground }]}>Últimas evaluaciones</Text>
      {lastEvaluations.map((ev, i) => (
        <View key={i} style={styles.row}>
          <Text style={[styles.label, { color: colors.mutedForeground }]}>{ev.date}</Text>
          <Text style={[styles.value, { color: colors.greenHouse['700'] }]}>{ev.score}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  label: {
    fontSize: 14,
  },
  value: {
    fontSize: 14,
    fontWeight: '700',
  },
});
