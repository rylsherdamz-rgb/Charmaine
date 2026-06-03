import { useColorScheme } from "react-native";
import { useSyncExternalStore } from "react";
import { storage } from "@/libs/MMKVConfig";

export type ThemeMode = "light" | "dark" | "system";

const THEME_MODE_KEY = "theme_mode";

const basePalette = {
  primary: "#adc6ff",
  primaryContainer: "#4b8eff",
  onPrimary: "#002e69",
  onPrimaryContainer: "#00285c",
  primaryFixed: "#d8e2ff",

  secondary: "#d3fbff",
  secondaryContainer: "#00eefc",
  onSecondary: "#00363a",
  onSecondaryContainer: "#00686f",
  secondaryFixed: "#7df4ff",

  tertiary: "#d0bcff",
  tertiaryContainer: "#a078ff",
  onTertiary: "#3c0091",
  onTertiaryContainer: "#340080",
  tertiaryFixed: "#e9ddff",

  error: "#ffb4ab",
  errorContainer: "#93000a",
  onError: "#690005",
  onErrorContainer: "#ffdad6",

  success: "#16A34A",
  danger: "#DC2626",

  outline: "#8b90a0",
  outlineVariant: "#414755",
};

const lightPalette = {
  background: "#FAFAFA",
  surface: "#F5F5F5",
  surfaceDim: "#CAC8C7",
  surfaceBright: "#FAFAFA",
  surfaceContainerLowest: "#FFFFFF",
  surfaceContainerLow: "#F4F3F2",
  surfaceContainer: "#EEEDEE",
  surfaceContainerHigh: "#E8E7E7",
  surfaceContainerHighest: "#E2E1E1",
  surfaceVariant: "#E1E2EC",
  card: "#FFFFFF",

  onBackground: "#1B1B1F",
  onSurface: "#1B1B1F",
  onSurfaceVariant: "#44474F",

  textPrimary: "#1B1B1F",
  textSecondary: "#44474F",

  inverseSurface: "#303034",
  inverseOnSurface: "#F2F0F1",
  inversePrimary: "#005bc1",

  buttonPrimary: "#005bc1",
  buttonPrimaryText: "#FFFFFF",

  border: "rgba(23,23,23,0.08)",
  ghostBorder: "rgba(23,23,23,0.14)",
  overlay: "rgba(0,0,0,0.15)",

  iconBg: "#F4F4F5",
  loaderTrack: "#E5E7EB",
};

const darkPalette = {
  background: "#131313",
  surface: "#201f1f",
  surfaceDim: "#131313",
  surfaceBright: "#393939",
  surfaceContainerLowest: "#0e0e0e",
  surfaceContainerLow: "#1c1b1b",
  surfaceContainer: "#201f1f",
  surfaceContainerHigh: "#2a2a2a",
  surfaceContainerHighest: "#353534",
  surfaceVariant: "#353534",
  card: "#1c1b1b",

  onBackground: "#e5e2e1",
  onSurface: "#e5e2e1",
  onSurfaceVariant: "#c1c6d7",

  textPrimary: "#e5e2e1",
  textSecondary: "#c1c6d7",

  inverseSurface: "#e5e2e1",
  inverseOnSurface: "#313030",
  inversePrimary: "#adc6ff",

  buttonPrimary: "#adc6ff",
  buttonPrimaryText: "#002e69",

  border: "rgba(255,255,255,0.08)",
  ghostBorder: "rgba(255,255,255,0.12)",
  overlay: "rgba(0,0,0,0.50)",

  iconBg: "#27272A",
  loaderTrack: "#3F3F46",
};

const subscribe = (callback: () => void) => {
  const listener = storage.addOnValueChangedListener((key) => {
    if (key === THEME_MODE_KEY) {
      callback();
    }
  });
  return () => listener.remove();
};

const getThemeModeSnapshot = (): ThemeMode => {
  const storedMode = storage.getString(THEME_MODE_KEY);
  if (storedMode === "light" || storedMode === "dark" || storedMode === "system") {
    return storedMode;
  }
  return "system";
};

export const useTheme = () => {
  const systemScheme = useColorScheme();
  const mode = useSyncExternalStore(subscribe, getThemeModeSnapshot, getThemeModeSnapshot);
  const resolvedMode = mode === "system" ? (systemScheme === "dark" ? "dark" : "light") : mode;
  const isDark = resolvedMode === "dark";
  const palette = isDark ? darkPalette : lightPalette;

  const setThemeMode = (nextMode: ThemeMode) => {
    storage.set(THEME_MODE_KEY, nextMode);
  };

  return {
    mode,
    resolvedMode,
    isDark,
    setThemeMode,
    ...basePalette,
    ...palette,
  };
};

export type Theme = ReturnType<typeof useTheme>;
