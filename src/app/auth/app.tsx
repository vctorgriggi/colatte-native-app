import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "react-native-paper";
import { router } from "expo-router";
import React from "react";

import { APP_ROUTES } from "@/constants/app-routes";
import Paragraph from "@/components/text/Paragraph";
import Button from "@/components/button/Default";
import { useAuth } from "@/contexts/AuthContext";
import Header from "@/components/text/Header";
import Appbar from "@/components/Appbar";
import { fontFamily } from "@/theme";

export default function App() {
  const { colors } = useTheme();

  const { user, logout } = useAuth();

  const _onChangeAccountPressed = async () => {
    try {
      await logout();
      router.push(APP_ROUTES.auth.signIn);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Appbar />
      <View style={[styles.content, { backgroundColor: colors.background }]}>
        <View style={{ width: "100%", gap: 15, marginBottom: 24 }}>
          {!user && (
            <React.Fragment>
              <Paragraph>Que bom ter você aqui!</Paragraph>
              <Button
                mode="contained"
                onPress={() => router.push(APP_ROUTES.auth.signIn)}
              >
                Sign In
              </Button>
              <View style={{ flexDirection: "row" }}>
                <Text style={{ color: colors.onSurface }}>
                  Não tem uma conta?{" "}
                </Text>
                <TouchableOpacity
                  onPress={() => router.push(APP_ROUTES.auth.signUp)}
                >
                  <Text
                    style={{
                      fontFamily: fontFamily.bold,
                      color: colors.primary,
                    }}
                  >
                    Cadastre-se
                  </Text>
                </TouchableOpacity>
              </View>
            </React.Fragment>
          )}
          {user && (
            <React.Fragment>
              <Header>
                Oi, {user?.firstName} {user?.lastName}
              </Header>
              <Paragraph>Que bom ter você aqui novamente!</Paragraph>
              <Button
                mode="contained"
                onPress={() => router.push(APP_ROUTES.tabs.index)}
              >
                Entrar
              </Button>
              <View style={{ flexDirection: "row" }}>
                <Text style={{ color: colors.onSurface }}>
                  Deseja usar uma conta diferente?{" "}
                </Text>
                <TouchableOpacity onPress={_onChangeAccountPressed}>
                  <Text
                    style={{
                      fontFamily: fontFamily.bold,
                      color: colors.primary,
                    }}
                  >
                    Clique aqui
                  </Text>
                </TouchableOpacity>
              </View>
            </React.Fragment>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: "flex-end",
    padding: 15,
  },
});
