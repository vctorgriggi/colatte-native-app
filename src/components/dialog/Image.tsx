import { Portal, Dialog, Text, useTheme } from "react-native-paper";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";

type Props = Omit<React.ComponentProps<typeof Dialog>, "children"> & {
  uploadCamera: () => void;
  uploadGallery: () => void;
  onDelete?: () => void;
};

export default function Image({
  visible,
  onDismiss,
  uploadCamera,
  uploadGallery,
  onDelete,
}: Props) {
  const { colors } = useTheme();

  return (
    <Portal>
      <Dialog
        visible={visible}
        onDismiss={onDismiss}
        style={[styles.dialog, { backgroundColor: colors.surface }]}
      >
        <Dialog.Title>Escolha uma opção</Dialog.Title>
        <Dialog.Content>
          <View style={styles.items}>
            <TouchableOpacity onPress={uploadCamera} style={styles.item}>
              <MaterialIcons
                name="camera-alt"
                size={30}
                color={colors.onSurface}
              />
              <Text variant="bodyMedium">Câmera</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={uploadGallery} style={styles.item}>
              <MaterialIcons name="image" size={30} color={colors.onSurface} />
              <Text variant="bodyMedium">Galeria</Text>
            </TouchableOpacity>
            {onDelete && (
              <TouchableOpacity onPress={onDelete} style={styles.item}>
                <MaterialIcons
                  name="delete"
                  size={30}
                  color={colors.onSurface}
                />
                <Text variant="bodyMedium">Remover</Text>
              </TouchableOpacity>
            )}
          </View>
        </Dialog.Content>
      </Dialog>
    </Portal>
  );
}

const styles = StyleSheet.create({
  dialog: {
    borderRadius: 5,
  },
  items: {
    flexDirection: "row",
    flexGrow: 1,
  },
  item: {
    alignItems: "center",
    flex: 1,
    padding: 12,
    gap: 8,
  },
});
