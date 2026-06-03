import { Pressable, Text, type PressableProps, type TextStyle, type ViewStyle } from "react-native";
import { useTheme } from "@/hooks/useTheme";

interface ButtonProps extends Omit<PressableProps, "style"> {
  variant?: "primary" | "secondary" | "ghost";
  title: string;
  textStyle?: TextStyle;
  fullWidth?: boolean;
  style?: ViewStyle;
}

export function Button({
  variant = "primary",
  title,
  fullWidth = false,
  style,
  textStyle,
  ...props
}: ButtonProps) {
  const theme = useTheme();

  const variantContainer: Record<string, ViewStyle> = {
    primary: {
      backgroundColor: theme.primaryContainer,
      borderRadius: 12,
      paddingVertical: 14,
      paddingHorizontal: 24,
    },
    secondary: {
      backgroundColor: theme.surfaceContainerHigh,
      borderRadius: 12,
      paddingVertical: 14,
      paddingHorizontal: 24,
      borderWidth: 1,
      borderColor: theme.ghostBorder,
    },
    ghost: {
      backgroundColor: "transparent",
      borderRadius: 12,
      paddingVertical: 14,
      paddingHorizontal: 24,
    },
  };

  const variantText: Record<string, TextStyle> = {
    primary: {
      color: theme.onPrimaryContainer,
      fontWeight: "600",
      fontSize: 16,
      fontFamily: "Inter",
      textAlign: "center",
    },
    secondary: {
      color: theme.textPrimary,
      fontWeight: "600",
      fontSize: 16,
      fontFamily: "Inter",
      textAlign: "center",
    },
    ghost: {
      color: theme.primaryContainer,
      fontWeight: "600",
      fontSize: 16,
      fontFamily: "Inter",
      textAlign: "center",
    },
  };

  return (
    <Pressable
      style={[
        variantContainer[variant],
        fullWidth && { width: "100%" },
        style,
      ]}
      {...props}
    >
      <Text style={[variantText[variant], textStyle]}>{title}</Text>
    </Pressable>
  );
}
