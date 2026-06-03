import { View, TextInput, Pressable, StyleSheet } from "react-native";
import { useTheme } from "@/hooks/useTheme";
import { MaterialIcons, Feather } from "@expo/vector-icons";
import { useState } from "react";

interface ChatInputProps {
  onSend: (message: string) => void;
  onAttach?: () => void;
  onVoice?: () => void;
}

export function ChatInput({ onSend, onAttach, onVoice }: ChatInputProps) {
  const theme = useTheme();
  const [text, setText] = useState("");

  const handleSend = () => {
    if (text.trim()) {
      onSend(text.trim());
      setText("");
    }
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.surfaceContainer,
          borderColor: theme.ghostBorder,
        },
      ]}
    >
      {onAttach && (
        <Pressable onPress={onAttach} style={styles.iconButton}>
          <Feather name="paperclip" size={20} color={theme.textSecondary} />
        </Pressable>
      )}
      <TextInput
        value={text}
        onChangeText={setText}
        placeholder="Message Charmaine..."
        placeholderTextColor={theme.textSecondary}
        style={[
          styles.input,
          {
            color: theme.textPrimary,
            fontFamily: "Inter",
          },
        ]}
        multiline
        returnKeyType="default"
      />
      {onVoice && (
        <Pressable onPress={onVoice} style={styles.iconButton}>
          <MaterialIcons name="settings-voice" size={20} color={theme.textSecondary} />
        </Pressable>
      )}
      <Pressable
        onPress={handleSend}
        style={[
          styles.sendButton,
          {
            backgroundColor: text.trim()
              ? theme.primaryContainer
              : theme.surfaceContainerHigh,
          },
        ]}
      >
        <Feather
          name="arrow-up"
          size={18}
          color={text.trim() ? theme.onPrimaryContainer : theme.textSecondary}
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "flex-end",
    borderRadius: 24,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 4,
  },
  iconButton: {
    padding: 8,
  },
  input: {
    flex: 1,
    fontSize: 15,
    lineHeight: 22,
    maxHeight: 100,
    paddingVertical: 6,
  },
  sendButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    justifyContent: "center",
    alignItems: "center",
  },
});
