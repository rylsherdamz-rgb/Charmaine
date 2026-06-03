import { View, Pressable, StyleSheet } from "react-native";
import { useTheme } from "@/hooks/useTheme";
import { ThemedText } from "@/components/common/ThemedText";
import { MaterialIcons } from "@expo/vector-icons";

interface EventCardProps {
  title: string;
  time: string;
  location?: string;
  attendees?: number;
  hasVideo?: boolean;
  aiSuggested?: boolean;
  aiNote?: string;
}

export function EventCard({
  title,
  time,
  location,
  attendees,
  hasVideo,
  aiSuggested,
  aiNote,
}: EventCardProps) {
  const theme = useTheme();

  return (
    <View style={styles.wrapper}>
      <Pressable
        style={[
          styles.container,
          {
            backgroundColor: aiSuggested
              ? theme.secondaryContainer + "10"
              : theme.surfaceContainer,
            borderColor: aiSuggested
              ? theme.secondaryContainer + "30"
              : theme.border,
          },
        ]}
      >
        {aiSuggested && (
          <View style={[styles.aiBadge, { backgroundColor: theme.secondaryContainer + "20" }]}>
            <MaterialIcons name="auto-awesome" size={12} color={theme.secondaryContainer} />
            <ThemedText
              variant="label"
              style={{ color: theme.secondaryContainer, fontSize: 10, marginLeft: 4 }}
            >
              AI SUGGESTED
            </ThemedText>
          </View>
        )}
        <ThemedText variant="body" style={{ fontWeight: "600" }}>
          {title}
        </ThemedText>
        {aiNote && !aiSuggested && (
          <ThemedText variant="caption" style={{ marginTop: 2, color: theme.secondaryContainer }}>
            {aiNote}
          </ThemedText>
        )}
        <View style={styles.metaRow}>
          <View style={styles.metaItem}>
            <MaterialIcons name="schedule" size={14} color={theme.textSecondary} />
            <ThemedText variant="caption" style={{ marginLeft: 4 }}>
              {time}
            </ThemedText>
          </View>
          {location && (
            <View style={styles.metaItem}>
              <MaterialIcons name="location-on" size={14} color={theme.textSecondary} />
              <ThemedText
                variant="caption"
                style={{ marginLeft: 4 }}
                numberOfLines={1}
              >
                {location}
              </ThemedText>
            </View>
          )}
        </View>
        {(attendees || hasVideo) && (
          <View style={styles.footerRow}>
            {attendees && (
              <View style={styles.metaItem}>
                <MaterialIcons name="group" size={14} color={theme.textSecondary} />
                <ThemedText variant="caption" style={{ marginLeft: 4 }}>
                  {attendees} ATTENDEES
                </ThemedText>
              </View>
            )}
            {hasVideo && (
              <MaterialIcons name="videocam" size={16} color={theme.secondaryContainer} />
            )}
          </View>
        )}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    gap: 2,
  },
  container: {
    borderRadius: 14,
    borderWidth: 1,
    padding: 14,
    gap: 6,
  },
  aiBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    alignSelf: "flex-start",
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    marginTop: 4,
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  footerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 4,
  },
});
