import { useColorScheme } from "react-native";
import React from "react";

import { getStorageItem, setStorageItem } from "@/utils/asyncStorage";

type Theme = "light" | "dark" | "system";

type ThemeContextType = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  isSystemTheme: boolean; // I use this to mark the theme as system in the UI
};

const ThemeContext = React.createContext<ThemeContextType | undefined>(
  undefined
);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const deviceTheme = useColorScheme();

  const [theme, setTheme] = React.useState<Theme>("system");
  const [isSystemTheme, setIsSystemTheme] = React.useState<boolean>(true);

  React.useEffect(() => {
    getStorageItem("theme").then((value) => {
      if (value) {
        setTheme(value as Theme);
        setIsSystemTheme(value === "system");
      }
    });
  }, []);

  React.useEffect(() => {
    setStorageItem("theme", theme);
    setIsSystemTheme(theme === "system");
  }, [theme]);

  const currentTheme = theme === "system" ? deviceTheme || "light" : theme;

  return (
    <ThemeContext.Provider
      value={{ theme: currentTheme, setTheme, isSystemTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => {
  const context = React.useContext(ThemeContext);

  if (!context) {
    throw new Error("useThemeContext must be used within a ThemeProvider.");
  }

  return context;
};
