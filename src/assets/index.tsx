import { Image, ImageStyle } from "react-native";
import React from "react";

import { useThemeContext } from "@/contexts/ThemeContext";

interface ImageProps {
  style?: ImageStyle;
}

export const VerticalLogo: React.FC<ImageProps> = ({ style }) => {
  const { theme } = useThemeContext();

  return (
    <Image
      source={
        theme === "dark"
          ? require("./images/vazado-light-vertical.png")
          : require("./images/vazado-dark-vertical.png")
      }
      style={style}
    />
  );
};

export const HorizontalLogo: React.FC<ImageProps> = ({ style }) => {
  const { theme } = useThemeContext();

  return (
    <Image
      source={
        theme === "dark"
          ? require("./images/vazado-light-horizontal.png")
          : require("./images/vazado-dark-horizontal.png")
      }
      style={style}
    />
  );
};
