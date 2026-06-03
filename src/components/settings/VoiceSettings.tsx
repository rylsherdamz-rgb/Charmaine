import { View, Text, Pressable, StyleSheet } from "react-native";
import { useTheme } from "@/hooks/useTheme";
import { ThemedText } from "@/components/common/ThemedText";
import { MaterialIcons } from "@expo/vector-icons";

interface VoiceSettingsProps {
  voiceProfile: string;
  onVoiceChange: (voice: string) => void;
}

const VOICE_PROFILES = [
  { id: "jarvis", label: "Jarvis", desc: "British, Sophisticated" },
  { id: "friday", label: "Friday", desc: "Analytical, Swift" },
  { id: "9000", label: "9000", desc: "Monotone, Calm" },
];

export function VoiceSettings({ voiceProfile, onVoiceChange }: VoiceSettingsProps) {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      {VOICE_PROFILES.map((voice) => {
        const isActive = voiceProfile === voice.id;
        return (
          <Pressable
            key={voice.id}
            onPress={() => onVoiceChange(voice.id)}
            style={[
              styles.voiceItem,
              {
                backgroundColor: isActive
                  ? theme.tertiaryContainer + "20"
                  : theme.surfaceContainer,
                borderColor: isActive
                  ? theme.tertiaryContainer + "60"
                  : theme.border,
              },
            ]}
          >
            <View style={styles.voiceInfo}>
              <ThemedText variant="body" style={{ fontWeight: "600" }}>
                {voice.label}
              </ThemedText>
              <ThemedText variant="caption">{voice.desc}</ThemedText>
            </View>
            {isActive && (
              <MaterialIcons name="check-circle" size={20} color={theme.tertiaryContainer} />
            )}
          </Pressable>
        );
      })}
      <Pressable
        style={[
          styles.uploadButton,
          {
            backgroundColor: theme.surfaceContainer,
            borderColor: theme.border,
          },
        ]}
      >
        <MaterialIcons name="upload-file" size={18} color={theme.textSecondary} />
        <ThemedText variant="body" style={{ marginLeft: 8, color: theme.textSecondary }}>
          Upload Custom Voice clone...
        </ThemedText>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
  voiceItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 14,
    borderWidth: 1,
    padding: 14,
  },
  voiceInfo: {
    flex: 1,
  },
  uploadButton: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 14,
    borderWidth: 1,
    padding: 14,
    borderStyle: "dashed",
  },
});
