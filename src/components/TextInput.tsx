import { TextInput as Input, useTheme } from "react-native-paper";
import { View, Text, StyleSheet } from "react-native";
import React from "react";

type Props = React.ComponentProps<typeof Input> & { errorText?: string };

export default function TextInput({ errorText, ...props }: Props) {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <Input
        style={styles.input}
        mode="outlined"
        textColor={colors.onBackground}
        activeOutlineColor={colors.primary}
        {...props}
      />
      {errorText && (
        <Text style={[styles.error, { color: colors.error }]}>{errorText}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginTop: 8,
    marginBottom: 4,
  },
  input: {
    backgroundColor: "transparent",
  },
  error: {
    fontSize: 14,
    paddingHorizontal: 4,
    paddingTop: 4,
  },
});
