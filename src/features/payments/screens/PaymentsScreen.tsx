import { View } from 'react-native';
import { useTheme } from '../../../theme';
import { PaymentCard } from '../../../components';

export default function PaymentsScreen() {
  const { colors } = useTheme();
  return (
    <View style={{ flex: 1, backgroundColor: colors.background, padding: 20 }}>
      <PaymentCard title="Cuota mensual" amount="$45" dueDate="10 Dic" />
    </View>
  );
}
