import { Dropdown as NativeDropdown } from "react-native-paper-dropdown";
import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";
import React from "react";

type Props = React.ComponentProps<typeof NativeDropdown> & {
  errorText?: string;
};

export default function Dropdown({
  label,
  options,
  value,
  onSelect,
  errorText,
  ...props
}: Props) {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <NativeDropdown
        label={label}
        options={options}
        value={value}
        onSelect={onSelect}
        mode="outlined"
        menuContentStyle={{ backgroundColor: colors.surface }}
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
  error: {
    fontSize: 14,
    paddingHorizontal: 4,
    paddingTop: 4,
  },
});
