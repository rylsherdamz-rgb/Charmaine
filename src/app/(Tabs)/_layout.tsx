import { useTheme } from "@/hooks/useTheme";
import { Tabs } from "expo-router";
import {Feather} from "@expo/vector-icons"
import { StatusBar } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function HomeTabLayout() {
  const theme = useTheme();
  const insets = useSafeAreaInsets();



  return (
    <>
      <StatusBar
        barStyle={theme.isDark ? "light-content" : "dark-content"}
        backgroundColor={theme.background}
      />
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
          tabBarActiveTintColor: theme.accent,
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
              <Feather name="home" size={20} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="Setting"
          options={{
            title: "Setting",
            tabBarIcon: ({ color }) => (
              <Feather name="settings" size={20} color={color} />
            ),
          }}
        />

        </Tabs>
    </>
  );
}
