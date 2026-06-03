import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "@/hooks/useTheme";
import { ThemedText } from "@/components/common/ThemedText";
import { MaterialIcons } from "@expo/vector-icons";

export type MessageRole = "system" | "operator" | "ai";

interface ChatBubbleProps {
  role: MessageRole;
  text: string;
  timestamp?: string;
  isStreaming?: boolean;
}

export function ChatBubble({ role, text, timestamp, isStreaming }: ChatBubbleProps) {
  const theme = useTheme();

  const isSystem = role === "system";
  const isOperator = role === "operator";
  const isAI = role === "ai";

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: isOperator
            ? theme.primaryContainer + "20"
            : theme.surfaceContainer,
          borderColor: isOperator
            ? theme.primaryContainer + "40"
            : theme.border,
          alignSelf: isOperator ? "flex-end" : "flex-start",
        },
      ]}
    >
      <View style={styles.header}>
        <View style={styles.roleRow}>
          {isSystem && (
            <MaterialIcons name="terminal" size={14} color={theme.secondaryContainer} />
          )}
          {isAI && (
            <MaterialIcons name="auto-awesome" size={14} color={theme.tertiaryContainer} />
          )}
          {isOperator && (
            <MaterialIcons name="person" size={14} color={theme.primaryContainer} />
          )}
          <ThemedText
            variant="label"
            style={{
              color: isSystem
                ? theme.secondaryContainer
                : isAI
                ? theme.tertiaryContainer
                : theme.primaryContainer,
              marginLeft: 6,
            }}
          >
            {isSystem ? "SYSTEM" : isOperator ? "OPERATOR" : "CHARMAINE"}
          </ThemedText>
        </View>
        {timestamp && (
          <ThemedText variant="caption" style={{ color: theme.textSecondary }}>
            {timestamp}
          </ThemedText>
        )}
      </View>
      <ThemedText
        variant="body"
        style={[
          styles.messageText,
          {
            color: isOperator ? theme.textPrimary : theme.onSurfaceVariant,
          },
        ]}
      >
        {text}
        {isStreaming && (
          <Text style={{ color: theme.secondaryContainer }}>▌</Text>
        )}
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    maxWidth: "85%",
    borderRadius: 16,
    borderWidth: 1,
    padding: 14,
    marginBottom: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  roleRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  messageText: {
    lineHeight: 20,
  },
});
