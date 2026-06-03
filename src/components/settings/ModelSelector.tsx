import { View, Pressable, StyleSheet } from "react-native";
import { useTheme } from "@/hooks/useTheme";
import { ThemedText } from "@/components/common/ThemedText";
import { MaterialIcons } from "@expo/vector-icons";

interface ModelSelectorProps {
  models: { id: string; name: string; subtitle: string; icon: string; active: boolean }[];
  onSelect: (id: string) => void;
}

export function ModelSelector({ models, onSelect }: ModelSelectorProps) {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      {models.map((model) => (
        <Pressable
          key={model.id}
          onPress={() => onSelect(model.id)}
          style={[
            styles.modelItem,
            {
              backgroundColor: model.active
                ? theme.primaryContainer + "20"
                : theme.surfaceContainer,
              borderColor: model.active
                ? theme.primaryContainer + "60"
                : theme.border,
            },
          ]}
        >
          <View style={[styles.modelIcon, { backgroundColor: theme.surfaceContainerHigh }]}>
            <MaterialIcons
              name={model.icon as any}
              size={20}
              color={model.active ? theme.primaryContainer : theme.textSecondary}
            />
          </View>
          <View style={styles.modelText}>
            <ThemedText variant="body" style={{ fontWeight: "600" }}>
              {model.name}
            </ThemedText>
            <ThemedText variant="caption">{model.subtitle}</ThemedText>
          </View>
          {model.active && (
            <View
              style={[
                styles.activeDot,
                { backgroundColor: theme.primaryContainer },
              ]}
            />
          )}
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
  modelItem: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 14,
    borderWidth: 1,
    padding: 14,
    gap: 12,
  },
  modelIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  modelText: {
    flex: 1,
  },
  activeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
});
