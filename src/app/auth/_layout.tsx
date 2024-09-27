import { useTheme } from "react-native-paper";
import { Stack } from "expo-router";

import { AuthProvider } from "@/contexts/AuthContext";

export default function AuthLayout() {
  const { colors } = useTheme();

  return (
    <AuthProvider>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerTintColor: colors.onBackground,
          headerShadowVisible: false,
        }}
      >
        <Stack.Screen
          name="app"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="signIn" options={{ title: "" }} />
        <Stack.Screen name="signUp" options={{ title: "" }} />
        <Stack.Screen name="forgotPassword" options={{ title: "" }} />
        <Stack.Screen
          name="resetPassword/[id]/[token]"
          options={{ headerShown: false }}
        />
      </Stack>
    </AuthProvider>
  );
}
