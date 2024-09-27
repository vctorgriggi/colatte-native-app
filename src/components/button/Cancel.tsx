import { Button, useTheme } from "react-native-paper";
import { StyleSheet } from "react-native";
import React from "react";

type Props = Omit<React.ComponentProps<typeof Button>, "children"> & {
  close?: boolean;
};

export default function Cancel({ mode, style, close, ...props }: Props) {
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
      {close ? "Fechar" : "Cancelar"}
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
