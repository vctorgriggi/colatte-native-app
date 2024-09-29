import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "react-native-paper";
import { Tabs } from "expo-router";

import { NetworkProvider } from "@/contexts/NetworkContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import { AuthProvider } from "@/contexts/AuthContext";

export default function TabsLayout() {
  const { colors } = useTheme();

  return (
    <AuthProvider>
      <NetworkProvider>
        <ProtectedRoute>
          <Tabs
            screenOptions={{
              headerShown: false,
              tabBarShowLabel: false,
              tabBarActiveTintColor: colors.onSurface,
              tabBarInactiveTintColor: colors.onSurfaceVariant,
              tabBarStyle: {
                borderColor: colors.surface,
                backgroundColor: colors.surface,
              },
            }}
          >
            <Tabs.Screen
              name="index"
              options={{
                tabBarIcon: ({ size, color }) => (
                  <MaterialIcons name="home" size={size} color={color} />
                ),
              }}
            />
            <Tabs.Screen
              name="(products)"
              options={{
                tabBarIcon: ({ size, color }) => (
                  <MaterialIcons name="inventory" size={size} color={color} />
                ),
              }}
            />
            <Tabs.Screen
              name="productCategories"
              options={{
                tabBarIcon: ({ size, color }) => (
                  <MaterialIcons name="category" size={size} color={color} />
                ),
              }}
            />
            <Tabs.Screen
              name="(settings)"
              options={{
                tabBarIcon: ({ size, color }) => (
                  <MaterialIcons name="settings" size={size} color={color} />
                ),
              }}
            />
          </Tabs>
        </ProtectedRoute>
      </NetworkProvider>
    </AuthProvider>
  );
}
