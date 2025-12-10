import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../theme';
import { useAuthStore } from '../store';
import { TrainingCard, EventCard, PlayerStats } from '../components';
// TODO(eliminar líneas 6-7): Remover imports de constantes mock
import { MOCK_TRAINING, MOCK_UPCOMING_EVENTS, MOCK_PLAYER_STATS } from '../constants';
// BACKEND READY - Descomentar:
// import { api, API_ENDPOINTS } from '../services';
// import { useState, useEffect } from 'react';

export default function HomeScreen({ navigation }: any) {
  const { colors } = useTheme();
  const user = useAuthStore((s) => s.user);

  // ============================================================
  // TODO(eliminar líneas 18-20): Reemplazar con llamadas al backend
  // Descomentar líneas 22-33 cuando el backend esté listo
  // ============================================================
  const todayTraining = MOCK_TRAINING;
  const upcomingEvents = MOCK_UPCOMING_EVENTS;
  const playerStats = MOCK_PLAYER_STATS;

  // BACKEND READY - Descomentar:
  // const [todayTraining, setTodayTraining] = useState<any>(null);
  // const [upcomingEvents, setUpcomingEvents] = useState<any[]>([]);
  // const [playerStats, setPlayerStats] = useState<any>(null);
  // useEffect(() => {
  //   api.get(API_ENDPOINTS.GET_TRAININGS)
  //     .then(res => setTodayTraining(res.data.today));
  //   api.get(API_ENDPOINTS.GET_UPCOMING_EVENTS)
  //     .then(res => setUpcomingEvents(res.data));
  //   api.get(API_ENDPOINTS.GET_PLAYER_STATS('javier-id'))
  //     .then(res => setPlayerStats(res.data));
  // }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Welcome Header */}
        <View style={styles.welcomeSection}>
          <Text style={[styles.welcomeText, { color: colors.greenHouse['700'] }]}>
            Bienvenido de vuelta
          </Text>
          <Text style={[styles.userName, { color: colors.foreground }]}>
            {user?.nombre?.toUpperCase() || 'USUARIO'}
          </Text>
        </View>

        {/* CUADRO 1: Training Card */}
        {/* TODO(eliminar líneas 48-56): Cambiar MOCK por todayTraining del backend */}
        {todayTraining && (
          <TrainingCard
            date={todayTraining.date}
            title={todayTraining.title}
            time={todayTraining.time}
            location={todayTraining.location}
            objective={todayTraining.objective}
            materials={todayTraining.materials}
            onPress={() => navigation.navigate('TrainingDetail', { trainingId: todayTraining.id })}
          />
        )}

        {/* CUADRO 2: Upcoming Events */}
        {/* TODO(eliminar línea 65): Cambiar MOCK por upcomingEvents del backend */}
        <EventCard title="📅 PRÓXIMOS EVENTOS" events={upcomingEvents} />

        {/* CUADRO 3: Player Stats */}
        {/* TODO(eliminar línea 69): Cambiar MOCK por playerStats del backend */}
        {playerStats && <PlayerStats lastEvaluations={playerStats.lastEvaluations} />}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  welcomeSection: {
    marginBottom: 24,
  },
  welcomeText: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  userName: {
    fontSize: 28,
    fontWeight: '700',
  },
});
