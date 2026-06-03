import { View, ScrollView, Pressable, StyleSheet } from "react-native";
import { useTheme } from "@/hooks/useTheme";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ThemedText } from "@/components/common/ThemedText";
import { GlassCard } from "@/components/common/GlassCard";
import { EventCard } from "@/components/schedule/EventCard";
import { MaterialIcons } from "@expo/vector-icons";

interface CalendarDay {
  day: number;
  hasEvent: boolean;
  isToday: boolean;
}

export default function ScheduleScreen() {
  const theme = useTheme();
    const insets = useSafeAreaInsets()
  const calendarDays: CalendarDay[] = [
    { day: 11, hasEvent: false, isToday: false },
    { day: 12, hasEvent: false, isToday: false },
    { day: 13, hasEvent: true, isToday: true },
    { day: 14, hasEvent: true, isToday: false },
    { day: 15, hasEvent: false, isToday: false },
    { day: 16, hasEvent: false, isToday: false },
  ];

  const dayLabels = ["MON", "TUE", "WED", "THU", "FRI", "SAT"];

  return (
    <View style={[styles.container, { backgroundColor: theme.background, paddingTop : insets.top }]}>
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <MaterialIcons name="auto-awesome" size={22} color={theme.primaryContainer} />
          <ThemedText variant="headline" style={{ fontSize: 22 }}>
            Charmaine
          </ThemedText>
        </View>
        <MaterialIcons name="graphic-eq" size={22} color={theme.textSecondary} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <GlassCard>
          <View style={styles.calendarHeader}>
            <ThemedText variant="title" style={{ fontSize: 18 }}>
              September 2024
            </ThemedText>
            <ThemedText variant="label" style={{ color: theme.textSecondary }}>
              Calendar
            </ThemedText>
          </View>

          <View style={styles.calendarRow}>
            {dayLabels.map((label, i) => (
              <View key={label} style={styles.calendarDayWrapper}>
                <ThemedText
                  variant="label"
                  style={{
                    fontSize: 9,
                    textAlign: "center",
                    color: theme.textSecondary,
                  }}
                >
                  {label}
                </ThemedText>
                <View
                  style={[
                    styles.calendarDay,
                    calendarDays[i].isToday && {
                      backgroundColor: theme.primaryContainer,
                    },
                    calendarDays[i].hasEvent &&
                      !calendarDays[i].isToday && {
                        backgroundColor: theme.surfaceContainerHigh,
                      },
                  ]}
                >
                  <ThemedText
                    variant="body"
                    style={{
                      fontSize: 14,
                      fontWeight: calendarDays[i].isToday ? "700" : "400",
                      textAlign: "center",
                      color: calendarDays[i].isToday
                        ? theme.onPrimaryContainer
                        : theme.textPrimary,
                    }}
                  >
                    {calendarDays[i].day}
                  </ThemedText>
                </View>
                {calendarDays[i].hasEvent && (
                  <View
                    style={[
                      styles.eventDot,
                      {
                        backgroundColor: calendarDays[i].isToday
                          ? theme.onPrimaryContainer
                          : theme.primaryContainer,
                      },
                    ]}
                  />
                )}
              </View>
            ))}
          </View>
        </GlassCard>

        <View style={styles.eventsSection}>
          <EventCard
            title="Deep Work: UI Architecture"
            time="9:00 - 11:30"
            aiSuggested
            aiNote="Focus session optimized for low cognitive interference."
          />
          <EventCard
            title="Lunch with Creative Team"
            time="12:00"
            location="THE GLASS HOUSE"
            attendees={4}
          />
          <EventCard
            title="Project Sync: Quantum V1"
            time="2:00 - 3:00"
            hasVideo
          />
          <Pressable
            style={[
              styles.addEventButton,
              { backgroundColor: theme.surfaceContainer, borderColor: theme.border },
            ]}
          >
            <MaterialIcons name="add-circle-outline" size={20} color={theme.textSecondary} />
            <ThemedText variant="body" style={{ color: theme.textSecondary, marginLeft: 8 }}>
              Add task or event
            </ThemedText>
          </Pressable>

          <View style={styles.reminderSection}>
            <View style={styles.reminderRow}>
              <MaterialIcons
                name="radio-button-unchecked"
                size={20}
                color={theme.textSecondary}
              />
              <View style={styles.reminderContent}>
                <ThemedText variant="body" style={{ fontWeight: "500" }}>
                  Review system logs
                </ThemedText>
                <ThemedText variant="caption" style={{ color: theme.error }}>
                  High priority task for architectural stability.
                </ThemedText>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 40,
    gap: 14,
  },
  calendarHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  calendarRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  calendarDayWrapper: {
    alignItems: "center",
    gap: 4,
  },
  calendarDay: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  eventDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
  },
  eventsSection: {
    gap: 10,
  },
  addEventButton: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 14,
    borderWidth: 1,
    padding: 14,
    borderStyle: "dashed",
  },
  reminderSection: {
    marginTop: 4,
  },
  reminderRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
  },
  reminderContent: {
    flex: 1,
    gap: 2,
  },
});
