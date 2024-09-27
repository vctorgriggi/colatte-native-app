import { TextStyle, Text, StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";
import React from "react";

import { fontFamily } from "@/theme";

type Props = { children: React.ReactNode; style?: TextStyle | TextStyle[] };

export default function Caption({ children, style }: Props) {
  const { colors } = useTheme();

  return (
    <Text style={[styles.caption, { color: colors.outline }, style]}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  caption: {
    fontSize: 12,
    lineHeight: 20,
    fontFamily: fontFamily.regular,
  },
});
