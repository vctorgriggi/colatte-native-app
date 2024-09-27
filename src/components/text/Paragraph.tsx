import { TextStyle, Text, StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";
import React from "react";

import { fontFamily } from "@/theme";

type Props = {
  children: React.ReactNode;
  style?: TextStyle | TextStyle[];
};

export default function Paragraph({ children, style }: Props) {
  const { colors } = useTheme();

  return (
    <Text style={[styles.text, { color: colors.onBackground }, style]}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 15,
    lineHeight: 30,
    fontFamily: fontFamily.regular,
  },
});
