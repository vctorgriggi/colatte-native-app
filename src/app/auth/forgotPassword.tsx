import { useTheme } from "react-native-paper";
import { router } from "expo-router";
import React from "react";
import {
  KeyboardAvoidingView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import ActivityIndicator from "@/components/ActivityIndicator";
import { forgotPassword } from "@/services/authService";
import { APP_ROUTES } from "@/constants/app-routes";
import Paragraph from "@/components/text/Paragraph";
import Button from "@/components/button/Default";
import Caption from "@/components/text/Caption";
import { Forgot as ForgotType } from "@/types";
import TextInput from "@/components/TextInput";
import Header from "@/components/text/Header";
import Snackbar from "@/components/Snackbar";
import { VerticalLogo } from "@/assets";

interface FormErrors {
  email?: string;
}

export default function ForgotPassword() {
  const { colors } = useTheme();

  /* loading animation */
  const [isLoadingAnimation, setIsLoadingAnimation] = React.useState(false);

  /* snackbar */
  const [snackbarVisible, setSnackbarVisible] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");

  /* stepper settings */
  const [activeStep, setActiveStep] = React.useState(0);

  /* init form data */
  const [formData, setFormData] = React.useState<ForgotType>({
    email: "",
  });

  const handleFieldChange = (name: keyof ForgotType, value: string) => {
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setFormErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  /* init form errors */
  const [formErrors, setFormErrors] = React.useState<FormErrors>({});

  const validateForm = (): boolean => {
    const errors: FormErrors = {
      // object to store errors
    };

    if (!formData.email) {
      errors.email = "Email é obrigatório.";
    }

    setFormErrors(errors);

    return Object.keys(errors).length === 0;
  };

  /* submitting action */
  const _onSendPressed = async () => {
    if (!validateForm()) return;

    try {
      setIsLoadingAnimation(true);
      await forgotPassword(formData);
      setActiveStep(1);
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
      <View style={[styles.content, { backgroundColor: colors.background }]}>
        <VerticalLogo
          style={{
            width: 128,
            height: 128,
            marginBottom: 24,
            resizeMode: "contain",
          }}
        />
        {activeStep === 0 && (
          <View
            style={{
              width: "100%",
              alignItems: "center",
            }}
          >
            <Header>Insira seu endereço de email</Header>
            <TextInput
              label="Email"
              returnKeyType="done"
              value={formData.email}
              onChangeText={(text) => handleFieldChange("email", text)}
              error={!!formErrors.email}
              errorText={formErrors.email}
              autoCapitalize="none"
              textContentType="emailAddress"
              keyboardType="email-address"
            />
            <Caption
              style={{
                width: "100%",
                textAlign: "justify",
              }}
            >
              Para redefinir sua senha, digite seu endereço de email que você
              pode ter usado conosco.
            </Caption>
            <Button
              mode="contained"
              onPress={_onSendPressed}
              style={styles.button}
              disabled={isLoadingAnimation}
            >
              {isLoadingAnimation && (
                <ActivityIndicator color={colors.onPrimary} />
              )}
              {!isLoadingAnimation && "Continuar"}
            </Button>
            <View
              style={{
                width: "100%",
              }}
            >
              <TouchableOpacity
                onPress={() => router.push(APP_ROUTES.auth.signIn)}
              >
                <Text style={{ color: colors.primary }}>
                  Voltar para entrar
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        {activeStep === 1 && (
          <React.Fragment>
            <Paragraph
              style={{
                width: "100%",
                textAlign: "justify",
              }}
            >
              Em breve, você receberá um link para redefinição de senha. Utilize
              esse link para acessar a página de redefinição e criar uma nova
              senha com segurança.
            </Paragraph>
            <Button
              mode="contained"
              onPress={() => router.push(APP_ROUTES.auth.signIn)}
              style={styles.button}
            >
              Voltar para entrar
            </Button>
          </React.Fragment>
        )}
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
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    alignItems: "center",
    padding: 15,
  },
  button: {
    width: "100%",
    marginTop: 24,
    marginBottom: 16,
  },
});
