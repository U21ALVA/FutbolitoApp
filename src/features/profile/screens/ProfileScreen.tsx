import { useState } from 'react';
import { View, Text, StyleSheet, Alert, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuthStore } from '../../../store';
import { useTheme } from '../../../theme';
import { Button, Card, TextInput, Divider } from '../../../components';
import { api } from '../../../services';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

const pwdSchema = z.object({
  currentPassword: z.string().min(4, 'Contraseña actual requerida'),
  newPassword: z.string().min(6, 'Mínimo 6 caracteres'),
  confirmNewPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmNewPassword, {
  message: 'Las contraseñas no coinciden',
  path: ['confirmNewPassword'],
});

type PwdData = z.infer<typeof pwdSchema>;

export default function ProfileScreen() {
  const { colors } = useTheme();
  const user = useAuthStore((s) => s.user);
  const tokens = useAuthStore((s) => s.tokens);
  const logout = useAuthStore((s) => s.logout);
  const [loading, setLoading] = useState(false);

  const { setValue, formState, handleSubmit, reset } = useForm<PwdData>({
    defaultValues: { currentPassword: '', newPassword: '', confirmNewPassword: '' },
    resolver: zodResolver(pwdSchema),
  });

  const onChangePassword = async (data: PwdData) => {
    try {
      setLoading(true);
      await api.put('/users/me/password', {
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      });
      reset();
      Alert.alert('Éxito', 'Contraseña actualizada correctamente');
    } catch (e: any) {
      Alert.alert('Error', e?.response?.data?.message || 'No se pudo actualizar la contraseña');
    } finally {
      setLoading(false);
    }
  };

  const initials = (user?.nombre || 'U')
    .split(' ')
    .map((p) => p[0])
    .join('')
    .toUpperCase();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView
        contentContainerStyle={{ padding: 20, paddingBottom: 40 }}
        keyboardShouldPersistTaps="handled"
      >
      {!tokens ? (
        <Card title="Modo demo activo" description="Este perfil es simulado. Conecta el backend para datos reales.">
          <Text style={{ color: colors.mutedForeground }}>
            El cambio de contraseña y otras acciones de cuenta requieren backend.
          </Text>
        </Card>
      ) : null}

      <Card title="Mi Perfil" description="Información de tu cuenta">
        <View style={styles.row}>
          <View style={[styles.avatar, { backgroundColor: colors.greenHouse['500'] }]}> 
            <Text style={[styles.avatarText, { color: 'white' }]}>{initials}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={[styles.name, { color: colors.foreground }]}>
              {user?.nombre} {user?.apellido ?? ''}
            </Text>
            <Text style={{ color: colors.mutedForeground }}>Rol: {user?.rol}</Text>
            {user?.dni ? (
              <Text style={{ color: colors.mutedForeground }}>DNI: {user.dni}</Text>
            ) : null}
          </View>
        </View>
      </Card>

      <Divider />

      <Card title="Cambiar Contraseña" description="Actualiza tu contraseña de acceso">
        <View style={styles.formGroup}>
          <TextInput
            label="Contraseña actual"
            placeholder="••••••"
            secureTextEntry
            onChangeText={(t) => setValue('currentPassword', t, { shouldValidate: true })}
            error={formState.errors.currentPassword?.message}
          />
        </View>
        <View style={styles.formGroup}>
          <TextInput
            label="Nueva contraseña"
            placeholder="••••••"
            secureTextEntry
            onChangeText={(t) => setValue('newPassword', t, { shouldValidate: true })}
            error={formState.errors.newPassword?.message}
          />
        </View>
        <View style={styles.formGroup}>
          <TextInput
            label="Confirmar nueva contraseña"
            placeholder="••••••"
            secureTextEntry
            onChangeText={(t) => setValue('confirmNewPassword', t, { shouldValidate: true })}
            error={formState.errors.confirmNewPassword?.message}
          />
        </View>
        <Button
          title={loading ? 'Guardando...' : 'Guardar Cambios'}
          onPress={handleSubmit(onChangePassword)}
          loading={loading}
          variant="primary"
          disabled={!tokens}
        />
        {!tokens ? (
          <Text style={{ marginTop: 8, color: colors.mutedForeground }}>
            Modo demo: esta acción está deshabilitada hasta conectar backend.
          </Text>
        ) : null}
      </Card>

      <Divider />

      <View style={{ marginTop: 16 }}>
        <Button title="Cerrar Sesión" variant="destructive" onPress={logout} />
      </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  row: { flexDirection: 'row', gap: 12, alignItems: 'center' },
  avatar: { width: 56, height: 56, borderRadius: 28, alignItems: 'center', justifyContent: 'center' },
  avatarText: { fontSize: 20, fontWeight: 'bold' },
  name: { fontSize: 18, fontWeight: '600' },
  formGroup: { marginBottom: 14 },
});
