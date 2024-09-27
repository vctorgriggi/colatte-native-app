import { Portal, Dialog, Text, Button, useTheme } from "react-native-paper";
import { StyleSheet } from "react-native";
import React from "react";

import ActivityIndicator from "../ActivityIndicator";
import CancelButton from "../button/Cancel";

type Props = Omit<React.ComponentProps<typeof Dialog>, "children"> & {
  onCancel: () => void;
  onConfirm: () => void;
  isDeletingAnimation: boolean;
};

export default function Delete({
  visible,
  onCancel,
  onConfirm,
  isDeletingAnimation,
}: Props) {
  const { colors } = useTheme();

  return (
    <Portal>
      <Dialog
        visible={visible}
        onDismiss={onCancel}
        style={[styles.dialog, { backgroundColor: colors.surface }]}
      >
        <Dialog.Title>Você tem certeza?</Dialog.Title>
        <Dialog.Content>
          <Text variant="bodyMedium">
            Você realmente deseja excluir este dado? Esse processo não pode ser
            desfeito.
          </Text>
        </Dialog.Content>
        <Dialog.Actions>
          <CancelButton onPress={onCancel} textColor={colors.onSurface} />
          <Button
            labelStyle={styles.buttonText}
            textColor={colors.error}
            style={[styles.button, { color: colors.error }]}
            onPress={onConfirm}
            disabled={isDeletingAnimation}
          >
            {isDeletingAnimation && <ActivityIndicator />}
            {!isDeletingAnimation && "Sim, excluir"}
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}

const styles = StyleSheet.create({
  dialog: {
    borderRadius: 5,
  },
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
