import { View, Pressable, StyleSheet } from "react-native";
import { useTheme } from "@/hooks/useTheme";
import { ThemedText } from "@/components/common/ThemedText";
import { MaterialIcons } from "@expo/vector-icons";

export type TaskPriority = "high" | "medium" | "low";

interface TaskItemProps {
  title: string;
  subtitle?: string;
  time?: string;
  tag?: string;
  tagColor?: string;
  completed?: boolean;
  onToggle?: () => void;
  aiSuggestion?: string;
}

export function TaskItem({
  title,
  subtitle,
  time,
  tag,
  tagColor,
  completed = false,
  onToggle,
  aiSuggestion,
}: TaskItemProps) {
  const theme = useTheme();

  return (
    <View style={styles.wrapper}>
      <Pressable
        onPress={onToggle}
        style={[
          styles.container,
          {
            backgroundColor: theme.surfaceContainer,
            borderColor: theme.border,
          },
        ]}
      >
        <View
          style={[
            styles.checkbox,
            {
              borderColor: completed ? theme.primaryContainer : theme.ghostBorder,
              backgroundColor: completed ? theme.primaryContainer : "transparent",
            },
          ]}
        >
          {completed && (
            <MaterialIcons name="check" size={14} color={theme.onPrimaryContainer} />
          )}
        </View>
        <View style={styles.content}>
          <View style={styles.titleRow}>
            <ThemedText
              variant="body"
              style={{
                fontWeight: "500",
                textDecorationLine: completed ? "line-through" : "none",
                color: completed ? theme.textSecondary : theme.textPrimary,
              }}
            >
              {title}
            </ThemedText>
          </View>
          {subtitle && (
            <ThemedText variant="caption" style={{ marginTop: 2 }}>
              {subtitle}
            </ThemedText>
          )}
          {(time || tag) && (
            <View style={styles.metaRow}>
              {time && (
                <View style={styles.metaItem}>
                  <MaterialIcons name="schedule" size={12} color={theme.textSecondary} />
                  <ThemedText variant="caption" style={{ marginLeft: 4 }}>
                    {time}
                  </ThemedText>
                </View>
              )}
              {tag && (
                <View
                  style={[
                    styles.tag,
                    { backgroundColor: (tagColor || theme.tertiaryContainer) + "20" },
                  ]}
                >
                  <ThemedText
                    variant="label"
                    style={{
                      color: tagColor || theme.tertiaryContainer,
                      fontSize: 10,
                    }}
                  >
                    {tag}
                  </ThemedText>
                </View>
              )}
            </View>
          )}
        </View>
      </Pressable>
      {aiSuggestion && !completed && (
        <View
          style={[
            styles.aiSuggestion,
            {
              backgroundColor: theme.tertiaryContainer + "10",
              borderColor: theme.tertiaryContainer + "30",
            },
          ]}
        >
          <MaterialIcons name="auto-awesome" size={14} color={theme.tertiaryContainer} />
          <ThemedText
            variant="caption"
            style={{ color: theme.tertiaryContainer, flex: 1, marginLeft: 8 }}
          >
            {aiSuggestion}
          </ThemedText>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    gap: 4,
  },
  container: {
    flexDirection: "row",
    alignItems: "flex-start",
    borderRadius: 14,
    borderWidth: 1,
    padding: 14,
    gap: 12,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 7,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 1,
  },
  content: {
    flex: 1,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 6,
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  tag: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  aiSuggestion: {
    flexDirection: "row",
    alignItems: "flex-start",
    borderRadius: 10,
    borderWidth: 1,
    padding: 10,
    marginLeft: 34,
  },
});
