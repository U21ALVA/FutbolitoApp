import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../theme';
import { Button } from '../components';

export default function HomeScreen({ navigation }: any) {
  const { colors } = useTheme();
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.foreground }]}>Inicio</Text>
      <Text style={{ color: colors.mutedForeground, marginBottom: 16 }}>
        Navegación protegida. Solo usuarios autenticados pueden ver esta pantalla.
      </Text>
      <Button title="Mi Perfil" onPress={() => navigation.navigate('Profile')} variant="primary" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 8 },
});
