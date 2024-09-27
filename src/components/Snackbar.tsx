import { Snackbar as PaperSnackbar } from "react-native-paper";
import { View, StyleSheet } from "react-native";
import React from "react";

type Props = Omit<React.ComponentProps<typeof PaperSnackbar>, "children"> & {
  children: React.ReactNode;
};

export default function Snackbar({ children, ...props }: Props) {
  return (
    <View style={styles.container}>
      <PaperSnackbar {...props}>{children}</PaperSnackbar>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
});
