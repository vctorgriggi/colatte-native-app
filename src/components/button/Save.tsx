import { Button, useTheme } from "react-native-paper";
import { StyleSheet } from "react-native";
import React from "react";

import ActivityIndicator from "../ActivityIndicator";

type Props = Omit<React.ComponentProps<typeof Button>, "children"> & {
  isCreatingAnimation?: boolean;
  isUpdatingAnimation?: boolean;
  formMode?: "create" | "update" | null;
};

export default function Save({
  mode,
  style,
  isCreatingAnimation,
  isUpdatingAnimation,
  formMode = "create",
  ...props
}: Props) {
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
      disabled={isCreatingAnimation || isUpdatingAnimation}
      {...props}
    >
      {(isCreatingAnimation || isUpdatingAnimation) && <ActivityIndicator />}
      {!isCreatingAnimation &&
        !isUpdatingAnimation &&
        (formMode === "update" ? "Salvar mudanças" : "Adicionar à lista")}
    </Button>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 5,
    minWidth: 150,
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 15,
    lineHeight: 26,
  },
});
