import { View, type ViewProps } from "react-native";
import { useTheme } from "@/hooks/useTheme";

interface GlassCardProps extends ViewProps {
  elevated?: boolean;
}

export function GlassCard({ elevated = false, style, children, ...props }: GlassCardProps) {
  const theme = useTheme();

  return (
    <View
      style={[
        {
          backgroundColor: elevated
            ? theme.surfaceContainerHigh
            : theme.surfaceContainer,
          borderRadius: 16,
          borderWidth: 1,
          borderColor: theme.border,
          padding: 20,
        },
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  );
}
