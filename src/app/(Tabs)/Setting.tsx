import { View, ScrollView, Pressable, StyleSheet } from "react-native";
import { useTheme } from "@/hooks/useTheme";
import { ThemedText } from "@/components/common/ThemedText";
import { GlassCard } from "@/components/common/GlassCard";
import { ModelSelector } from "@/components/settings/ModelSelector";
import { VoiceSettings } from "@/components/settings/VoiceSettings";
import { ToggleRow } from "@/components/settings/ToggleRow";
import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";

interface AIModel {
  id: string;
  name: string;
  subtitle: string;
  icon: string;
  active: boolean;
}

export  default function SettingScreen() {
  const theme = useTheme();
  const [models, setModels] = useState<AIModel[]>([
    { id: "gpt4o", name: "GPT-4o", subtitle: "Optimized for reasoning and logic.", icon: "psychology", active: true },
    { id: "claude", name: "Claude 3.5", subtitle: "Nuanced writing and safety.", icon: "auto-awesome", active: false },
    { id: "llama", name: "Local Llama", subtitle: "Private, edge-hosted compute.", icon: "database", active: false },
  ]);
  const [voiceProfile, setVoiceProfile] = useState("jarvis");
  const [eclipseMode, setEclipseMode] = useState(true);
  const [motionFidelity, setMotionFidelity] = useState(true);

  const handleModelSelect = (id: string) => {
    setModels((prev) =>
      prev.map((m) => ({ ...m, active: m.id === id }))
    );
  };

  const documents = [
    { name: "Annual_Strategy_2024.pdf", size: "3.2 MB", status: "Neural Map Complete" },
    { name: "Project_X_Schematics.png", size: "14.5 MB", status: "OCR Indexed" },
  ];

  return (
    <ScrollView
      style={[styles.scroll, { backgroundColor: theme.background }]}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerRow}>
            <MaterialIcons name="bubble-chart" size={24} color={theme.primaryContainer} />
            <ThemedText variant="headline" style={{ fontSize: 22 }}>
              Charmaine
            </ThemedText>
          </View>
          <ThemedText variant="label" style={{ color: theme.textSecondary }}>
            ADVANCED CONFIGURATION
          </ThemedText>
        </View>

        <GlassCard>
          <View style={styles.sectionHeader}>
            <MaterialIcons name="memory" size={20} color={theme.primaryContainer} />
            <ThemedText variant="title" style={{ fontSize: 18 }}>
              Neural Engine
            </ThemedText>
          </View>
          <ModelSelector models={models} onSelect={handleModelSelect} />
        </GlassCard>

        <GlassCard>
          <View style={styles.sectionHeader}>
            <MaterialIcons name="record-voice-over" size={20} color={theme.tertiaryContainer} />
            <ThemedText variant="title" style={{ fontSize: 18 }}>
              Vocal Synthesis
            </ThemedText>
          </View>
          <ThemedText variant="label" style={{ marginBottom: 10, color: theme.textSecondary }}>
            VOICE PROFILE
          </ThemedText>
          <VoiceSettings voiceProfile={voiceProfile} onVoiceChange={setVoiceProfile} />

          <View style={styles.sliderSection}>
            <ThemedText variant="label" style={{ marginBottom: 6, color: theme.textSecondary }}>
              VOCAL PITCH
            </ThemedText>
            <View style={[styles.sliderTrack, { backgroundColor: theme.surfaceContainerHigh }]}>
              <View style={[styles.sliderFill, { backgroundColor: theme.tertiaryContainer, width: "35%" }]} />
            </View>
            <ThemedText variant="caption" style={{ marginTop: 4 }}>-12Hz</ThemedText>
          </View>

          <View style={styles.sliderSection}>
            <ThemedText variant="label" style={{ marginBottom: 6, color: theme.textSecondary }}>
              SPEAKING RATE
            </ThemedText>
            <View style={[styles.sliderTrack, { backgroundColor: theme.surfaceContainerHigh }]}>
              <View style={[styles.sliderFill, { backgroundColor: theme.tertiaryContainer, width: "55%" }]} />
            </View>
            <ThemedText variant="caption" style={{ marginTop: 4 }}>1.1x</ThemedText>
          </View>
        </GlassCard>

        <GlassCard>
          <View style={styles.sectionHeader}>
            <MaterialIcons name="dark-mode" size={20} color={theme.secondaryContainer} />
            <ThemedText variant="title" style={{ fontSize: 18 }}>
              Display
            </ThemedText>
          </View>
          <View style={styles.toggles}>
            <ToggleRow
              icon="dark-mode"
              label="Eclipse Mode"
              subtitle="High-contrast dark UI"
              value={eclipseMode}
              onToggle={() => setEclipseMode(!eclipseMode)}
            />
            <ToggleRow
              icon="speed"
              label="Motion Fidelity"
              subtitle="Fluid screen transitions"
              value={motionFidelity}
              onToggle={() => setMotionFidelity(!motionFidelity)}
            />
          </View>
        </GlassCard>

        <GlassCard>
          <View style={styles.sectionHeader}>
            <MaterialIcons name="inventory-2" size={20} color={theme.secondaryContainer} />
            <ThemedText variant="title" style={{ fontSize: 18 }}>
              Knowledge Repository
            </ThemedText>
          </View>
          <View style={styles.docActions}>
            <Pressable
              style={[styles.docActionButton, { backgroundColor: theme.surfaceContainerHigh }]}
            >
              <MaterialIcons name="delete-outline" size={16} color={theme.textSecondary} />
              <ThemedText variant="label" style={{ marginLeft: 6, fontSize: 10 }}>
                Clear Cache
              </ThemedText>
            </Pressable>
            <Pressable
              style={[styles.docActionButton, { backgroundColor: theme.surfaceContainerHigh }]}
            >
              <MaterialIcons name="upload-file" size={16} color={theme.textSecondary} />
              <ThemedText variant="label" style={{ marginLeft: 6, fontSize: 10 }}>
                Load File
              </ThemedText>
            </Pressable>
          </View>
          <ThemedText variant="label" style={{ marginBottom: 8, marginTop: 12, color: theme.textSecondary }}>
            CONTEXT DOCUMENTS
          </ThemedText>
          {documents.map((doc, i) => (
            <View
              key={i}
              style={[
                styles.docItem,
                {
                  backgroundColor: theme.surfaceContainerHigh,
                  borderColor: theme.border,
                },
              ]}
            >
              <MaterialIcons name="description" size={20} color={theme.primaryContainer} />
              <View style={styles.docInfo}>
                <ThemedText variant="body" style={{ fontWeight: "500", fontSize: 13 }}>
                  {doc.name}
                </ThemedText>
                <ThemedText variant="caption">
                  {doc.size} • {doc.status}
                </ThemedText>
              </View>
              <Pressable>
                <MaterialIcons name="delete-outline" size={18} color={theme.error} />
              </Pressable>
            </View>
          ))}
        </GlassCard>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  container: {
    paddingHorizontal: 16,
    paddingTop: 16,
    gap: 14,
  },
  header: {
    gap: 4,
    marginBottom: 4,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 14,
  },
  toggles: {
    gap: 10,
  },
  sliderSection: {
    marginTop: 16,
  },
  sliderTrack: {
    height: 6,
    borderRadius: 3,
    overflow: "hidden",
  },
  sliderFill: {
    height: "100%",
    borderRadius: 3,
  },
  docActions: {
    flexDirection: "row",
    gap: 10,
  },
  docActionButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
  },
  docItem: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    borderWidth: 1,
    padding: 12,
    gap: 10,
    marginBottom: 8,
  },
  docInfo: {
    flex: 1,
  },
});
