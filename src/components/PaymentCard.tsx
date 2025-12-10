import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { useState } from 'react';
import { useTheme } from '../theme';

interface PaymentCardProps {
  month: string;
  status: 'paid' | 'pending';
  date?: string;
  amount?: number;
  currency?: string;
  method?: string;
  registeredBy?: string;
}

export function PaymentCard({ month, status, date, amount, currency, method, registeredBy }: PaymentCardProps) {
  const { colors } = useTheme();
  const [modalVisible, setModalVisible] = useState(false);

  const isPaid = status === 'paid';

  return (
    <>
      <TouchableOpacity
        style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}
        onPress={() => isPaid && setModalVisible(true)}
        activeOpacity={isPaid ? 0.7 : 1}
      >
        <View style={styles.statusRow}>
          <Text style={[styles.statusIcon]}>{isPaid ? '🟢' : '🟠'}</Text>
          <View style={styles.monthInfo}>
            <Text style={[styles.month, { color: colors.foreground }]}>{month}</Text>
            <Text style={[styles.status, { color: isPaid ? colors.greenHouse['600'] : colors.destructive }]}>
              {isPaid ? 'PAGADA' : 'PENDIENTE'}
            </Text>
          </View>
        </View>

        {isPaid && date && (
          <View style={styles.paymentInfo}>
            <Text style={[styles.paymentText, { color: colors.mutedForeground }]}>
              📅 {date} | 💰 {currency}{amount} | 🧾 {method}
            </Text>
          </View>
        )}

        {isPaid && (
          <TouchableOpacity
            style={[styles.detailsButton, { backgroundColor: colors.greenHouse['700'] }]}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.detailsButtonText}>Ver Detalles</Text>
          </TouchableOpacity>
        )}
      </TouchableOpacity>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setModalVisible(false)}
        >
          <View
            style={[styles.modalContent, { backgroundColor: colors.card }]}
            onStartShouldSetResponder={() => true}
          >
            <Text style={[styles.modalTitle, { color: colors.foreground }]}>
              ✅ CUOTA PAGADA
            </Text>
            <Text style={[styles.modalSubtitle, { color: colors.greenHouse['600'] }]}>
              {month}
            </Text>

            <View style={styles.modalDetails}>
              <View style={styles.modalRow}>
                <Text style={[styles.modalLabel, { color: colors.mutedForeground }]}>📅 Fecha de pago:</Text>
                <Text style={[styles.modalValue, { color: colors.foreground }]}>{date}</Text>
              </View>

              <View style={styles.modalRow}>
                <Text style={[styles.modalLabel, { color: colors.mutedForeground }]}>💰 Importe:</Text>
                <Text style={[styles.modalValue, { color: colors.foreground }]}>{currency}{amount}</Text>
              </View>

              <View style={styles.modalRow}>
                <Text style={[styles.modalLabel, { color: colors.mutedForeground }]}>🧾 Método:</Text>
                <Text style={[styles.modalValue, { color: colors.foreground }]}>{method}</Text>
              </View>

              <View style={styles.modalRow}>
                <Text style={[styles.modalLabel, { color: colors.mutedForeground }]}>👤 Registrado por:</Text>
                <Text style={[styles.modalValue, { color: colors.foreground }]}>{registeredBy}</Text>
              </View>
            </View>

            <TouchableOpacity
              style={[styles.closeButton, { backgroundColor: colors.greenHouse['700'] }]}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  statusIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  monthInfo: {
    flex: 1,
  },
  month: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  status: {
    fontSize: 13,
    fontWeight: '600',
  },
  paymentInfo: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: 'rgba(128, 128, 128, 0.2)',
  },
  paymentText: {
    fontSize: 13,
    lineHeight: 18,
  },
  detailsButton: {
    marginTop: 12,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  detailsButtonText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    width: '100%',
    maxWidth: 400,
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 8,
  },
  modalSubtitle: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 24,
  },
  modalDetails: {
    marginBottom: 24,
  },
  modalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalLabel: {
    fontSize: 15,
    flex: 1,
  },
  modalValue: {
    fontSize: 15,
    fontWeight: '600',
    flex: 1,
    textAlign: 'right',
  },
  closeButton: {
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
