import { useTheme } from "@/hooks/useTheme";
import { storage } from "@/libs/MMKVConfig";
import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { StatusBar, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Onboarding } from "@/components/OnBoarding";
import "../../global.css";

export default function RootLayout() {
  const theme = useTheme();
  const [isFirstTime, setIsFirstTime] = useState<boolean | null>(null);

  useEffect(() => {
    const hasOpened = storage.getBoolean("hasOpened");
    const firstOpenValue = hasOpened === undefined ? true : !hasOpened;
    setIsFirstTime(firstOpenValue);
  }, []);

  const handleFinishOnboarding = () => {
    storage.set("hasOpened", true);
    setIsFirstTime(false);
  };

  if (isFirstTime === null) {
    return (
      <View
        style={{ backgroundColor: theme.background }}
        className="flex-1 items-center justify-center"
      >
        <StatusBar
          barStyle={theme.isDark ? "light-content" : "dark-content"}
          backgroundColor={theme.background}
        />
      </View>
    );
  }

  if (isFirstTime) {
    return (
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaProvider>
          <StatusBar
            barStyle="light-content"
            backgroundColor={theme.background}
            translucent
          />
          <Onboarding
            onGetStarted={handleFinishOnboarding}
            onSignIn={handleFinishOnboarding}
          />
        </SafeAreaProvider>
      </GestureHandlerRootView>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <StatusBar
          key="app-status"
          barStyle={theme.isDark ? "light-content" : "dark-content"}
          backgroundColor={theme.background}
          translucent
        />
        <Stack screenOptions={{ headerShown: false }} />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
