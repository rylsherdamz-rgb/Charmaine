import { View, Pressable, StyleSheet } from "react-native";
import { useTheme } from "@/hooks/useTheme";
import { ThemedText } from "@/components/common/ThemedText";
import { MaterialIcons } from "@expo/vector-icons";

interface AppHeaderProps {
  title?: string;
  onMenuPress?: () => void;
  rightIcon?: string;
  onRightPress?: () => void;
}

export default function AppHeader({
  title = "Charmaine",
  onMenuPress,
  rightIcon,
  onRightPress,
}: AppHeaderProps) {
  const theme = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.background,
          borderBottomColor: theme.border,
        },
      ]}
        className="py-5"
    >
      <View style={styles.left}>
        {onMenuPress && (
          <Pressable onPress={onMenuPress} style={styles.iconButton}>
            <MaterialIcons name="menu" size={22} color={theme.textPrimary} />
          </Pressable>
        )}
        <MaterialIcons name="auto-awesome" size={20} color={theme.primaryContainer} />
        <ThemedText variant="title" style={{ fontSize: 18 }}>
          {title}
        </ThemedText>
      </View>
      {rightIcon && onRightPress && (
        <Pressable onPress={onRightPress} style={styles.iconButton}>
          <MaterialIcons name={rightIcon as any} size={22} color={theme.textSecondary} />
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  iconButton: {
    padding: 4,
  },
});
