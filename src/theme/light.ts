import { MD3LightTheme as DefaultTheme } from "react-native-paper";

export const light = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    /* main colors */
    primary: "#9fa0a4",
    primaryVariant: "#dadada",
    secondary: "#383838",
    secondaryVariant: "#565656", // I added this

    /* background colors */
    background: "#F5F5F5", // default is #FFFFFF
    surface: "#FFFFFF",
    error: "#B00020",

    /* text colors */
    onPrimary: "#FFFFFF",
    onSecondary: "#000000",
    onBackground: "#000000",
    onSurface: "#000000",
    onError: "#FFFFFF",
  },
};
