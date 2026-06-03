import { View, ScrollView, Pressable, StyleSheet } from "react-native";
import { useTheme } from "@/hooks/useTheme";
import { ThemedText } from "@/components/common/ThemedText";
import { NotificationItem } from "@/components/notifications/NotificationItem";
import { MaterialIcons } from "@expo/vector-icons";

export function NotificationsScreen() {
  const theme = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <MaterialIcons name="auto-awesome" size={22} color={theme.primaryContainer} />
          <ThemedText variant="headline" style={{ fontSize: 22 }}>
            Charmaine
          </ThemedText>
        </View>
        <Pressable style={styles.markAllButton}>
          <MaterialIcons name="done-all" size={18} color={theme.textSecondary} />
          <ThemedText variant="label" style={{ marginLeft: 6, color: theme.textSecondary, fontSize: 10 }}>
            Mark all
          </ThemedText>
        </Pressable>
      </View>

      <View style={styles.subheader}>
        <ThemedText variant="title" style={{ fontSize: 18 }}>
          Activity Feed
        </ThemedText>
        <ThemedText variant="label" style={{ color: theme.textSecondary }}>
          Notifications
        </ThemedText>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <NotificationItem
          type="security"
          title="Security Alert"
          message="A new login attempt was detected from a recognized device in San Francisco. Please verify this activity immediately to secure your workspace."
          time="2m ago"
          onAction={() => {}}
          onDismiss={() => {}}
          actionLabel="Review Access"
        />
        <NotificationItem
          type="success"
          title="Task Accomplished"
          message="Charmaine has successfully generated the Q4 Financial Synthesis. The report is ready for review in your primary workspace."
          time="15m ago"
        />
        <NotificationItem
          type="info"
          title="System Calibration"
          message="Charmaine's neural processing core has been updated to v4.2.1. Expect 15% faster response times on complex analytical tasks."
          time="1h ago"
        />
        <NotificationItem
          type="suggestion"
          title="Smart Suggestion"
          message="I've noticed a scheduling conflict on Thursday. Would you like me to reschedule your sync with the Design Team to 2:00 PM?"
          time="3h ago"
          onAction={() => {}}
          actionLabel="Reschedule"
        />
        <NotificationItem
          type="backup"
          title="Backup Completed"
          message="All local data synchronized to encrypted vault."
          time="Aug 22"
        />
        <NotificationItem
          type="invite"
          title="Team Invitation"
          message="Sarah Miller invited you to 'Project Aether'."
          time="Aug 21"
          onAction={() => {}}
          actionLabel="Accept"
        />
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
  markAllButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
  },
  subheader: {
    paddingHorizontal: 16,
    paddingBottom: 12,
    gap: 2,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 40,
    gap: 10,
  },
});
