import { Button, useTheme } from "react-native-paper";
import { StyleSheet } from "react-native";
import React from "react";

type Props = React.ComponentProps<typeof Button>;

export default function Default({ children, mode, style, ...props }: Props) {
  const { colors } = useTheme();

  return (
    <Button
      style={[
        styles.button,
        mode === "outlined" && {
          borderColor: colors.primary,
        },
        style,
      ]}
      labelStyle={styles.buttonText}
      mode={mode}
      {...props}
    >
      {children || "Press me"}
    </Button>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 5,
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 15,
    lineHeight: 26,
  },
});
