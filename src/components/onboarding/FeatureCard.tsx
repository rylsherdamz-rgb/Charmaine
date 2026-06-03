import { View, StyleSheet } from "react-native";
import { useTheme } from "@/hooks/useTheme";
import { ThemedText } from "@/components/common/ThemedText";
import { MaterialIcons } from "@expo/vector-icons";

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
}

export function FeatureCard({ icon, title, description }: FeatureCardProps) {
  const theme = useTheme();

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
      <View style={[styles.iconContainer, { backgroundColor: theme.surfaceContainerHigh }]}>
        <MaterialIcons name={icon as any} size={24} color={theme.primaryContainer} />
      </View>
      <View style={styles.textContainer}>
        <ThemedText variant="body" style={{ fontWeight: "600" }}>
          {title}
        </ThemedText>
        <ThemedText variant="caption" style={{ marginTop: 2 }}>
          {description}
        </ThemedText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 14,
    borderWidth: 1,
    padding: 16,
    gap: 14,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    flex: 1,
  },
});
