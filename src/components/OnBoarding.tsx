import { View, Pressable, StyleSheet, ScrollView } from "react-native";
import { useTheme } from "@/hooks/useTheme";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ThemedText } from "@/components/common/ThemedText";
import { GlassCard } from "@/components/common/GlassCard";
import { FeatureCard } from "@/components/onboarding/FeatureCard";
import { MaterialIcons } from "@expo/vector-icons";

interface OnboardingProps {
  onGetStarted: () => void;
  onSignIn: () => void;
}

export function Onboarding({ onGetStarted, onSignIn }: OnboardingProps) {
  const theme = useTheme();
  const insets = useSafeAreaInsets()

  return (
    <ScrollView
      style={[styles.scroll, { backgroundColor: theme.background, paddingBottom : insets.bottom, paddingTop : insets.top }]}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.container}>
        <View style={styles.hero}>
          <View style={styles.logoContainer}>
            <MaterialIcons name="auto-awesome" size={32} color={theme.primaryContainer} />
          </View>
          <ThemedText variant="display" style={styles.brandName}>
            Charmaine
          </ThemedText>
          <View style={styles.badgeRow}>
            <View style={[styles.versionBadge, { backgroundColor: theme.surfaceContainerHigh }]}>
              <ThemedText variant="label" style={{ color: theme.textSecondary, fontSize: 10 }}>
                V 4.0
              </ThemedText>
            </View>
            <View style={[styles.versionBadge, { backgroundColor: theme.surfaceContainerHigh }]}>
              <ThemedText variant="label" style={{ color: theme.textSecondary, fontSize: 10 }}>
                NEURAL CORE
              </ThemedText>
            </View>
            <View style={[styles.versionBadge, { backgroundColor: theme.surfaceContainerHigh }]}>
              <ThemedText variant="label" style={{ color: theme.success, fontSize: 10 }}>
                ENCRYPTED
              </ThemedText>
            </View>
          </View>
        </View>

        <View style={styles.heroText}>
          <ThemedText variant="headline" style={styles.heroTitle}>
            Meet Charmaine.
          </ThemedText>
          <ThemedText variant="headline" style={[styles.heroTitle, { fontWeight: "400" }]}>
            Your neural architect.
          </ThemedText>
          <ThemedText
            variant="bodyLarge"
            style={[styles.heroSubtitle, { color: theme.onSurfaceVariant }]}
          >
            A high-performance AI assistant designed for technical precision and fluid workflows.
          </ThemedText>
          <ThemedText
            variant="body"
            style={[styles.heroSubSubtitle, { color: theme.textSecondary }]}
          >
            Bridge the gap between ideation and execution.
          </ThemedText>
        </View>

        <View style={styles.features}>
          <FeatureCard
            icon="psychology"
            title="Neural Engine"
            description="Advanced logic processing for complex technical problem solving."
          />
          <FeatureCard
            icon="graphic-eq"
            title="Voice Synthesis"
            description="Ultra-low latency vocal feedback with Jarvis-grade resonance."
          />
          <FeatureCard
            icon="database"
            title="Knowledge Repository"
            description="Context-aware memory retrieval and structured data indexing."
          />
        </View>

        <View style={styles.actions}>
          <Pressable
            onPress={onGetStarted}
            style={[
              styles.getStartedButton,
              { backgroundColor: theme.primaryContainer },
            ]}
          >
            <ThemedText
              variant="bodyLarge"
              style={{ color: theme.onPrimaryContainer, fontWeight: "600", textAlign: "center" }}
            >
              Get Started
            </ThemedText>
          </Pressable>
          <Pressable onPress={onSignIn} style={styles.signInButton}>
            <ThemedText
              variant="body"
              style={{ color: theme.textSecondary, textAlign: "center" }}
            >
              Already a member?{" "}
              <ThemedText variant="body" style={{ color: theme.primaryContainer, fontWeight: "600" }}>
                Sign In
              </ThemedText>
            </ThemedText>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 80,
    paddingBottom: 40,
    gap: 32,
  },
  hero: {
    alignItems: "center",
    gap: 12,
  },
  logoContainer: {
    width: 64,
    height: 64,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  brandName: {
    fontSize: 28,
    fontWeight: "700",
    letterSpacing: -0.02,
  },
  badgeRow: {
    flexDirection: "row",
    gap: 8,
  },
  versionBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  heroText: {
    gap: 10,
  },
  heroTitle: {
    fontSize: 28,
  },
  heroSubtitle: {
    marginTop: 4,
  },
  heroSubSubtitle: {
    marginTop: 2,
  },
  features: {
    gap: 10,
  },
  actions: {
    gap: 12,
    marginTop: "auto",
  },
  getStartedButton: {
    borderRadius: 14,
    paddingVertical: 16,
    width: "100%",
  },
  signInButton: {
    paddingVertical: 8,
  },
});
