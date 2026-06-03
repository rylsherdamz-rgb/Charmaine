import { View, ScrollView, Pressable, StyleSheet } from "react-native";
import { useTheme } from "@/hooks/useTheme";
import { ThemedText } from "@/components/common/ThemedText";
import { GlassCard } from "@/components/common/GlassCard";
import { TaskItem } from "@/components/tasks/TaskItem";
import { TaskSection } from "@/components/tasks/TaskSection";
import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";

interface Task {
  id: string;
  title: string;
  subtitle?: string;
  time?: string;
  tag?: string;
  tagColor?: string;
  completed: boolean;
  aiSuggestion?: string;
}

export default  function TasksScreen() {
  const theme = useTheme();
  const [todayTasks, setTodayTasks] = useState<Task[]>([
    {
      id: "1",
      title: "Finalize Quarterly AI Projections",
      subtitle: "Marketing Channel",
      time: "4:00 PM",
      tag: "AI ASSIST",
      tagColor: theme.primaryContainer,
      completed: false,
    },
    {
      id: "2",
      title: "Refine neural architecture diagrams",
      tag: "RESEARCH",
      tagColor: theme.tertiaryContainer,
      completed: false,
      aiSuggestion:
        "Break down into 'Encoder analysis' and 'Layer normalization' sub-tasks.",
    },
  ]);
  const [upcomingTasks] = useState<Task[]>([
    {
      id: "3",
      title: "Team sync: Design Sprint",
      time: "Tomorrow, 11:00 AM",
      completed: false,
    },
  ]);

  const toggleTask = (id: string) => {
    setTodayTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <MaterialIcons name="auto-awesome" size={22} color={theme.primaryContainer} />
          <ThemedText variant="headline" style={{ fontSize: 22 }}>
            Charmaine
          </ThemedText>
        </View>
        <Pressable
          style={[styles.addButton, { backgroundColor: theme.primaryContainer }]}
        >
          <MaterialIcons name="add" size={22} color={theme.onPrimaryContainer} />
        </Pressable>
      </View>

      <Pressable
        style={[
          styles.aiPrompt,
          { backgroundColor: theme.tertiaryContainer + "15", borderColor: theme.tertiaryContainer + "30" },
        ]}
      >
        <MaterialIcons name="auto-awesome" size={16} color={theme.tertiaryContainer} />
        <ThemedText
          variant="body"
          style={{ color: theme.tertiaryContainer, fontWeight: "600", marginLeft: 8 }}
        >
          "SCHEDULE A DEEP WORK SESSION FOR TOMORROW"
        </ThemedText>
      </Pressable>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <TaskSection title="TODAY" count={3}>
          {todayTasks.map((task) => (
            <TaskItem
              key={task.id}
              title={task.title}
              subtitle={task.subtitle}
              time={task.time}
              tag={task.tag}
              tagColor={task.tagColor}
              completed={task.completed}
              onToggle={() => toggleTask(task.id)}
              aiSuggestion={task.aiSuggestion}
            />
          ))}
        </TaskSection>

        <TaskSection title="UPCOMING">
          {upcomingTasks.map((task) => (
            <TaskItem
              key={task.id}
              title={task.title}
              time={task.time}
              completed={task.completed}
            />
          ))}
        </TaskSection>

        <TaskSection title="ARCHIVED" count={12} collapsible defaultCollapsed>
          <View />
        </TaskSection>
      </ScrollView>
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
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  addButton: {
    width: 38,
    height: 38,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  aiPrompt: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 16,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 40,
    gap: 18,
  },
});
