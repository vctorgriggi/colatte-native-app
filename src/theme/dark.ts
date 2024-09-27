import { MD3LightTheme as DefaultTheme } from "react-native-paper";

export const dark = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    /* main colors */
    primary: "#dadada",
    primaryVariant: "#9fa0a4",
    secondary: "#fff9f0",

    /* background colors */
    background: "#121212",
    surface: "#121212",
    error: "#CF6679",

    /* text colors */
    onPrimary: "#000000",
    onSecondary: "#000000",
    onBackground: "#FFFFFF",
    onSurface: "#FFFFFF",
    onError: "#000000",
  },
};
