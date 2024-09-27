import { useTheme } from "react-native-paper";
import { Stack } from "expo-router";

export default function AuthLayout() {
  const { colors } = useTheme();

  return (
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
        name="index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="profile"
        options={{
          title: "",
        }}
      />
      <Stack.Screen
        name="themes"
        options={{
          title: "",
        }}
      />
    </Stack>
  );
}
