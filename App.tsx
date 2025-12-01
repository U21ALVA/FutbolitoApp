import { ThemeProvider } from './src/theme';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  // Punto de entrada: provee tema y navegación protegida por Auth
  return (
    <ThemeProvider>
      <AppNavigator />
    </ThemeProvider>
  );
}
