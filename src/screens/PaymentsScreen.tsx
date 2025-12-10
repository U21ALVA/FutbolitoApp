import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '../theme';
import { PaymentCard } from '../components';
import { MOCK_PAYMENTS } from '../constants';

export default function PaymentsScreen() {
  const { colors } = useTheme();

  // ============================================================
  // TODO(eliminar líneas 14-15): Datos mock. Reemplazar con llamada al backend
  // ============================================================
  const payments = MOCK_PAYMENTS;

  // ============================================================
  // BACKEND READY - Descomentar cuando el backend esté listo:
  // ============================================================
  // const [payments, setPayments] = useState([]);
  // const [loading, setLoading] = useState(true);
  //
  // useEffect(() => {
  //   api.get(API_ENDPOINTS.GET_PAYMENTS)
  //     .then(res => setPayments(res.data))
  //     .finally(() => setLoading(false));
  // }, []);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.headerIcon}>💳</Text>
          <Text style={[styles.title, { color: colors.foreground }]}>
            Historial de Pagos
          </Text>
        </View>

        {payments.map((payment) => (
          <PaymentCard
            key={payment.id}
            month={payment.month}
            status={payment.status}
            date={payment.date}
            amount={payment.amount}
            currency={payment.currency}
            method={payment.method}
            registeredBy={payment.registeredBy}
          />
        ))}

        {payments.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={[styles.emptyText, { color: colors.mutedForeground }]}>
              No hay pagos registrados
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerIcon: {
    fontSize: 32,
    marginRight: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
  },
  emptyState: {
    marginTop: 40,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
  },
});
