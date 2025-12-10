import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../theme';

interface PaymentCardProps {
  title: string;
  amount: string;
  dueDate?: string;
}

export function PaymentCard({ title, amount, dueDate }: PaymentCardProps) {
  const { colors } = useTheme();

  return (
    <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}> 
      <Text style={[styles.title, { color: colors.foreground }]}>{title}</Text>
      <Text style={[styles.amount, { color: colors.greenHouse['700'] }]}>{amount}</Text>
      {dueDate ? <Text style={[styles.due, { color: colors.mutedForeground }]}>Vence: {dueDate}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 12,
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
  },
  amount: {
    fontSize: 18,
    fontWeight: '800',
  },
  due: {
    fontSize: 12,
    marginTop: 6,
  },
});
