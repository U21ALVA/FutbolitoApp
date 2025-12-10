import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../theme';

interface TabBarProps {
  activeTab: 'home' | 'calendar' | 'profile';
  onTabPress: (tab: 'home' | 'calendar' | 'profile') => void;
}

export function TabBar({ activeTab, onTabPress }: TabBarProps) {
  const { colors } = useTheme();

  const tabs = [
    { id: 'home' as const, label: 'Inicio', icon: '🏠' },
    { id: 'calendar' as const, label: 'Calendario', icon: '📅' },
    { id: 'profile' as const, label: 'Perfil', icon: '👤' },
  ];

  return (
    <View style={[styles.container, { backgroundColor: colors.card, borderTopColor: colors.border }]}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <TouchableOpacity
            key={tab.id}
            style={styles.tab}
            onPress={() => onTabPress(tab.id)}
            activeOpacity={0.7}
          >
            <Text style={styles.icon}>{tab.icon}</Text>
            <Text
              style={[
                styles.label,
                {
                  color: isActive ? colors.greenHouse['700'] : colors.mutedForeground,
                  fontWeight: isActive ? '700' : '500',
                },
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderTopWidth: 1,
    paddingBottom: 8,
    paddingTop: 8,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  icon: {
    fontSize: 22,
    marginBottom: 4,
  },
  label: {
    fontSize: 12,
  },
});
