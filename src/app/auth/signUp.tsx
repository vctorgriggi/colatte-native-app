import { useTheme } from "react-native-paper";
import { router } from "expo-router";
import React from "react";
import {
  KeyboardAvoidingView,
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";

import ActivityIndicator from "@/components/ActivityIndicator";
import { APP_ROUTES } from "@/constants/app-routes";
import Button from "@/components/button/Default";
import { useAuth } from "@/contexts/AuthContext";
import { SignUp as SignUpType } from "@/types";
import TextInput from "@/components/TextInput";
import Header from "@/components/text/Header";
import Snackbar from "@/components/Snackbar";
import { VerticalLogo } from "@/assets";
import { fontFamily } from "@/theme";

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
}

export default function SignUp() {
  const { colors } = useTheme();

  /* loading animation */
  const [isLoadingAnimation, setIsLoadingAnimation] = React.useState(false);

  /* snackbar */
  const [snackbarVisible, setSnackbarVisible] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");

  /* init form data */
  const [formData, setFormData] = React.useState<SignUpType>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleFieldChange = (name: keyof SignUpType, value: string) => {
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setFormErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  /* init form errors */
  const [formErrors, setFormErrors] = React.useState<FormErrors>({});

  const validateForm = (): boolean => {
    const errors: FormErrors = {
      // object to store errors
    };

    if (!formData.firstName) errors.firstName = "Nome é obrigatório.";
    if (!formData.lastName) errors.lastName = "Sobrenome é obrigatório.";
    if (!formData.email) {
      errors.email = "Email é obrigatório.";
    }
    if (!formData.password) errors.password = "Senha é obrigatória.";

    setFormErrors(errors);

    return Object.keys(errors).length === 0;
  };

  /* submitting action */
  const { register } = useAuth();

  const _onSignUpPressed = async () => {
    if (!validateForm()) return;

    try {
      setIsLoadingAnimation(true);
      await register(formData);
      router.push(APP_ROUTES.tabs.index);
    } catch (error) {
      if (error instanceof Error) {
        setSnackbarMessage(error.message);
      } else {
        setSnackbarMessage("An unexpected error occurred.");
      }
      setSnackbarVisible(true);
    } finally {
      setIsLoadingAnimation(false);
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={[
          styles.content,
          { backgroundColor: colors.background },
        ]}
      >
        <VerticalLogo
          style={{
            width: 128,
            height: 128,
            marginBottom: 24,
            resizeMode: "contain",
          }}
        />
        <Header>Criar uma conta</Header>
        <TextInput
          label="Nome"
          returnKeyType="next"
          value={formData.firstName}
          onChangeText={(text) => handleFieldChange("firstName", text)}
          error={!!formErrors.firstName}
          errorText={formErrors.firstName}
        />
        <TextInput
          label="Sobrenome"
          returnKeyType="next"
          value={formData.lastName}
          onChangeText={(text) => handleFieldChange("lastName", text)}
          error={!!formErrors.lastName}
          errorText={formErrors.lastName}
        />
        <TextInput
          label="Email"
          returnKeyType="next"
          value={formData.email}
          onChangeText={(text) => handleFieldChange("email", text)}
          error={!!formErrors.email}
          errorText={formErrors.email}
          autoCapitalize="none"
          textContentType="emailAddress"
          keyboardType="email-address"
        />
        <TextInput
          label="Senha"
          returnKeyType="done"
          value={formData.password}
          onChangeText={(text) => handleFieldChange("password", text)}
          error={!!formErrors.password}
          errorText={formErrors.password}
          autoCapitalize="none"
          secureTextEntry
        />
        <Button
          mode="contained"
          onPress={_onSignUpPressed}
          style={{
            width: "100%",
            marginTop: 24,
            marginBottom: 16,
          }}
          disabled={isLoadingAnimation}
        >
          {isLoadingAnimation && <ActivityIndicator color={colors.onPrimary} />}
          {!isLoadingAnimation && "Sign Up"}
        </Button>
        <View style={{ flexDirection: "row" }}>
          <Text style={{ color: colors.onSurface }}>Já tem uma conta? </Text>
          <TouchableOpacity onPress={() => router.push(APP_ROUTES.auth.signIn)}>
            <Text
              style={{ fontFamily: fontFamily.bold, color: colors.primary }}
            >
              Faça logon
            </Text>
          </TouchableOpacity>
        </View>
        <Snackbar
          visible={snackbarVisible}
          onDismiss={() => setSnackbarVisible(false)}
          action={{
            label: "OK",
            onPress: () => setSnackbarVisible(false),
          }}
        >
          {snackbarMessage}
        </Snackbar>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
    alignItems: "center",
    padding: 15,
  },
});
