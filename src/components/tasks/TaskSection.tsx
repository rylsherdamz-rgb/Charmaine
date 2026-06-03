import { View, Pressable, StyleSheet } from "react-native";
import { useTheme } from "@/hooks/useTheme";
import { ThemedText } from "@/components/common/ThemedText";
import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";

interface TaskSectionProps {
  title: string;
  count?: number;
  children: React.ReactNode;
  collapsible?: boolean;
  defaultCollapsed?: boolean;
}

export function TaskSection({
  title,
  count,
  children,
  collapsible = false,
  defaultCollapsed = false,
}: TaskSectionProps) {
  const theme = useTheme();
  const [collapsed, setCollapsed] = useState(defaultCollapsed);

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => collapsible && setCollapsed(!collapsed)}
        style={styles.header}
      >
        <View style={styles.titleRow}>
          <ThemedText variant="label" style={{ color: theme.textSecondary }}>
            {title}
          </ThemedText>
          {count !== undefined && (
            <View
              style={[
                styles.countBadge,
                { backgroundColor: theme.surfaceContainerHigh },
              ]}
            >
              <ThemedText
                variant="label"
                style={{ fontSize: 10, color: theme.textSecondary }}
              >
                {count}
              </ThemedText>
            </View>
          )}
        </View>
        {collapsible && (
          <MaterialIcons
            name={collapsed ? "expand-more" : "expand-less"}
            size={20}
            color={theme.textSecondary}
          />
        )}
      </Pressable>
      {!collapsed && <View style={styles.content}>{children}</View>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 4,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  countBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  content: {
    gap: 8,
  },
});
