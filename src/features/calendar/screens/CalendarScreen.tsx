import { View, Text, StyleSheet, ScrollView, Alert, TouchableOpacity, Modal } from 'react-native';
import { useTheme } from '../../../theme';
import { Button } from '../../../components';
import { MOCK_MATCH, MOCK_UPCOMING_EVENTS } from '../../../constants';
import { useState } from 'react';

export default function CalendarScreen() {
  const { colors } = useTheme();
  const [attendanceConfirmed, setAttendanceConfirmed] = useState(false);
  const [calendarExpanded, setCalendarExpanded] = useState(false);
  const [selectedEventModal, setSelectedEventModal] = useState<any>(null);

  const matchData = MOCK_MATCH;
  const upcomingEvents = MOCK_UPCOMING_EVENTS;

  const handleConfirmAttendance = (willAttend: boolean) => {
    setAttendanceConfirmed(true);
    Alert.alert(
      'Asistencia confirmada',
      willAttend
        ? 'Javier asistirá al partido. Llegada confirmada a las 10:15'
        : 'Has indicado que Javier no podrá asistir al partido',
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <TouchableOpacity
          style={[styles.calendarHeader, { backgroundColor: colors.card, borderColor: colors.border }]}
          onPress={() => setCalendarExpanded(!calendarExpanded)}
          activeOpacity={0.8}
        >
          <Text style={styles.calendarIcon}>📅</Text>
          <Text style={[styles.calendarTitle, { color: colors.foreground }]}>Calendario del Mes</Text>
          <Text style={[styles.expandIcon, { color: colors.mutedForeground }]}> {calendarExpanded ? '▲' : '▼'}</Text>
        </TouchableOpacity>

        {calendarExpanded && (
          <View style={[styles.calendarExpanded, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Text style={[styles.monthName, { color: colors.foreground }]}>Enero 2024</Text>
            <View style={styles.miniCalendar}>
              {['L', 'M', 'X', 'J', 'V', 'S', 'D'].map((day, idx) => (
                <Text key={idx} style={[styles.dayLabel, { color: colors.mutedForeground }]}>{day}</Text>
              ))}
              {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => {
                const dateStr = `2024-01-${String(day).padStart(2, '0')}`;
                const isMarked = upcomingEvents.some(e => e.date === dateStr);
                const isToday = day === 15;

                return (
                  <TouchableOpacity
                    key={day}
                    style={[
                      styles.dayCell,
                      isToday && { backgroundColor: colors.greenHouse['700'] },
                      isMarked && !isToday && { backgroundColor: colors.greenHouse['200'] },
                    ]}
                    onPress={() => {
                      const event = upcomingEvents.find(e => e.date === dateStr);
                      if (event && event.type === 'match') {
                        setSelectedEventModal(matchData);
                      }
                    }}
                  >
                    <Text style={[
                      styles.dayNumber,
                      { color: isToday ? '#fff' : colors.foreground },
                      isMarked && !isToday && { fontWeight: '700', color: colors.greenHouse['800'] }
                    ]}>
                      {day}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        )}

        {matchData && matchData.requiresConfirmation && !attendanceConfirmed && (
          <View style={[styles.priorityCard, { backgroundColor: colors.greenHouse['100'], borderColor: colors.greenHouse['600'] }]}>
            <Text style={styles.priorityIcon}>⚠️</Text>
            <Text style={[styles.priorityTitle, { color: colors.greenHouse['900'] }]}>¡Confirma tu asistencia!</Text>
            <Text style={[styles.prioritySubtitle, { color: colors.greenHouse['800'] }]}>Partido del {matchData.day}</Text>
            <View style={styles.priorityButtons}>
              <Button
                title="✅ Asistiré"
                onPress={() => handleConfirmAttendance(true)}
                variant="primary"
                style={{ flex: 1, marginRight: 8 }}
              />
              <Button
                title="❌ No asistiré"
                onPress={() => handleConfirmAttendance(false)}
                variant="outline"
                style={{ flex: 1, marginLeft: 8 }}
              />
            </View>
          </View>
        )}

        <View style={styles.eventsSection}>
          <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Próximos Eventos</Text>
          {upcomingEvents.map((event) => (
            <TouchableOpacity
              key={event.id}
              style={[styles.eventCard, { backgroundColor: colors.card, borderColor: colors.border }]}
              onPress={() => {
                if (event.type === 'match') {
                  setSelectedEventModal(matchData);
                }
              }}
              activeOpacity={0.7}
            >
              <View style={styles.eventHeader}>
                <Text style={styles.eventIcon}>{event.type === 'match' ? '⚽' : '🏃'}</Text>
                <View style={styles.eventInfo}>
                  <Text style={[styles.eventDay, { color: colors.foreground }]}>{event.day}</Text>
                  <Text style={[styles.eventDescription, { color: colors.mutedForeground }]}>
                    {event.description}
                  </Text>
                  {event.time && (
                    <Text style={[styles.eventTime, { color: colors.greenHouse['700'] }]}>🕐 {event.time}</Text>
                  )}
                </View>
              </View>
              {event.type === 'match' && (
                <TouchableOpacity
                  style={[styles.detailsButton, { backgroundColor: colors.greenHouse['700'] }]}
                  onPress={() => setSelectedEventModal(matchData)}
                >
                  <Text style={styles.detailsButtonText}>Ver Detalles</Text>
                </TouchableOpacity>
              )}
            </TouchableOpacity>
          ))}
        </View>

        <Modal
          animationType="fade"
          transparent={true}
          visible={selectedEventModal !== null}
          onRequestClose={() => setSelectedEventModal(null)}
        >
          <TouchableOpacity
            style={styles.modalOverlay}
            activeOpacity={1}
            onPress={() => setSelectedEventModal(null)}
          >
            <ScrollView
              contentContainerStyle={styles.modalScrollContent}
              onStartShouldSetResponder={() => true}
            >
              <View style={[styles.modalContent, { backgroundColor: colors.card }]}> 
                {selectedEventModal && (
                  <>
                    <Text style={[styles.modalTitle, { color: colors.foreground }]}>{selectedEventModal.day}</Text>
                    <Text style={[styles.modalSubtitle, { color: colors.greenHouse['700'] }]}>⚽ {selectedEventModal.event}</Text>

                    <View style={styles.modalDetails}>
                      <Text style={[styles.modalDetailRow, { color: colors.foreground }]}>🕐 {selectedEventModal.time}</Text>
                      <Text style={[styles.modalDetailRow, { color: colors.foreground }]}>🆚 {selectedEventModal.versus}</Text>
                      <Text style={[styles.modalDetailRow, { color: colors.foreground }]}>📍 {selectedEventModal.location}</Text>
                      {selectedEventModal.details && (
                        <>
                          <View style={[styles.separator, { backgroundColor: colors.border }]} />
                          <Text style={[styles.modalDetailRow, { color: colors.mutedForeground }]}>{selectedEventModal.details.uniform}</Text>
                          <Text style={[styles.modalDetailRow, { color: colors.mutedForeground }]}>{selectedEventModal.details.arrivalTime}</Text>
                          <Text style={[styles.modalDetailRow, { color: colors.mutedForeground }]}>{selectedEventModal.details.parking}</Text>
                          <Text style={[styles.modalDetailRow, { color: colors.mutedForeground }]}>{selectedEventModal.details.contact}</Text>
                          <Text style={[styles.modalDetailRow, { color: colors.mutedForeground }]}>{selectedEventModal.details.weather}</Text>
                        </>
                      )}
                    </View>

                    <TouchableOpacity
                      style={[styles.closeButton, { backgroundColor: colors.greenHouse['700'] }]}
                      onPress={() => setSelectedEventModal(null)}
                    >
                      <Text style={styles.closeButtonText}>Cerrar</Text>
                    </TouchableOpacity>
                  </>
                )}
              </View>
            </ScrollView>
          </TouchableOpacity>
        </Modal>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { padding: 16 },
  calendarHeader: { flexDirection: 'row', alignItems: 'center', padding: 16, borderRadius: 12, borderWidth: 1, marginBottom: 12 },
  calendarIcon: { fontSize: 24, marginRight: 12 },
  calendarTitle: { flex: 1, fontSize: 18, fontWeight: '700' },
  expandIcon: { fontSize: 14 },
  calendarExpanded: { borderRadius: 12, borderWidth: 1, padding: 16, marginBottom: 16 },
  monthName: { fontSize: 20, fontWeight: '700', marginBottom: 16, textAlign: 'center' },
  miniCalendar: { flexDirection: 'row', flexWrap: 'wrap' },
  dayLabel: { width: '14.28%', textAlign: 'center', fontSize: 12, fontWeight: '600', marginBottom: 8 },
  dayCell: { width: '14.28%', aspectRatio: 1, justifyContent: 'center', alignItems: 'center', borderRadius: 8, marginBottom: 4 },
  dayNumber: { fontSize: 14 },
  priorityCard: { borderRadius: 12, borderWidth: 2, padding: 16, marginBottom: 20, alignItems: 'center' },
  priorityIcon: { fontSize: 32, marginBottom: 8 },
  priorityTitle: { fontSize: 18, fontWeight: '700', marginBottom: 4 },
  prioritySubtitle: { fontSize: 14, marginBottom: 16 },
  priorityButtons: { flexDirection: 'row', width: '100%' },
  eventsSection: { marginTop: 8 },
  sectionTitle: { fontSize: 20, fontWeight: '700', marginBottom: 16 },
  eventCard: { borderRadius: 12, borderWidth: 1, padding: 16, marginBottom: 12 },
  eventHeader: { flexDirection: 'row', alignItems: 'center' },
  eventIcon: { fontSize: 28, marginRight: 12 },
  eventInfo: { flex: 1 },
  eventDay: { fontSize: 16, fontWeight: '700', marginBottom: 4 },
  eventDescription: { fontSize: 14, marginBottom: 4 },
  eventTime: { fontSize: 13, fontWeight: '600' },
  detailsButton: { marginTop: 12, paddingVertical: 8, paddingHorizontal: 16, borderRadius: 8, alignSelf: 'flex-start' },
  detailsButtonText: { color: '#fff', fontSize: 13, fontWeight: '600' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.6)', justifyContent: 'center', padding: 20 },
  modalScrollContent: { flexGrow: 1, justifyContent: 'center' },
  modalContent: { width: '100%', maxWidth: 400, borderRadius: 16, padding: 24, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 8, alignSelf: 'center' },
  modalTitle: { fontSize: 20, fontWeight: '700', textAlign: 'center', marginBottom: 8 },
  modalSubtitle: { fontSize: 16, fontWeight: '600', textAlign: 'center', marginBottom: 20 },
  modalDetails: { marginBottom: 20 },
  modalDetailRow: { fontSize: 14, lineHeight: 24, marginBottom: 4 },
  separator: { height: 1, marginVertical: 12 },
  closeButton: { paddingVertical: 14, borderRadius: 10, alignItems: 'center' },
  closeButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});
