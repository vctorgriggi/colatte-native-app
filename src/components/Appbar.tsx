import { View, StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";

import { HorizontalLogo } from "@/assets";

export default function Appbar() {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <HorizontalLogo style={styles.image} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "static",
    width: "100%",
    justifyContent: "center",
    paddingVertical: 15,
    paddingHorizontal: 20,
    zIndex: 1,
  },
  image: {
    width: 100, // note: adjust width when changing logo
    height: 32,
    resizeMode: "contain",
  },
});
