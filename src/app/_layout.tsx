import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as SplashScreen from "expo-splash-screen";
import { PaperProvider } from "react-native-paper";
import { StatusBar } from "react-native";
import { Slot } from "expo-router";
import {
  useFonts,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";

import { ThemeProvider, useThemeContext } from "@/contexts/ThemeContext";
import { light, dark } from "@/theme";

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const { theme } = useThemeContext();

  const currentTheme = theme === "dark" ? dark : light;

  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
  });

  if (fontsLoaded) {
    SplashScreen.hideAsync();
  }

  return (
    <PaperProvider theme={currentTheme}>
      <StatusBar
        barStyle={theme === "dark" ? "light-content" : "dark-content"}
        backgroundColor={currentTheme.colors.background}
      />
      <GestureHandlerRootView style={{ flex: 1 }}>
        {fontsLoaded && <Slot />}
      </GestureHandlerRootView>
    </PaperProvider>
  );
};

export default function Layout() {
  return (
    <ThemeProvider>
      <RootLayout />
    </ThemeProvider>
  );
}
