import { Text, type TextProps } from "react-native";
import { useTheme } from "@/hooks/useTheme";

interface ThemedTextProps extends TextProps {
  variant?: "display" | "headline" | "title" | "body" | "bodyLarge" | "label" | "caption";
}

export function ThemedText({
  variant = "body",
  style,
  ...props
}: ThemedTextProps) {
  const theme = useTheme();

  const variantStyles: Record<string, any> = {
    display: {
      fontSize: 48,
      fontWeight: "700",
      lineHeight: 56,
      letterSpacing: -0.02,
      fontFamily: "Inter",
      color: theme.textPrimary,
    },
    headline: {
      fontSize: 24,
      fontWeight: "600",
      lineHeight: 32,
      letterSpacing: -0.01,
      fontFamily: "Inter",
      color: theme.textPrimary,
    },
    title: {
      fontSize: 20,
      fontWeight: "500",
      lineHeight: 28,
      letterSpacing: 0.01,
      fontFamily: "Inter",
      color: theme.textPrimary,
    },
    bodyLarge: {
      fontSize: 16,
      fontWeight: "400",
      lineHeight: 24,
      letterSpacing: 0.01,
      fontFamily: "Inter",
      color: theme.textPrimary,
    },
    body: {
      fontSize: 14,
      fontWeight: "400",
      lineHeight: 20,
      letterSpacing: 0.01,
      fontFamily: "Inter",
      color: theme.textPrimary,
    },
    label: {
      fontSize: 12,
      fontWeight: "600",
      lineHeight: 16,
      letterSpacing: 0.1,
      fontFamily: "Geist",
      color: theme.textSecondary,
    },
    caption: {
      fontSize: 11,
      fontWeight: "500",
      lineHeight: 16,
      letterSpacing: 0.05,
      fontFamily: "Inter",
      color: theme.textSecondary,
    },
  };

  return (
    <Text
      style={[variantStyles[variant], style]}
      {...props}
    />
  );
}
