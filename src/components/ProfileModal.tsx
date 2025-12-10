import { View, Text, StyleSheet, Modal, TouchableOpacity, ScrollView } from 'react-native';
import { useTheme } from '../theme';
import { useAuthStore } from '../store';
import { Button } from './Button';

interface ProfileModalProps {
  visible: boolean;
  onClose: () => void;
  onLogout: () => void;
}

export function ProfileModal({ visible, onClose, onLogout }: ProfileModalProps) {
  const { colors } = useTheme();
  const user = useAuthStore((s) => s.user);

  const getInitials = () => {
    if (!user) return 'U';
    const firstInitial = user.nombre?.[0] || '';
    const lastInitial = user.apellido?.[0] || '';
    return `${firstInitial}${lastInitial}`.toUpperCase();
  };

  const getRoleBadgeColor = () => {
    if (user?.rol === 'padre') return colors.greenHouse['600'];
    if (user?.rol === 'entrenador') return colors.greenHouse['700'];
    return colors.mutedForeground;
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={styles.modalOverlay}
        activeOpacity={1}
        onPress={onClose}
      >
        <View
          style={[styles.modalContent, { backgroundColor: colors.card }]}
          onStartShouldSetResponder={() => true}
        >
          {/* Avatar */}
          <View style={[styles.avatarContainer, { borderColor: getRoleBadgeColor() }]}>
            <Text style={[styles.avatarText, { color: getRoleBadgeColor() }]}>
              {getInitials()}
            </Text>
          </View>

          {/* User Info */}
          <Text style={[styles.userName, { color: colors.foreground }]}>
            {user?.nombre} {user?.apellido}
          </Text>
          <View style={[styles.roleBadge, { backgroundColor: getRoleBadgeColor() + '20' }]}>
            <Text style={[styles.roleText, { color: getRoleBadgeColor() }]}>
              {user?.rol?.toUpperCase()}
            </Text>
          </View>

          {/* Details */}
          <View style={styles.detailsSection}>
            <View style={styles.detailRow}>
              <Text style={[styles.detailLabel, { color: colors.mutedForeground }]}>📧 Email:</Text>
              <Text style={[styles.detailValue, { color: colors.foreground }]}>{user?.email}</Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={[styles.detailLabel, { color: colors.mutedForeground }]}>🆔 DNI:</Text>
              <Text style={[styles.detailValue, { color: colors.foreground }]}>{user?.dni}</Text>
            </View>

            <View style={[styles.separator, { backgroundColor: colors.border }]} />

            <View style={styles.detailRow}>
              <Text style={[styles.detailLabel, { color: colors.mutedForeground }]}>👦 Hijo:</Text>
              <Text style={[styles.detailValue, { color: colors.foreground }]}>Javier</Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={[styles.detailLabel, { color: colors.mutedForeground }]}>⚽ Categoría:</Text>
              <Text style={[styles.detailValue, { color: colors.foreground }]}>Juvenil A</Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={[styles.detailLabel, { color: colors.mutedForeground }]}>📅 Desde:</Text>
              <Text style={[styles.detailValue, { color: colors.foreground }]}>Septiembre 2023</Text>
            </View>
          </View>

          {/* Actions */}
          <View style={styles.actionsSection}>
            <Button
              title="Cerrar Sesión"
              onPress={onLogout}
              variant="outline"
              style={{ marginBottom: 12 }}
            />
            <Button
              title="Cerrar"
              onPress={onClose}
              variant="primary"
            />
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
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
    alignItems: 'center',
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: '700',
  },
  userName: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 8,
    textAlign: 'center',
  },
  roleBadge: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 12,
    marginBottom: 24,
  },
  roleText: {
    fontSize: 13,
    fontWeight: '700',
  },
  detailsSection: {
    width: '100%',
    marginBottom: 24,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  detailLabel: {
    fontSize: 14,
    flex: 1,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '600',
    flex: 1,
    textAlign: 'right',
  },
  separator: {
    height: 1,
    marginVertical: 12,
  },
  actionsSection: {
    width: '100%',
  },
});
