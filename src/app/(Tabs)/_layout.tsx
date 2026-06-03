import { useTheme } from "@/hooks/useTheme";
import { Tabs } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function HomeTabLayout() {
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  return (
          <Tabs screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: theme.card,
            borderTopWidth: 1,
            borderTopColor: theme.border,
            height: 60 + insets.bottom,
            paddingTop: 6,
            paddingBottom: Math.max(insets.bottom, 8),
            paddingHorizontal: 10,
          },
          tabBarActiveTintColor: theme.primaryContainer,
          tabBarInactiveTintColor: theme.textSecondary,
          tabBarLabelStyle: {
            fontFamily: "Inter",
            fontSize: 10,
            fontWeight: "600",
            marginTop: 1,
          },
          tabBarItemStyle: {
            paddingVertical: 2,
          },
          sceneStyle: {
            backgroundColor: theme.background,
          },
        }}
      >
        <Tabs.Screen
          name="Home"
          options={{
            title: "Home",
            tabBarIcon: ({ color }) => (
              <MaterialIcons name="home" size={22} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="Schedule"
          options={{
            title: "Schedule",
            tabBarIcon: ({ color }) => (
              <MaterialIcons name="calendar-today" size={22} color={color} />
            ),
          }}
        />


        <Tabs.Screen
          name="Chat"
          options={{
            title: "Chat",
            tabBarIcon: ({ color }) => (
              <MaterialIcons name="chat-bubble" size={22} color={color} />
            ),
          }}
        />
            <Tabs.Screen
          name="Tasks"
          options={{
            title: "Tasks",
            tabBarIcon: ({ color }) => (
              <MaterialIcons name="check-circle" size={22} color={color} />
            ),
          }}
        />
<Tabs.Screen
          name="Setting"
          options={{
            title: "Settings",
            tabBarIcon: ({ color }) => (
              <MaterialIcons name="settings" size={22} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="Notifications"
          options={{
            title: "Activity",
            tabBarIcon: ({ color }) => (
              <MaterialIcons name="auto-awesome" size={22} color={color} />
            ),
            href: null,
          }}
        />

      </Tabs>
  );
}
