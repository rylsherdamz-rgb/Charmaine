import { View, Pressable, StyleSheet } from "react-native";
import { useTheme } from "@/hooks/useTheme";
import { ThemedText } from "@/components/common/ThemedText";
import { MaterialIcons, Feather } from "@expo/vector-icons";

type NotificationType = "security" | "success" | "info" | "suggestion" | "backup" | "invite";

interface NotificationItemProps {
  type: NotificationType;
  title: string;
  message: string;
  time: string;
  onAction?: () => void;
  onDismiss?: () => void;
  actionLabel?: string;
}

const TYPE_CONFIG: Record<NotificationType, { icon: string; colorKey: string }> = {
  security: { icon: "warning", colorKey: "error" },
  success: { icon: "check-circle", colorKey: "success" },
  info: { icon: "info", colorKey: "primaryContainer" },
  suggestion: { icon: "lightbulb", colorKey: "tertiaryContainer" },
  backup: { icon: "cloud-done", colorKey: "secondaryContainer" },
  invite: { icon: "person-add", colorKey: "primaryContainer" },
};

export function NotificationItem({
  type,
  title,
  message,
  time,
  onAction,
  onDismiss,
  actionLabel = "Review",
}: NotificationItemProps) {
  const theme = useTheme();
  const config = TYPE_CONFIG[type];
  const iconColor = (theme as any)[config.colorKey] || theme.primaryContainer;

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.surfaceContainer,
          borderColor: theme.border,
        },
      ]}
    >
      <View style={styles.header}>
        <View style={styles.iconRow}>
          <MaterialIcons name={config.icon as any} size={18} color={iconColor} />
          <ThemedText variant="body" style={{ fontWeight: "600", flex: 1 }}>
            {title}
          </ThemedText>
        </View>
        <ThemedText variant="caption">{time}</ThemedText>
      </View>
      <ThemedText variant="body" style={{ color: theme.onSurfaceVariant, lineHeight: 20 }}>
        {message}
      </ThemedText>
      {(onAction || onDismiss) && (
        <View style={styles.actions}>
          {onAction && (
            <Pressable
              onPress={onAction}
              style={[
                styles.actionButton,
                { backgroundColor: theme.primaryContainer + "20" },
              ]}
            >
              <ThemedText
                variant="label"
                style={{ color: theme.primaryContainer, fontSize: 11 }}
              >
                {actionLabel}
              </ThemedText>
            </Pressable>
          )}
          {onDismiss && (
            <Pressable onPress={onDismiss} style={styles.dismissButton}>
              <ThemedText
                variant="label"
                style={{ color: theme.textSecondary, fontSize: 11 }}
              >
                Dismiss
              </ThemedText>
            </Pressable>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 14,
    borderWidth: 1,
    padding: 14,
    gap: 8,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  iconRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    flex: 1,
  },
  actions: {
    flexDirection: "row",
    gap: 8,
    marginTop: 4,
  },
  actionButton: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 8,
  },
  dismissButton: {
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
});
