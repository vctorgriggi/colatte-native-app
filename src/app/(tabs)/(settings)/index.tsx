import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme, Text, TouchableRipple } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, View, StyleSheet } from "react-native";
import { router } from "expo-router";

import { APP_ROUTES } from "@/constants/app-routes";
import Paragraph from "@/components/text/Paragraph";
import { useAuth } from "@/contexts/AuthContext";
import Header from "@/components/text/Header";
import Appbar from "@/components/Appbar";

export default function Settings() {
  const { colors } = useTheme();

  const { logout } = useAuth();

  const _onSignOutPressed = async () => {
    try {
      await logout();
      router.push(APP_ROUTES.auth.app);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Appbar />
      <ScrollView
        contentContainerStyle={[
          styles.content,
          { backgroundColor: colors.background },
        ]}
      >
        <View>
          <Header>Configurações</Header>
          <Paragraph>Atualize suas preferências.</Paragraph>
        </View>
        <View>
          <Text
            variant="labelLarge"
            style={[styles.heading, { color: colors.onBackground }]}
          >
            Dados Pessoais
          </Text>
          <View style={[styles.section, { backgroundColor: colors.surface }]}>
            <TouchableRipple
              onPress={() => router.push(APP_ROUTES.tabs.settings.profile)}
              style={styles.item}
            >
              <View style={styles.itemName}>
                <MaterialCommunityIcons
                  name="account"
                  size={24}
                  color={colors.onSurface}
                />
                <Text variant="labelLarge">Meus Dados</Text>
              </View>
            </TouchableRipple>
          </View>
          <Text
            variant="labelLarge"
            style={[styles.heading, { color: colors.onBackground }]}
          >
            Configurações do aplicativo
          </Text>
          <View style={[styles.section, { backgroundColor: colors.surface }]}>
            <TouchableRipple
              onPress={() => router.push(APP_ROUTES.tabs.settings.themes)}
              style={styles.item}
            >
              <View style={styles.itemName}>
                <MaterialCommunityIcons
                  name="theme-light-dark"
                  size={24}
                  color={colors.onSurface}
                />
                <Text variant="labelLarge">Tema</Text>
              </View>
            </TouchableRipple>
          </View>
          <View
            style={[styles.divider, { borderColor: colors.outlineVariant }]}
          ></View>
          <TouchableRipple onPress={_onSignOutPressed} style={styles.item}>
            <View style={styles.itemName}>
              <MaterialIcons name="logout" size={24} color={colors.onSurface} />
              <Text variant="labelLarge">Sair</Text>
            </View>
          </TouchableRipple>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
    padding: 15,
  },
  heading: {
    marginTop: 15,
    marginBottom: 5,
    marginHorizontal: 10,
  },
  section: {
    borderRadius: 5,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
  },
  itemName: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  divider: {
    borderWidth: 0.5,
    borderRadius: 50,
    marginVertical: 10,
  },
});
