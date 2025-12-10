import { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  RefreshControl,
  Platform,
  ToastAndroid,
  Alert,
  Animated,
} from 'react-native';
import { MaterialIcons, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../../theme';
import { useAuthStore } from '../../../store';
import { TrainingCard, EventCard, PlayerStats, Card } from '../../../components';
import { MOCK_TRAINING, MOCK_UPCOMING_EVENTS, MOCK_PLAYER_STATS } from '../../../constants';

export default function HomeScreen({ navigation }: any) {
  const { colors } = useTheme();
  const user = useAuthStore((s) => s.user);
  const [refreshing, setRefreshing] = useState(false);
  const [fabScale] = useState(new Animated.Value(1));
  const [notificationCount] = useState(3);

  const todayTraining = MOCK_TRAINING;
  const upcomingEvents = MOCK_UPCOMING_EVENTS;
  const playerStats = MOCK_PLAYER_STATS;

  const showToast = (message: string) => {
    if (Platform.OS === 'android') {
      ToastAndroid.show(message, ToastAndroid.SHORT);
    } else {
      Alert.alert('', message);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    // Simular carga de datos
    await new Promise(resolve => setTimeout(resolve, 1500));
    setRefreshing(false);
    showToast('✅ Información actualizada');
  };

  const handleQuickAction = (action: string) => {
    Animated.sequence([
      Animated.timing(fabScale, { toValue: 0.9, duration: 100, useNativeDriver: true }),
      Animated.timing(fabScale, { toValue: 1, duration: 100, useNativeDriver: true }),
    ]).start();

    switch (action) {
      case 'payments':
                showToast('Ir a Pagos');
        navigation.navigate('Payments');
        break;
      case 'calendar':
        showToast('Ver calendario completo');
        navigation.navigate('Calendar');
        break;
      case 'message':
        showToast('Próximamente: chat con entrenadores');
        break;
      case 'support':
        showToast('Soporte disponible 9am-6pm');
        break;
    }
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return '🌅 Buenos días';
    if (hour < 19) return '☀️ Buenas tardes';
    return '🌙 Buenas noches';
  };

  const getInitials = () => {
    if (!user) return 'U';
    const firstInitial = user.nombre?.[0] || '';
    const lastInitial = user.apellido?.[0] || '';
    return `${firstInitial}${lastInitial}`.toUpperCase();
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header mejorado con avatar y notificaciones */}
      <View style={[styles.header, { backgroundColor: colors.card, borderBottomColor: colors.border }]}>
        <View style={styles.headerLeft}>
          <TouchableOpacity 
            style={[styles.avatar, { backgroundColor: colors.greenHouse['600'] }]}
            onPress={() => navigation.navigate('Profile')}
            activeOpacity={0.7}
          >
            <Text style={styles.avatarText}>{getInitials()}</Text>
          </TouchableOpacity>
          <View style={styles.greetingContainer}>
            <Text style={[styles.greeting, { color: colors.mutedForeground }]}>
              {getGreeting()}
            </Text>
            <Text style={[styles.userName, { color: colors.foreground }]}>
              {user?.nombre || 'Usuario'}
            </Text>
          </View>
        </View>
        
        <View style={styles.headerRight}>
          <TouchableOpacity 
            style={styles.iconButton}
            onPress={() => showToast('No hay nuevas notificaciones')}
          >
            <MaterialIcons name="notifications" size={24} color={colors.foreground} />
            {notificationCount > 0 && (
              <View style={[styles.badge, { backgroundColor: colors.destructive }]}>
                <Text style={styles.badgeText}>{notificationCount}</Text>
              </View>
            )}
          </TouchableOpacity>
                  
        </View>
      </View>

      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl 
            refreshing={refreshing} 
            onRefresh={onRefresh}
            tintColor={colors.greenHouse['600']}
            colors={[colors.greenHouse['600']]}
          />
        }
      >
        {/* Quick Actions - Accesos rápidos para padres */}
        <Card style={[styles.quickActionsCard, { backgroundColor: colors.card }]}>
          <View style={styles.quickActionsHeader}>
            <MaterialIcons name="flash-on" size={18} color={colors.greenHouse['700']} style={{ marginRight: 6 }} />
            <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Accesos Rápidos</Text>
          </View>
          <View style={styles.quickActionsGrid}>
            <TouchableOpacity 
              style={[styles.quickActionButton, { backgroundColor: colors.greenHouse['50'] }]}
              onPress={() => handleQuickAction('payments')}
              activeOpacity={0.7}
            >
                            <MaterialIcons name="payment" size={28} color={colors.greenHouse['700']} style={styles.quickActionIcon} />
              <Text style={[styles.quickActionLabel, { color: colors.greenHouse['700'] }]}>
                Pagos
              </Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.quickActionButton, { backgroundColor: colors.greenHouse['50'] }]}
              onPress={() => handleQuickAction('calendar')}
              activeOpacity={0.7}
            >
                            <MaterialIcons name="calendar-today" size={28} color={colors.greenHouse['700']} style={styles.quickActionIcon} />
              <Text style={[styles.quickActionLabel, { color: colors.greenHouse['700'] }]}>
                Calendario
              </Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.quickActionButton, { backgroundColor: colors.greenHouse['50'] }]}
              onPress={() => handleQuickAction('message')}
              activeOpacity={0.7}
            >
                            <MaterialIcons name="chat" size={28} color={colors.greenHouse['700']} style={styles.quickActionIcon} />
              <Text style={[styles.quickActionLabel, { color: colors.greenHouse['700'] }]}>
                Mensajes
              </Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.quickActionButton, { backgroundColor: colors.greenHouse['50'] }]}
              onPress={() => handleQuickAction('support')}
              activeOpacity={0.7}
            >
                            <MaterialIcons name="support-agent" size={28} color={colors.greenHouse['700']} style={styles.quickActionIcon} />
              <Text style={[styles.quickActionLabel, { color: colors.greenHouse['700'] }]}>
                Soporte
              </Text>
            </TouchableOpacity>
          </View>
        </Card>

        {/* Estado del hijo - Info card destacada */}
        <Card style={[styles.statusCard, { 
          backgroundColor: colors.greenHouse['600'],
          borderColor: colors.greenHouse['700'],
        }]}>
          <View style={styles.statusHeader}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                          <MaterialCommunityIcons name="soccer-field" size={18} color="#fff" style={{ marginRight: 6 }} />
                          <Text style={styles.statusTitle}>Estado de tu hijo</Text>
                        </View>
            <TouchableOpacity 
              style={styles.statusButton}
              onPress={() => showToast('Ver informe completo')}
            >
              <Text style={styles.statusButtonText}>Ver más</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.statusStats}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>12</Text>
              <Text style={styles.statLabel}>Entrenamientos</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>95%</Text>
              <Text style={styles.statLabel}>Asistencia</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>8.5</Text>
              <Text style={styles.statLabel}>Promedio</Text>
            </View>
          </View>
        </Card>

        {/* Entrenamiento de hoy */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <MaterialIcons name="flag" size={18} color={colors.foreground} style={{ marginRight: 6 }} />
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <MaterialIcons name="flag" size={18} color={colors.foreground} style={{ marginRight: 6 }} />
                  <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Entrenamiento de Hoy</Text>
                </View>
              </View>
                          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <MaterialIcons name="event" size={18} color={colors.foreground} style={{ marginRight: 6 }} />
                            <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Próximos Eventos</Text>
                          </View>
                          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <MaterialIcons name="bar-chart" size={18} color={colors.foreground} style={{ marginRight: 6 }} />
                            <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Últimas Evaluaciones</Text>
                          </View>
            </Text>
            {todayTraining && (
              <TouchableOpacity onPress={() => showToast('⏰ Recordatorio activado')}>
                <Text style={[styles.sectionAction, { color: colors.greenHouse['600'] }]}>
                  Recordar
                </Text>
              </TouchableOpacity>
            )}
          </View>
          {todayTraining ? (
            <TrainingCard
              date={todayTraining.date}
              title={todayTraining.title}
              time={todayTraining.time}
              location={todayTraining.location}
              objective={todayTraining.objective}
              materials={todayTraining.materials}
              onPress={() => {
                navigation.navigate('TrainingDetail', { trainingId: todayTraining.id });
                showToast('Abriendo detalles del entrenamiento');
              }}
            />
          ) : (
            <Card style={[styles.emptyCard, { backgroundColor: colors.card }]}>
              <MaterialIcons name="celebration" size={48} color={colors.greenHouse['600']} style={styles.emptyIcon} />
              <Text style={[styles.emptyText, { color: colors.mutedForeground }]}>
                No hay entrenamientos programados para hoy
              </Text>
            </Card>
          )}
        </View>

        {/* Próximos eventos */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <MaterialIcons name="event" size={18} color={colors.foreground} style={{ marginRight: 6 }} />
              <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Próximos Eventos</Text>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('Calendar')}>
              <Text style={[styles.sectionAction, { color: colors.greenHouse['600'] }]}>
                Ver todos
              </Text>
            </TouchableOpacity>
          </View>
          <EventCard title="" events={upcomingEvents} />
        </View>

        {/* Rendimiento del jugador */}
        {playerStats && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <MaterialIcons name="bar-chart" size={18} color={colors.foreground} style={{ marginRight: 6 }} />
                <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Últimas Evaluaciones</Text>
              </View>
              <TouchableOpacity onPress={() => showToast('📈 Ver historial completo')}>
                <Text style={[styles.sectionAction, { color: colors.greenHouse['600'] }]}>
                  Historial
                </Text>
              </TouchableOpacity>
            </View>
            <PlayerStats lastEvaluations={playerStats.lastEvaluations} />
          </View>
        )}

        {/* Tips para padres */}
        <Card style={[styles.tipCard, { 
          backgroundColor: colors.card,
          borderLeftColor: colors.greenHouse['600'],
        }]}>
          <MaterialIcons name="lightbulb" size={28} color={colors.greenHouse['600']} style={styles.tipIcon} />
          <View style={styles.tipContent}>
            <Text style={[styles.tipTitle, { color: colors.foreground }]}>
              Consejo del día
            </Text>
            <Text style={[styles.tipText, { color: colors.mutedForeground }]}>
              Recuerda mantener una hidratación adecuada antes y después del entrenamiento.
              Es fundamental para el rendimiento deportivo.
            </Text>
          </View>
        </Card>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* FAB - Floating Action Button */}
      <Animated.View 
        style={[
          styles.fab, 
          { 
            backgroundColor: colors.greenHouse['600'],
            transform: [{ scale: fabScale }],
          }
        ]}
      >
        <TouchableOpacity
          style={styles.fabButton}
          onPress={() => {
            handleQuickAction('message');
            Animated.sequence([
              Animated.timing(fabScale, { toValue: 1.1, duration: 100, useNativeDriver: true }),
              Animated.timing(fabScale, { toValue: 1, duration: 100, useNativeDriver: true }),
            ]).start();
          }}
          activeOpacity={0.9}
        >
            <Ionicons name="chatbubble-ellipses" size={22} color="#fff" style={styles.fabIcon} />
        </TouchableOpacity>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  avatarText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  greetingContainer: {
    flex: 1,
  },
  greeting: {
    fontSize: 13,
    fontWeight: '500',
    marginBottom: 2,
  },
  userName: {
    fontSize: 18,
    fontWeight: '700',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    position: 'relative',
    padding: 8,
  },
  icon: {
    fontSize: 24,
  },
  badge: {
    position: 'absolute',
    top: 4,
    right: 4,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '700',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  quickActionsCard: {
    padding: 20,
    borderRadius: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  quickActionsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  quickActionButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 8,
    borderRadius: 12,
    marginHorizontal: 4,
  },
  quickActionIcon: {
    marginBottom: 8,
    alignSelf: 'center',
  },
  quickActionLabel: {
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
  statusCard: {
    padding: 20,
    borderRadius: 16,
    marginBottom: 20,
    borderWidth: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  statusHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  statusTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  statusButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  statusButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  statusStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 4,
  },
  statLabel: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 12,
    fontWeight: '500',
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  sectionAction: {
    fontSize: 14,
    fontWeight: '600',
  },
  emptyCard: {
    padding: 32,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  emptyIcon: {
    marginBottom: 12,
  },
  emptyText: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
  tipCard: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  tipIcon: {
    fontSize: 28,
    marginRight: 12,
  },
  tipContent: {
    flex: 1,
  },
  tipTitle: {
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 6,
  },
  tipText: {
    fontSize: 13,
    lineHeight: 18,
  },
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 60,
    height: 60,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  fabButton: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fabIcon: {
    fontSize: 28,
  },
});
