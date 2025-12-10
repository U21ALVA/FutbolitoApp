import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AppStackParamList } from '../navigation/types';
import { useTheme } from '../theme';
import { Card } from '../components';
// TODO(eliminar líneas 7-11): Remover imports de constantes mock
import {
  MOCK_TRAINING_DETAILS,
  MOCK_TRAINING_ONGOING,
  MOCK_TRAINING_COMPLETED,
} from '../constants';
// BACKEND READY - Descomentar:
// import { api, API_ENDPOINTS } from '../services';
// import { useState, useEffect } from 'react';

type Props = NativeStackScreenProps<AppStackParamList, 'TrainingDetail'>;

export default function TrainingDetailScreen({ route }: Props) {
  const { colors } = useTheme();
  const { trainingId } = route.params;

  // ============================================================
  // TODO(eliminar líneas 20-22): Reemplazar con llamada real al backend
  // Descomentar líneas 24-28 cuando el backend esté listo
  // ============================================================
  // NOTA: Cambiar 'upcoming' por 'ongoing' o 'completed' para testear diferentes estados
  const status: 'upcoming' | 'ongoing' | 'completed' = 'upcoming' as 'upcoming' | 'ongoing' | 'completed';

  // BACKEND READY - Descomentar cuando el backend esté disponible:
  // const [status, setStatus] = useState<'upcoming' | 'ongoing' | 'completed'>('upcoming');
  // useEffect(() => {
  //   api.get(API_ENDPOINTS.GET_TRAINING_STATUS(trainingId))
  //     .then(res => setStatus(res.data.status));
  // }, [trainingId]);

  // ============================================================
  // TODO(eliminar líneas 39-41): Datos mock. Reemplazar con datos del backend
  // ============================================================
  const trainingDetails = MOCK_TRAINING_DETAILS;
  // BACKEND READY - Descomentar y usar:
  // const [trainingDetails, setTrainingDetails] = useState<any>(null);
  // useEffect(() => {
  //   api.get(API_ENDPOINTS.GET_TRAINING_DETAIL(trainingId))
  //     .then(res => setTrainingDetails(res.data));
  // }, [trainingId]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Card title="DETALLES COMPLETOS - ENTRENAMIENTO LUNES">
          {/* Objectives Section */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
              OBJETIVOS ESPECÍFICOS:
            </Text>
            {/* TODO(eliminar línea 58): Cambiar MOCK por trainingDetails del backend */}
            {trainingDetails.objectives.map((obj, index) => (
              <View key={index} style={styles.row}>
                <Text style={styles.emoji}>✅</Text>
                <Text style={[styles.text, { color: colors.mutedForeground }]}>{obj}</Text>
              </View>
            ))}
          </View>

          {/* Coach Notes */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
              OBSERVACIONES DEL ENTRENADOR:
            </Text>
            {/* TODO(eliminar línea 73): Cambiar MOCK por trainingDetails del backend */}
            <Text style={[styles.quote, { color: colors.mutedForeground, fontStyle: 'italic' }]}>
              {trainingDetails.coachNotes}
            </Text>
          </View>

          {/* Required Materials */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
              MATERIAL REQUERIDO:
            </Text>
            {/* TODO(eliminar línea 84): Cambiar MOCK por trainingDetails del backend */}
            {trainingDetails.materials.map((mat, index) => (
              <View key={index} style={styles.row}>
                <Text style={styles.emoji}>🔹</Text>
                <Text style={[styles.text, { color: colors.mutedForeground }]}>{mat}</Text>
              </View>
            ))}
          </View>
        </Card>

        {/* Status Card - Dynamically shown based on training status */}
        {status === 'ongoing' && (
          <Card
            title="⏱️ ESTADO ACTUAL - ENTRENAMIENTO EN CURSO"
            description="Actualización en tiempo real"
          >
            <View style={styles.statusSection}>
              <Text style={[styles.statusText, { color: colors.mutedForeground }]}>
                ⏱️ Tiempo transcurrido: {MOCK_TRAINING_ONGOING.timeElapsed}
              </Text>
              <Text style={[styles.statusText, { color: colors.mutedForeground }]}>
                👥 Asistencia confirmada: {MOCK_TRAINING_ONGOING.attendance}
              </Text>
              <Text style={[styles.statusText, { color: colors.greenHouse['700'] }]}>
                ✅ JAVIER: {MOCK_TRAINING_ONGOING.playerStatus}
              </Text>
              <Text style={[styles.statusText, { color: colors.mutedForeground }]}>
                👤 Entrenador a cargo: {MOCK_TRAINING_ONGOING.coach}
              </Text>
            </View>

            <View style={[styles.divider, { backgroundColor: colors.border }]} />

            <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
              EJERCICIOS PROGRAMADOS:
            </Text>
            {MOCK_TRAINING_ONGOING.exercises.map((ex, idx) => (
              <Text
                key={idx}
                style={[
                  styles.progressText,
                  { color: ex.status === 'completado' ? colors.greenHouse['600'] : ex.status === 'en curso' ? colors.greenHouse['500'] : colors.mutedForeground },
                ]}
              >
                {'▰'.repeat(ex.progress)}{'▱'.repeat(ex.total - ex.progress)} {ex.name} ({ex.status})
              </Text>
            ))}
          </Card>
        )}

        {status === 'completed' && (
          <Card title="🏁 ENTRENAMIENTO COMPLETADO HOY">
            <View style={styles.statusSection}>
              <Text style={[styles.statusText, { color: colors.mutedForeground }]}>
                ⏱️ Duración total: {MOCK_TRAINING_COMPLETED.duration}
              </Text>
              <Text style={[styles.statusText, { color: colors.mutedForeground }]}>
                💪 Intensidad: {MOCK_TRAINING_COMPLETED.intensity}
              </Text>
              <Text style={[styles.statusText, { color: colors.greenHouse['700'] }]}>
                ⭐ Valoración: {MOCK_TRAINING_COMPLETED.rating}
              </Text>
              <Text style={[styles.statusText, { color: colors.mutedForeground }]}>
                📊 Ejercicios realizados: {MOCK_TRAINING_COMPLETED.exercisesCompleted}
              </Text>
            </View>

            <View style={[styles.divider, { backgroundColor: colors.border }]} />

            <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
              REPORTE DETALLADO - ENTRENAMIENTO
            </Text>
            <Text style={[styles.statusText, { color: colors.greenHouse['700'] }]}>
              ASISTENCIA: ✅ PRESENTE (17:55)
            </Text>
            <Text style={[styles.statusText, { color: colors.mutedForeground }]}>
              DURACIÓN REAL: {MOCK_TRAINING_COMPLETED.duration}
            </Text>
            <Text style={[styles.statusText, { color: colors.mutedForeground }]}>
              CARGA DE TRABAJO: {MOCK_TRAINING_COMPLETED.intensity}
            </Text>

            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
                OBSERVACIONES DEL ENTRENADOR CARLOS:
              </Text>
              <Text style={[styles.quote, { color: colors.mutedForeground, fontStyle: 'italic' }]}>
                {MOCK_TRAINING_COMPLETED.coachFeedback}
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
                EJERCICIOS REALIZADOS:
              </Text>
              {MOCK_TRAINING_COMPLETED.exercises.map((exercise, index) => (
                <View key={index} style={styles.row}>
                  <Text style={styles.emoji}>✓</Text>
                  <Text style={[styles.text, { color: colors.mutedForeground }]}>{exercise}</Text>
                </View>
              ))}
            </View>
          </Card>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  emoji: {
    fontSize: 14,
    marginRight: 8,
  },
  text: {
    fontSize: 14,
    flex: 1,
  },
  quote: {
    fontSize: 14,
    paddingLeft: 12,
    borderLeftWidth: 3,
    borderLeftColor: '#6bb929',
  },
  statusSection: {
    marginBottom: 16,
  },
  statusText: {
    fontSize: 14,
    marginBottom: 6,
  },
  progressText: {
    fontSize: 14,
    fontFamily: 'monospace',
    marginBottom: 4,
  },
  divider: {
    height: 1,
    marginVertical: 16,
  },
});
