import { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { Button, TextInput } from '../../../components';
import { useTheme } from '../../../theme';
import { api } from '../../../services/api';

export default function ForgotPasswordScreen() {
  const { colors } = useTheme();
  const [identifier, setIdentifier] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleRecover = async () => {
    if (!identifier.trim()) {
      Alert.alert('Dato requerido', 'Ingresa tu DNI o correo');
      return;
    }
    try {
      setLoading(true);
      await api.post('/auth/forgot-password', { identifier });
      setSent(true);
      Alert.alert('Solicitud enviada', 'Revisa tu correo para continuar');
    } catch (e: any) {
      Alert.alert('Error', e?.response?.data?.message || 'No se pudo iniciar la recuperación');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.foreground }]}>Recuperar contraseña</Text>
      <Text style={{ color: colors.mutedForeground, marginBottom: 24 }}>
        Ingresa tu DNI o correo asociado a la cuenta.
      </Text>
      <TextInput
        label="DNI o Correo"
        placeholder="12345678 / correo@dominio.com"
        value={identifier}
        onChangeText={setIdentifier}
        autoCapitalize="none"
      />
      <Button
        title={loading ? 'Enviando...' : sent ? 'Reenviar' : 'Enviar enlace'}
        onPress={handleRecover}
        loading={loading}
        variant="primary"
        style={{ marginTop: 16 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 8 },
});
