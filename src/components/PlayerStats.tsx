import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../theme';

interface PlayerStatsProps {
  lastEvaluations: Array<{
    skill: string;
    score: number;
    maxScore: number;
    trend: 'up' | 'down' | 'stable';
    change: number;
  }>;
}

export function PlayerStats({ lastEvaluations }: PlayerStatsProps) {
  const { colors } = useTheme();

  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    if (trend === 'up') return '↑';
    if (trend === 'down') return '↓';
    return '→';
  };

  const getTrendColor = (trend: 'up' | 'down' | 'stable') => {
    if (trend === 'up') return colors.greenHouse['600'];
    if (trend === 'down') return colors.destructive;
    return colors.mutedForeground;
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.card, borderColor: colors.border }]}>
      <View style={styles.header}>
        <Text style={styles.headerIcon}>📊</Text>
        <Text style={[styles.title, { color: colors.foreground }]}>Últimas Evaluaciones</Text>
      </View>

      {lastEvaluations.map((evaluation, index) => (
        <View key={index} style={styles.evaluationRow}>
          <Text style={styles.starIcon}>⭐</Text>
          <View style={styles.evaluationInfo}>
            <Text style={[styles.skillName, { color: colors.foreground }]}>
              {evaluation.skill}
            </Text>
            <View style={styles.scoreRow}>
              <Text style={[styles.score, { color: colors.greenHouse['700'] }]}>
                {evaluation.score}/{evaluation.maxScore}
              </Text>
              <View style={[styles.trendBadge, { backgroundColor: getTrendColor(evaluation.trend) + '20' }]}>
                <Text style={[styles.trendText, { color: getTrendColor(evaluation.trend) }]}>
                  {getTrendIcon(evaluation.trend)} {evaluation.change !== 0 ? `+${evaluation.change}` : ''}
                </Text>
              </View>
            </View>
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerIcon: {
    fontSize: 24,
    marginRight: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
  },
  evaluationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  starIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  evaluationInfo: {
    flex: 1,
  },
  skillName: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 4,
  },
  scoreRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  score: {
    fontSize: 14,
    fontWeight: '700',
  },
  trendBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  trendText: {
    fontSize: 13,
    fontWeight: '600',
  },
});
