import { useWindowDimensions, View, StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";
import { router } from "expo-router";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSequence,
  withTiming,
  runOnJS,
  SlideInDown,
} from "react-native-reanimated";
import React from "react";

import ActivityIndicator from "@/components/ActivityIndicator";
import { useThemeContext } from "@/contexts/ThemeContext";
import { APP_ROUTES } from "@/constants/app-routes";

export default function Splash() {
  const { colors } = useTheme();

  const { theme } = useThemeContext();

  const logoScale = useSharedValue(1);
  const logoPositionY = useSharedValue(0);
  const contentDisplay = useSharedValue(0);

  const dimentions = useWindowDimensions();

  const logoAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: logoScale.value },
      { translateY: logoPositionY.value },
    ],
  }));

  const contentAnimatedStyles = useAnimatedStyle(() => ({
    display: contentDisplay.value === 1 ? "flex" : "none",
  }));

  function logoAnimation() {
    logoScale.value = withSequence(
      withTiming(0.7),
      withTiming(1.3),
      withTiming(1, undefined, (finished) => {
        if (finished) {
          logoPositionY.value = withSequence(
            withTiming(50, undefined, () => (contentDisplay.value = 1)),
            withTiming(-dimentions.height, { duration: 400 })
          );

          runOnJS(onEndSplash)();
        }
      })
    );
  }

  function onEndSplash() {
    setTimeout(() => {
      router.replace(APP_ROUTES.auth.app);
    }, 2000);
  }

  React.useEffect(() => {
    logoAnimation();
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Animated.Image
        source={
          theme === "dark"
            ? require("../assets/images/vazado-light-vertical.png")
            : require("../assets/images/vazado-dark-vertical.png")
        }
        style={[styles.logo, logoAnimatedStyle]}
      />
      <Animated.View
        style={[styles.content, contentAnimatedStyles]}
        entering={SlideInDown.duration(700)}
      >
        <View>
          <ActivityIndicator size="large" />
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 64,
    height: 64,
    resizeMode: "contain",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
