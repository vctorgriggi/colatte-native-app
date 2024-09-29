import { Portal, Modal as PaperModal, useTheme } from "react-native-paper";
import { ScrollView, View, StyleSheet } from "react-native";
import React from "react";

type Props = Omit<React.ComponentProps<typeof PaperModal>, "children"> & {
  header?: React.ReactNode;
  content?: React.ReactNode;
  actions?: React.ReactNode;
};

export default function Modal({
  visible,
  onDismiss,
  header,
  content,
  actions,
  ...props
}: Props) {
  const { colors } = useTheme();

  return (
    <Portal>
      <PaperModal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={[
          styles.modal,
          { backgroundColor: colors.surface },
        ]}
        {...props}
      >
        {header && <View style={styles.title}>{header}</View>}
        {content && <ScrollView style={styles.content}>{content}</ScrollView>}
        {actions && <View style={styles.actions}>{actions}</View>}
      </PaperModal>
    </Portal>
  );
}

const styles = StyleSheet.create({
  modal: {
    margin: 30,
    borderRadius: 5,
    maxHeight: "80%", // I use this to limit the height of the modal
  },
  title: {
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  content: {
    paddingHorizontal: 24,
    paddingBottom: 20,
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: 8,
  },
});
