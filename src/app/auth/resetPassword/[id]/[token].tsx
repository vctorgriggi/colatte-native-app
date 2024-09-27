import { KeyboardAvoidingView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";
import { useTheme } from "react-native-paper";
import { router } from "expo-router";
import React from "react";

import { resetPassword, validateResetToken } from "@/services/authService";
import ActivityIndicator from "@/components/ActivityIndicator";
import { APP_ROUTES } from "@/constants/app-routes";
import Paragraph from "@/components/text/Paragraph";
import Button from "@/components/button/Default";
import TextInput from "@/components/TextInput";
import Header from "@/components/text/Header";
import { Reset as ResetType } from "@/types";
import Snackbar from "@/components/Snackbar";
import Appbar from "@/components/Appbar";

interface FormErrors {
  password?: string;
  confirmPassword?: string;
}

export default function ResetPassword() {
  const { id = "", token = "" } = useLocalSearchParams<{
    id: string;
    token: string;
  }>();

  const { colors } = useTheme();

  /* loading animation */
  const [isLoadingAnimation, setIsLoadingAnimation] = React.useState(false);

  /* snackbar */
  const [snackbarVisible, setSnackbarVisible] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");

  /* stepper settings */
  const [activeStep, setActiveStep] = React.useState(0);

  /* init form data */
  const [formData, setFormData] = React.useState<ResetType>({
    password: "",
    confirmPassword: "",
  });

  const handleFieldChange = (name: keyof ResetType, value: string) => {
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setFormErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  /* init form errors */
  const [formErrors, setFormErrors] = React.useState<FormErrors>({});

  const validateForm = (): boolean => {
    const errors: FormErrors = {
      // object to store errors
    };

    if (!formData.password) errors.password = "Senha é obrigatória.";
    if (!formData.confirmPassword)
      errors.confirmPassword = "Confirmação de senha é obrigatória.";
    if (formData.password !== formData.confirmPassword)
      errors.confirmPassword = "Senhas não conferem.";

    setFormErrors(errors);

    return Object.keys(errors).length === 0;
  };

  /* submitting action */
  const _onSendPressed = async () => {
    if (!validateForm()) return;

    try {
      setIsLoadingAnimation(true);
      await resetPassword(id, token, formData);
      setActiveStep(2);
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

  /* validate token */
  const [isValidatingTokenAnimation, setIsValidatingTokenAnimation] =
    React.useState(true);

  const handleValidateToken = async () => {
    try {
      await validateResetToken(id, token);
      setActiveStep(1);
    } catch (error) {
      setSnackbarMessage("O código de redefinição de senha é inválido.");
      setSnackbarVisible(true);
    } finally {
      setIsValidatingTokenAnimation(false);
    }
  };

  React.useEffect(() => {
    handleValidateToken();
  }, [id, token]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView style={{ flex: 1 }}>
        <Appbar />
        <View style={[styles.content, { backgroundColor: colors.background }]}>
          {activeStep === 0 && (
            <React.Fragment>
              {isValidatingTokenAnimation && <ActivityIndicator />}
              {!isValidatingTokenAnimation && (
                <React.Fragment>
                  <Paragraph style={styles.paragraph}>
                    O código para redefinição de senha é inválido ou expirou.
                    Por favor, solicite um novo link de redefinição de senha ou
                    entre em contato com o suporte para obter assistência.
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
            </React.Fragment>
          )}
          {activeStep === 1 && (
            <React.Fragment>
              <Header>Set a new password</Header>
              <Paragraph style={styles.paragraph}>
                Create a new password. Ensure it differs from previous ones for
                security.
              </Paragraph>
              <TextInput
                label="Senha"
                returnKeyType="next"
                value={formData.password}
                onChangeText={(text) => handleFieldChange("password", text)}
                error={!!formErrors.password}
                errorText={formErrors.password}
                autoCapitalize="none"
                secureTextEntry
              />
              <TextInput
                label="Confirme sua Senha"
                returnKeyType="done"
                value={formData.confirmPassword}
                onChangeText={(text) =>
                  handleFieldChange("confirmPassword", text)
                }
                error={!!formErrors.confirmPassword}
                errorText={formErrors.confirmPassword}
                autoCapitalize="none"
                secureTextEntry
              />
              <Button
                mode="contained"
                onPress={_onSendPressed}
                style={styles.button}
                disabled={isLoadingAnimation}
              >
                {isLoadingAnimation && (
                  <ActivityIndicator color={colors.onPrimary} />
                )}
                {!isLoadingAnimation && "Alterar senha"}
              </Button>
            </React.Fragment>
          )}
          {activeStep === 2 && (
            <React.Fragment>
              <Paragraph style={styles.paragraph}>
                Sua senha foi redefinida com sucesso. Agora você pode usar sua
                nova senha para acessar sua conta. Se precisar de mais
                assistência, por favor, entre em contato com o suporte.
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    padding: 15,
  },
  paragraph: {
    width: "100%",
    textAlign: "justify",
  },
  button: {
    width: "100%",
    marginTop: 24,
  },
});
