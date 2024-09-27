import { View, StyleSheet } from "react-native";
import { useTheme, Text, RadioButton } from "react-native-paper";

import { useThemeContext } from "@/contexts/ThemeContext";
import Header from "@/components/text/Header";

export default function Themes() {
  const { colors } = useTheme();

  const { theme, setTheme, isSystemTheme } = useThemeContext();

  return (
    <View style={[styles.content, { backgroundColor: colors.background }]}>
      <Header>Escolha o tema</Header>
      <View>
        <View style={styles.item}>
          <RadioButton
            value="system"
            status={isSystemTheme ? "checked" : "unchecked"}
            onPress={() => setTheme("system")}
          />
          <Text variant="bodyLarge">sistema</Text>
        </View>
        <View style={styles.item}>
          <RadioButton
            value="light"
            status={
              !isSystemTheme && theme === "light" ? "checked" : "unchecked"
            }
            onPress={() => setTheme("light")}
          />
          <Text variant="bodyLarge">claro</Text>
        </View>
        <View style={styles.item}>
          <RadioButton
            value="dark"
            status={
              !isSystemTheme && theme === "dark" ? "checked" : "unchecked"
            }
            onPress={() => setTheme("dark")}
          />
          <Text variant="bodyLarge">escuro</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
    padding: 15,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    padding: 15,
  },
});
