import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../theme';

interface UpcomingEvent {
  day: string;
  description: string;
  time?: string;
}

interface EventCardProps {
  title: string;
  events: UpcomingEvent[];
}

export function EventCard({ title, events }: EventCardProps) {
  const { colors } = useTheme();

  return (
    <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.greenHouse['600'] }]}>
      <Text style={[styles.title, { color: colors.foreground }]}>{title}</Text>
      <View style={styles.divider} />
      
      {events.map((event, index) => (
        <View key={index} style={styles.eventRow}>
          <Text style={styles.emoji}>🗓️</Text>
          <Text style={[styles.eventText, { color: colors.mutedForeground }]}>
            {event.day}: {event.description} {event.time || ''}
          </Text>
        </View>
      ))}
    </View>
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
  title: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 8,
  },
  divider: {
    height: 1,
    backgroundColor: '#ccc',
    marginBottom: 12,
  },
  eventRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  emoji: {
    fontSize: 16,
    marginRight: 8,
  },
  eventText: {
    fontSize: 14,
    flex: 1,
  },
});
