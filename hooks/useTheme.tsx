import { useColorScheme } from "react-native";

import { useSyncExternalStore } from "react";

import { storage } from "@/libs/MMKVConfig";

export type ThemeMode = "light" | "dark" | "system";

const THEME_MODE_KEY = "theme_mode";


const basePalette = {
  accent: "#000000",
  accentMuted: "#F5F5F5",
  accentSoft: "rgba(0,0,0,0.06)",
  accentGlow: "rgba(0,0,0,0.10)",

  success: "#16A34A",
  successMuted: "#F0FDF4",

  danger: "#DC2626",
  dangerMuted: "#FEF2F2",
};

const lightPalette = {
  background: "#FAFAFA",
  surface: "#F5F5F5",
  surfaceStrong: "#E5E5E5",
  card: "#FFFFFF",

  textPrimary: "#171717",
  textSecondary: "#737373",

  buttonPrimary: "#171717",
  buttonPrimaryText: "#FFFFFF",

  border: "rgba(23,23,23,0.08)",
  ghostBorder: "rgba(23,23,23,0.14)",

  overlay: "rgba(0,0,0,0.15)",

  iconBg: "#F4F4F5",
  loaderTrack: "#E5E7EB",
};

const darkPalette = {
  background: "#09090B",
  surface: "#18181B",
  surfaceStrong: "#27272A",
  card: "#111113",

  textPrimary: "#FAFAFA",
  textSecondary: "#A1A1AA",

  buttonPrimary: "#FFFFFF",
  buttonPrimaryText: "#09090B",

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

