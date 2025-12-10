import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AppStackParamList } from '../../../navigation/types';
import { useTheme } from '../../../theme';
import { Card } from '../../../components';
import {
  MOCK_TRAINING_DETAILS,
  MOCK_TRAINING_ONGOING,
  MOCK_TRAINING_COMPLETED,
} from '../../../constants';

type Props = NativeStackScreenProps<AppStackParamList, 'TrainingDetail'>;

export default function TrainingDetailScreen({ route }: Props) {
  const { colors } = useTheme();
  const { trainingId } = route.params;

  const status: 'upcoming' | 'ongoing' | 'completed' = 'upcoming' as 'upcoming' | 'ongoing' | 'completed';

  const trainingDetails = MOCK_TRAINING_DETAILS;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Card title="DETALLES COMPLETOS - ENTRENAMIENTO LUNES">
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.foreground }]}>OBJETIVOS ESPECÍFICOS:</Text>
            {trainingDetails.objectives.map((obj, index) => (
              <View key={index} style={styles.row}>
                <Text style={styles.emoji}>✅</Text>
                <Text style={[styles.text, { color: colors.mutedForeground }]}>{obj}</Text>
              </View>
            ))}
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.foreground }]}>OBSERVACIONES DEL ENTRENADOR:</Text>
            <Text style={[styles.quote, { color: colors.mutedForeground, fontStyle: 'italic' }]}>
              {trainingDetails.coachNotes}
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.foreground }]}>MATERIAL REQUERIDO:</Text>
            {trainingDetails.materials.map((mat, index) => (
              <View key={index} style={styles.row}>
                <Text style={styles.emoji}>🔹</Text>
                <Text style={[styles.text, { color: colors.mutedForeground }]}>{mat}</Text>
              </View>
            ))}
          </View>
        </Card>

        {status === 'ongoing' && (
          <Card title="⏱️ ESTADO ACTUAL - ENTRENAMIENTO EN CURSO" description="Actualización en tiempo real">
            <View style={styles.statusSection}>
              <Text style={[styles.statusText, { color: colors.mutedForeground }]}>⏱️ Tiempo transcurrido: {MOCK_TRAINING_ONGOING.timeElapsed}</Text>
              <Text style={[styles.statusText, { color: colors.mutedForeground }]}>👥 Asistencia confirmada: {MOCK_TRAINING_ONGOING.attendance}</Text>
              <Text style={[styles.statusText, { color: colors.greenHouse['700'] }]}>✅ JAVIER: {MOCK_TRAINING_ONGOING.playerStatus}</Text>
              <Text style={[styles.statusText, { color: colors.mutedForeground }]}>👤 Entrenador a cargo: {MOCK_TRAINING_ONGOING.coach}</Text>
            </View>
          </Card>
        )}

        {status === 'completed' && (
          <Card title="🏁 ENTRENAMIENTO COMPLETADO HOY">
            <View style={styles.statusSection}>
              <Text style={[styles.statusText, { color: colors.mutedForeground }]}>⏱️ Duración total: {MOCK_TRAINING_COMPLETED.duration}</Text>
              <Text style={[styles.statusText, { color: colors.mutedForeground }]}>💪 Intensidad: {MOCK_TRAINING_COMPLETED.intensity}</Text>
              <Text style={[styles.statusText, { color: colors.greenHouse['700'] }]}>
                ⭐ Valoración: {MOCK_TRAINING_COMPLETED.rating}
              </Text>
              <Text style={[styles.statusText, { color: colors.mutedForeground }]}>📊 Ejercicios realizados: {MOCK_TRAINING_COMPLETED.exercisesCompleted}</Text>
            </View>
          </Card>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, paddingBottom: 40 },
  section: { marginBottom: 20 },
  sectionTitle: { fontSize: 16, fontWeight: '700', marginBottom: 12 },
  row: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 8 },
  emoji: { fontSize: 14, marginRight: 8 },
  text: { fontSize: 14, flex: 1 },
  quote: { fontSize: 14, paddingLeft: 12, borderLeftWidth: 3, borderLeftColor: '#6bb929' },
  statusSection: { marginBottom: 16 },
  statusText: { fontSize: 14, marginBottom: 6 },
  progressText: { fontSize: 14, fontFamily: 'monospace', marginBottom: 4 },
  divider: { height: 1, marginVertical: 16 },
});
