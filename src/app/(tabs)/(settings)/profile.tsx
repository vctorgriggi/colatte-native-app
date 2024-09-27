import { useTheme, Avatar } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import {
  KeyboardAvoidingView,
  ScrollView,
  View,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React from "react";

import { updateById, deleteImage } from "@/services/userService";
import ActivityIndicator from "@/components/ActivityIndicator";
import ImageDialog from "@/components/dialog/Image";
import Button from "@/components/button/Default";
import { useAuth } from "@/contexts/AuthContext";
import Caption from "@/components/text/Caption";
import TextInput from "@/components/TextInput";
import Snackbar from "@/components/Snackbar";
import { User as UserType } from "@/types";

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
}

const apiUrl = process.env.EXPO_PUBLIC_API_URL;

export default function Profile() {
  const { colors } = useTheme();

  const { user, setUser } = useAuth();

  /* init form data */
  const [formData, setFormData] = React.useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
  });

  const handleFieldChange = (name: keyof UserType, value: string) => {
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

    setFormErrors(errors);

    return Object.keys(errors).length === 0;
  };

  /* editing state */
  const [isEditing, setIsEditing] = React.useState(false);

  const resetFormData = () => {
    setFormData({
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
    });
    setIsEditing(false);
  };

  /* submitting action */
  const _onSavePressed = async () => {
    if (!validateForm() || !user) return;

    const dto = new FormData();
    dto.append("firstName", formData.firstName);
    dto.append("lastName", formData.lastName);
    dto.append("email", formData.email);
    if (image) {
      dto.append("image", {
        uri: image,
        name: `img_${user.id}.jpg`,
        type: "image/jpeg",
      } as unknown as Blob);
    }

    handleUpdate(dto);
  };

  /* updating action */
  const [isLoadingAnimation, setIsLoadingAnimation] = React.useState(false);

  const handleUpdate = async (dto: FormData) => {
    if (!user) return;

    try {
      setIsLoadingAnimation(true);
      const data = await updateById(user.id, dto);
      setUser(data);
      setSnackbarMessage("Sucesso na edição: as alterações foram salvas.");
      setSnackbarVisible(true);
    } catch (error) {
      if (error instanceof Error) {
        setSnackbarMessage(error.message);
      } else {
        setSnackbarMessage("An unexpected error occurred.");
      }
      setSnackbarVisible(true);
    } finally {
      setIsLoadingAnimation(false);
      resetFormData();
    }
  };

  /* delete image */
  // TODO: add loading state

  const handleDeleteImage = async () => {
    if (!user) return;

    try {
      const data = await deleteImage(user.id);
      setUser(data);
      setSnackbarMessage("Exclusão bem-sucedida: a imagem foi removida.");
      setSnackbarVisible(true);
    } catch (error) {
      if (error instanceof Error) {
        setSnackbarMessage(error.message);
      } else {
        setSnackbarMessage("An unexpected error occurred.");
      }
      setSnackbarVisible(true);
    } finally {
      setIsModalVisible(false);
      handleDialogDismiss(); // it isn’t necessary, but it’s good practice.
    }
  };

  /* image upload */
  const [isDialogVisible, setIsModalVisible] = React.useState(false);
  const [image, setImage] = React.useState<string | null>(null);

  const clearImageState = () => {
    setImage(null);
  };

  const uploadImage = async (mode: "camera" | "gallery") => {
    try {
      let result: ImagePicker.ImagePickerResult;

      if (mode === "gallery") {
        await ImagePicker.requestMediaLibraryPermissionsAsync();
        result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 1,
        });
      } else {
        await ImagePicker.requestCameraPermissionsAsync();
        result = await ImagePicker.launchCameraAsync({
          cameraType: ImagePicker.CameraType.front,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 1,
        });
      }

      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    } catch (error) {
      setSnackbarMessage("An unexpected error occurred.");
      setSnackbarVisible(true);
    } finally {
      setIsModalVisible(false);
    }
  };

  React.useEffect(() => {
    if (image) {
      try {
        _onSavePressed();
      } finally {
        clearImageState();
      }
    }
  }, [image]);

  const handleDialogDismiss = () => {
    setIsModalVisible(false);
    clearImageState();
  };

  /* snackbar */
  const [snackbarVisible, setSnackbarVisible] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={[
          styles.content,
          { backgroundColor: colors.background },
        ]}
      >
        <View
          style={{
            borderRadius: 50,
            marginBottom: 24,
          }}
        >
          <Avatar.Image
            size={164}
            source={{
              uri: user?.imageUrl
                ? `${apiUrl}/${user.imageUrl}`
                : "https://avatars.githubusercontent.com/vctorgriggi", // TODO: choose a better default image
            }}
          />
          <TouchableOpacity
            onPress={() => setIsModalVisible(true)}
            style={{
              position: "absolute",
              bottom: 0,
              right: 0,
              borderRadius: 50,
              padding: 8,
              backgroundColor: colors.primary,
            }}
          >
            <MaterialIcons name="edit" size={24} color={colors.onPrimary} />
          </TouchableOpacity>
        </View>
        <TextInput
          label="Nome"
          returnKeyType="next"
          value={formData.firstName}
          onChangeText={(text) => handleFieldChange("firstName", text)}
          error={!!formErrors.firstName}
          errorText={formErrors.firstName}
          disabled={!isEditing}
        />
        <TextInput
          label="Sobrenome"
          returnKeyType="next"
          value={formData.lastName}
          onChangeText={(text) => handleFieldChange("lastName", text)}
          error={!!formErrors.lastName}
          errorText={formErrors.lastName}
          disabled={!isEditing}
        />
        <TextInput
          label="Email"
          returnKeyType="done"
          value={formData.email}
          onChangeText={(text) => handleFieldChange("email", text)}
          error={!!formErrors.email}
          errorText={formErrors.email}
          disabled={!isEditing}
        />
        {/* TODO: later add password change */}
        <TextInput label="Senha" value="colatte" disabled secureTextEntry />
        <Caption style={{ marginTop: 8 }}>
          Por motivos de segurança, para redefinir sua senha, você precisa
          solicitar um link de redefinição ao fazer login.
        </Caption>
        {isEditing && (
          <View style={{ flexDirection: "row", gap: 8 }}>
            <Button
              mode="outlined"
              onPress={resetFormData}
              style={styles.button}
            >
              Cancelar
            </Button>
            <Button
              mode="contained"
              onPress={_onSavePressed}
              style={styles.button}
              disabled={isLoadingAnimation}
            >
              {isLoadingAnimation && (
                <ActivityIndicator color={colors.onPrimary} />
              )}
              {!isLoadingAnimation && "Salvar"}
            </Button>
          </View>
        )}
        {!isEditing && (
          <View style={{ flexDirection: "row" }}>
            <Button
              mode="contained"
              onPress={() => setIsEditing(true)}
              style={styles.button}
              disabled={isLoadingAnimation}
            >
              Editar
            </Button>
          </View>
        )}
        <ImageDialog
          visible={isDialogVisible}
          onDismiss={handleDialogDismiss}
          uploadCamera={() => uploadImage("camera")}
          uploadGallery={() => uploadImage("gallery")}
          onDelete={handleDeleteImage}
        />
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
    padding: 15,
    alignItems: "center",
  },
  button: {
    flex: 1,
    marginTop: 24,
    marginBottom: 16,
  },
});
