import { View, StyleSheet } from "react-native";
import Animated from "react-native-reanimated";
import { useTheme } from "react-native-paper";
import { router } from "expo-router";
import React from "react";

import { validateUserToken } from "../services/authService";
import { APP_ROUTES } from "../constants/app-routes";
import ActivityIndicator from "./ActivityIndicator";
import { useAuth } from "../contexts/AuthContext";

type Props = { children: React.ReactNode };

export default function ProtectedRoute({ children }: Props) {
  const { colors } = useTheme();

  const { user, setUser } = useAuth();
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await validateUserToken();
        setUser(data);
      } catch (error) {
        if (error instanceof Error) {
          console.log(error.message);
        } else {
          console.log("Error fetching user!");
        }
      } finally {
        setLoading(false);
      }
    };

    if (!user) {
      fetchUser();
    } else {
      setLoading(false);
    }
  }, [user]);

  React.useEffect(() => {
    if (!loading && !user) {
      router.replace(APP_ROUTES.auth.app);
    }
  }, [loading, user]);

  if (loading) {
    return (
      <Animated.View
        style={[styles.container, { backgroundColor: colors.background }]}
      >
        <View>
          <ActivityIndicator size="large" />
        </View>
      </Animated.View>
    );
  }

  return <React.Fragment>{user ? children : null}</React.Fragment>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
