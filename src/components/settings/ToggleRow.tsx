import { View, Pressable, StyleSheet } from "react-native";
import { useTheme } from "@/hooks/useTheme";
import { ThemedText } from "@/components/common/ThemedText";
import { MaterialIcons } from "@expo/vector-icons";

interface ToggleRowProps {
  icon: string;
  label: string;
  subtitle?: string;
  value: boolean;
  onToggle: () => void;
}

export function ToggleRow({ icon, label, subtitle, value, onToggle }: ToggleRowProps) {
  const theme = useTheme();

  return (
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
      <View style={[styles.iconContainer, { backgroundColor: theme.surfaceContainerHigh }]}>
        <MaterialIcons name={icon as any} size={20} color={theme.primaryContainer} />
      </View>
      <View style={styles.textContainer}>
        <ThemedText variant="body" style={{ fontWeight: "500" }}>
          {label}
        </ThemedText>
        {subtitle && (
          <ThemedText variant="caption" style={{ marginTop: 2 }}>
            {subtitle}
          </ThemedText>
        )}
      </View>
      <View
        style={[
          styles.toggleTrack,
          {
            backgroundColor: value ? theme.primaryContainer : theme.surfaceContainerHigh,
          },
        ]}
      >
        <View
          style={[
            styles.toggleThumb,
            {
              backgroundColor: value ? theme.onPrimaryContainer : theme.textSecondary,
              transform: [{ translateX: value ? 20 : 2 }],
            },
          ]}
        />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 14,
    borderWidth: 1,
    padding: 14,
    gap: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    flex: 1,
  },
  toggleTrack: {
    width: 44,
    height: 24,
    borderRadius: 12,
    justifyContent: "center",
  },
  toggleThumb: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
});
