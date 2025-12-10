import { useEffect } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../navigation/types';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, TextInput } from '../components';
import { useTheme } from '../theme';
import { useAuthStore } from '../store/auth';

// Validación de formulario Login
const schema = z.object({
  dni: z.string().min(6, 'DNI inválido'),
  password: z.string().min(4, 'Contraseña inválida'),
});

type FormData = z.infer<typeof schema>;

type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;

export default function LoginScreen({ navigation }: Props) {
  const { colors } = useTheme();
  const login = useAuthStore((s) => s.login);
  const status = useAuthStore((s) => s.status);
  const error = useAuthStore((s) => s.error);

  const { handleSubmit, setValue, formState } = useForm<FormData>({
    defaultValues: { dni: '', password: '' },
    resolver: zodResolver(schema),
    mode: 'onSubmit',
  });

  const onSubmit = async (data: FormData) => {
    await login(data.dni, data.password);
    // Al cambiar status a authenticated, NavigationContainer re-renderiza hacia PrivateNavigator
  };

  // Efecto para redireccionar explícitamente (por si se requiere lógica por rol más adelante)
  // La navegación se maneja automáticamente por el cambio de status en AppNavigator

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <View style={styles.content}>
        <Text style={[styles.title, { color: colors.foreground }]}>Bienvenido</Text>
        <Text style={[styles.subtitle, { color: colors.mutedForeground }]}>Inicia sesión para continuar</Text>

        <View style={styles.formGroup}>
          <TextInput
            label="DNI"
            placeholder="Ingresa tu DNI"
            onChangeText={(t) => setValue('dni', t)}
            error={formState.errors.dni?.message}
            autoCapitalize="none"
            keyboardType="number-pad"
          />
        </View>
        <View style={styles.formGroup}>
          <TextInput
            label="Contraseña"
            placeholder="••••••••"
            secureTextEntry
            onChangeText={(t) => setValue('password', t)}
            error={formState.errors.password?.message}
          />
        </View>

        {error ? (
          <Text style={[styles.error, { color: colors.destructive }]}>{error}</Text>
        ) : null}

        <Button
          title={status === 'loading' ? 'Ingresando...' : 'Ingresar'}
          onPress={handleSubmit(onSubmit)}
          loading={status === 'loading'}
          variant="success"
          size="lg"
          style={styles.submit}
        />

        <View style={styles.links}>
          <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
            <Text style={[styles.linkText, { color: colors.primary }]}>¿Olvidaste tu contraseña?</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 20, flex: 1, justifyContent: 'center' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 4 },
  subtitle: { fontSize: 14, marginBottom: 24 },
  formGroup: { marginBottom: 14 },
  error: { marginTop: 8, marginBottom: 8 },
  submit: { marginTop: 8 },
  links: { marginTop: 16, alignItems: 'center' },
  linkText: { fontSize: 13, fontWeight: '500' },
});
