import { SafeAreaView } from "react-native-safe-area-context";
import { View, StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";

import Paragraph from "@/components/text/Paragraph";
import Appbar from "@/components/Appbar";

export default function Tabs() {
  const { colors } = useTheme();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Appbar />
      <View style={[styles.content, { backgroundColor: colors.background }]}>
        <Paragraph>
          Seu aplicativo começa aqui. Comece a explorar para descobrir o que
          você pode fazer!
        </Paragraph>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
    padding: 15,
  },
});
