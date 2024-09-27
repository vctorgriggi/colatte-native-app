import { TextStyle, Text, StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";
import React from "react";

import { fontFamily } from "@/theme";

type Props = { children: React.ReactNode; style?: TextStyle | TextStyle[] };

export default function Header({ children, style }: Props) {
  const { colors } = useTheme();

  return (
    <Text style={[styles.header, { color: colors.onBackground }, style]}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 20,
    lineHeight: 28,
    fontFamily: fontFamily.bold,
  },
});
