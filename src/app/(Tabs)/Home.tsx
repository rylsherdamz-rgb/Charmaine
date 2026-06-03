import { View, ScrollView, Pressable, StyleSheet } from "react-native";
import { useTheme } from "@/hooks/useTheme";
import { ThemedText } from "@/components/common/ThemedText";
import { GlassCard } from "@/components/common/GlassCard";
import { ChatBubble } from "@/components/chat/ChatBubble";
import { ChatInput } from "@/components/chat/ChatInput";
import { MaterialIcons, Feather } from "@expo/vector-icons";
import { useState, useCallback } from "react";
import { router } from "expo-router";

interface Message {
  id: string;
  role: "system" | "operator" | "ai";
  text: string;
  timestamp: string;
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: "1",
    role: "ai",
    text: "System online. Ready for tasking.\n\nI've detected 3 anomalies in the primary node cluster telemetry from the previous cycle.",
    timestamp: "09:41:02",
  },
  {
    id: "2",
    role: "operator",
    text: "Fetch full stack traces for the US-EAST-1A node from 02:00 UTC. Filter for timeout errors.",
    timestamp: "09:42:15",
  },
  {
    id: "3",
    role: "ai",
    text: "Accessing telemetry database. Constructing query for node_id:US-EAST-1A. Initializing data stream...",
    timestamp: "09:42:18",
  },
];

export function ChatScreen() {
  const theme = useTheme();
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [isStreaming, setIsStreaming] = useState(false);

  const handleSend = useCallback(
    (text: string) => {
      const operatorMsg: Message = {
        id: Date.now().toString(),
        role: "operator",
        text,
        timestamp: new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        }),
      };
      setMessages((prev) => [...prev, operatorMsg]);
      setIsStreaming(true);

      setTimeout(() => {
        const aiMsg: Message = {
          id: (Date.now() + 1).toString(),
          role: "ai",
          text: "Processing your request. Analyzing data streams...",
          timestamp: new Date().toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false,
          }),
        };
        setMessages((prev) => [...prev, aiMsg]);
        setIsStreaming(false);
      }, 1500);
    },
    []
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={[styles.header, { borderBottomColor: theme.border }]}>
        <View style={styles.headerLeft}>
          <MaterialIcons name="menu" size={22} color={theme.textPrimary} />
          <View style={styles.headerTitle}>
            <MaterialIcons name="auto-awesome" size={18} color={theme.primaryContainer} />
            <ThemedText variant="title" style={{ fontSize: 18 }}>
              Charmaine
            </ThemedText>
          </View>
        </View>
        <View style={styles.headerRight}>
          <View style={[styles.statusDot, { backgroundColor: theme.success }]} />
          <ThemedText variant="label" style={{ color: theme.success }}>
            ONLINE
          </ThemedText>
          <Pressable onPress={() => router.push("/notifications" as any)}>
            <MaterialIcons name="sensors" size={20} color={theme.textSecondary} />
          </Pressable>
          <MaterialIcons name="person-outline" size={20} color={theme.textSecondary} />
        </View>
      </View>

      <View style={[styles.systemBadge, { backgroundColor: theme.surfaceContainer }]}>
        <ThemedText variant="label" style={{ color: theme.textSecondary, fontSize: 10 }}>
          GPT-4o PRO
        </ThemedText>
      </View>

      <ScrollView
        style={styles.messagesContainer}
        contentContainerStyle={styles.messagesContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.operationalHistory}>
          <ThemedText variant="label" style={{ color: theme.textSecondary }}>
            OPERATIONAL HISTORY
          </ThemedText>
        </View>

        {messages.map((msg) => (
          <ChatBubble
            key={msg.id}
            role={msg.role}
            text={msg.text}
            timestamp={msg.timestamp}
            isStreaming={isStreaming && msg.id === messages[messages.length - 1]?.id && msg.role === "ai"}
          />
        ))}
        {isStreaming && (
          <ChatBubble
            role="system"
            text="PARSING TELEMETRY STREAM..."
            timestamp=""
            isStreaming
          />
        )}
      </ScrollView>

      <View style={[styles.inputContainer, { borderTopColor: theme.border }]}>
        <ChatInput
          onSend={handleSend}
          onAttach={() => {}}
          onVoice={() => {}}
        />
      </View>

      <View style={[styles.bottomBar, { borderTopColor: theme.border }]}>
        <Pressable style={styles.bottomItem}>
          <MaterialIcons name="terminal" size={20} color={theme.textSecondary} />
          <ThemedText variant="label" style={{ fontSize: 10 }}>Console</ThemedText>
        </Pressable>
        <Pressable style={styles.bottomItem}>
          <MaterialIcons name="analytics" size={20} color={theme.textSecondary} />
          <ThemedText variant="label" style={{ fontSize: 10 }}>Metrics</ThemedText>
        </Pressable>
        <Pressable style={styles.bottomItem}>
          <MaterialIcons name="layers" size={20} color={theme.textSecondary} />
          <ThemedText variant="label" style={{ fontSize: 10 }}>Layers</ThemedText>
        </Pressable>
        <Pressable style={styles.bottomItem}>
          <MaterialIcons name="hub" size={20} color={theme.textSecondary} />
          <ThemedText variant="label" style={{ fontSize: 10 }}>Nodes</ThemedText>
        </Pressable>
        <Pressable style={[styles.bottomItem, { borderLeftWidth: 1, borderLeftColor: theme.border, paddingLeft: 12 }]}>
          <MaterialIcons name="tune" size={20} color={theme.textSecondary} />
          <ThemedText variant="label" style={{ fontSize: 10 }}>Config</ThemedText>
        </Pressable>
      </View>
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
    borderBottomWidth: 1,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  headerTitle: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  systemBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: "flex-start",
    marginLeft: 16,
    marginTop: 8,
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 4,
  },
  operationalHistory: {
    marginBottom: 8,
  },
  inputContainer: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  bottomBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderTopWidth: 1,
  },
  bottomItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingRight: 12,
  },
});
