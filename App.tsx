import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Alert,
} from 'react-native';
import { useState } from 'react';
import { ThemeProvider, useTheme } from './src/theme';
import {
  Button,
  TextInput,
  Card,
  Divider,
  ThemeSwitcher,
} from './src/components';

function DemoScreen() {
  const { colors, isDark, mode } = useTheme();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      Alert.alert('Enviado', `Nombre: ${name}\nEmail: ${email}`);
    }, 1500);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.foreground }]}>
            Fútbol Academia
          </Text>
          <Text style={[styles.subtitle, { color: colors.mutedForeground }]}>
            Demo de Componentes UI
          </Text>
        </View>

        {/* Theme Switcher Card */}
        <Card title="Configuración de Tema" description="Elige cómo se ve la app">
          <ThemeSwitcher />
          <View style={styles.themeInfo}>
            <Text style={[styles.infoText, { color: colors.mutedForeground }]}>
              Modo actual: {mode === 'light' ? '☀️ Claro' : mode === 'dark' ? '🌙 Oscuro' : '📱 Sistema'}
            </Text>
          </View>
        </Card>

        <Divider />

        {/* Form Card */}
        <Card title="Formulario de Ejemplo" description="Prueba los inputs">
          <View style={styles.formGroup}>
            <TextInput
              label="Nombre completo"
              placeholder="Ingresa tu nombre"
              value={name}
              onChangeText={setName}
            />
          </View>
          <View style={styles.formGroup}>
            <TextInput
              label="Correo electrónico"
              placeholder="correo@ejemplo.com"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              helperText="No compartiremos tu correo con nadie"
            />
          </View>
          <View style={styles.formGroup}>
            <TextInput
              label="Campo con error"
              placeholder="Este campo tiene un error"
              error="Este campo es requerido"
            />
          </View>
        </Card>

        <Divider />

        {/* Buttons Card */}
        <Card title="Variantes de Botones" description="Diferentes estilos disponibles">
          <View style={styles.buttonGroup}>
            <Button title="Primary" variant="primary" onPress={() => Alert.alert('Primary')} />
            <Button title="Secondary" variant="secondary" onPress={() => Alert.alert('Secondary')} />
          </View>
          <View style={styles.buttonGroup}>
            <Button title="Outline" variant="outline" onPress={() => Alert.alert('Outline')} />
            <Button title="Ghost" variant="ghost" onPress={() => Alert.alert('Ghost')} />
          </View>
          <View style={styles.buttonGroup}>
            <Button title="Success ✓" variant="success" onPress={() => Alert.alert('Success!')} />
            <Button title="Destructive" variant="destructive" onPress={() => Alert.alert('Delete?')} />
          </View>
          <View style={styles.buttonGroup}>
            <Button title="Disabled" disabled />
            <Button title="Loading..." loading />
          </View>
        </Card>

        <Divider />

        {/* Button Sizes */}
        <Card title="Tamaños de Botones">
          <View style={styles.sizeButtons}>
            <Button title="Small" size="sm" variant="outline" />
            <Button title="Medium" size="md" variant="outline" />
            <Button title="Large" size="lg" variant="outline" />
          </View>
        </Card>

        <Divider />

        {/* Green House Palette */}
        <Card title="Paleta Green House" description="Colores de la marca">
          <View style={styles.paletteContainer}>
            {Object.entries(colors.greenHouse).map(([key, value]) => (
              <View key={key} style={styles.colorItem}>
                <View style={[styles.colorSwatch, { backgroundColor: value }]} />
                <Text style={[styles.colorLabel, { color: colors.mutedForeground }]}>
                  {key}
                </Text>
              </View>
            ))}
          </View>
        </Card>

        <Divider />

        {/* Action Button */}
        <Button
          title={loading ? 'Enviando...' : 'Enviar Formulario'}
          variant="success"
          size="lg"
          loading={loading}
          onPress={handleSubmit}
          style={styles.submitButton}
        />

        <View style={styles.footer}>
          <Text style={[styles.footerText, { color: colors.mutedForeground }]}>
            Fútbol Academia © 2025
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <DemoScreen />
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingTop: 40,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    marginTop: 4,
  },
  themeInfo: {
    marginTop: 12,
  },
  infoText: {
    fontSize: 13,
  },
  formGroup: {
    marginBottom: 16,
  },
  buttonGroup: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  sizeButtons: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  paletteContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  colorItem: {
    alignItems: 'center',
  },
  colorSwatch: {
    width: 28,
    height: 28,
    borderRadius: 6,
  },
  colorLabel: {
    fontSize: 10,
    marginTop: 2,
  },
  submitButton: {
    marginVertical: 8,
  },
  footer: {
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 40,
  },
  footerText: {
    fontSize: 12,
  },
});
