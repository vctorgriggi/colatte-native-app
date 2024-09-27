import { useTheme, Text } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import React from "react";
import {
  View,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";

import { create, deleteById } from "@/services/productImageService";
import ActivityIndicator from "@/components/ActivityIndicator";
import { getById } from "@/services/productService";
import ImageDialog from "@/components/dialog/Image";
import Snackbar from "@/components/Snackbar";
import { Product } from "@/types";

const apiUrl = process.env.EXPO_PUBLIC_API_URL;

export default function Details() {
  const { id = "" } = useLocalSearchParams<{ id: string }>();

  const { colors } = useTheme();

  /* loading details */
  const [product, setProduct] = React.useState<Product | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const findById = async () => {
    try {
      setIsLoading(true);
      const data = await getById(id);
      setProduct(data);
    } catch (error) {
      if (error instanceof Error) {
        setSnackbarMessage(error.message);
      } else {
        setSnackbarMessage("An unexpected error occurred.");
      }
      setSnackbarVisible(true);
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    findById();
  }, []);

  /* submitting action */
  const _onSavePressed = async () => {
    if (!product || !image) return;

    const formData = new FormData();
    formData.append("image", {
      uri: image,
      name: `img_${product.id}.jpg`,
      type: "image/jpeg",
    } as unknown as Blob);

    handleAdd(formData);
  };

  /* add image to product */
  const [isAddingAnimation, setIsAddingAnimation] = React.useState(false);

  const handleAdd = async (formData: FormData) => {
    if (!product) return;

    try {
      setIsAddingAnimation(true);
      await create(product.id, formData);
      findById();
      setSnackbarMessage(
        "Sucesso: a imagem foi adicionada confome solicitado."
      );
      setSnackbarVisible(true);
    } catch (error) {
      if (error instanceof Error) {
        setSnackbarMessage(error.message);
      } else {
        setSnackbarMessage("An unexpected error occurred.");
      }
      setSnackbarVisible(true);
    } finally {
      setIsAddingAnimation(false);
    }
  };

  /* delete image from product */
  // TODO: add loading state

  const handleDeleteImage = async (id: string) => {
    if (!product) return;

    try {
      await deleteById(id);
      findById();
      setSnackbarMessage("Exclusão bem-sucedida: a imagem foi removida.");
      setSnackbarVisible(true);
    } catch (error) {
      if (error instanceof Error) {
        setSnackbarMessage(error.message);
      } else {
        setSnackbarMessage("An unexpected error occurred.");
      }
      setSnackbarVisible(true);
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
    <View style={[styles.content, { backgroundColor: colors.background }]}>
      {isLoading && <ActivityIndicator />}
      {!isLoading && (
        <React.Fragment>
          {product && (
            <ScrollView
              contentContainerStyle={{ gap: 50, flexGrow: 1 }}
              refreshControl={
                <RefreshControl refreshing={isLoading} onRefresh={findById} />
              }
            >
              <View style={{ paddingHorizontal: 30, paddingTop: 15 }}>
                <Text variant="displaySmall">{product.name}</Text>
                <Text
                  variant="bodyMedium"
                  style={{ marginBottom: 12, color: colors.outline }}
                >
                  {product.productCategory.name}
                </Text>
                <Text variant="bodyMedium">{product.description}</Text>
              </View>
              <View
                style={{
                  flex: 1,
                  paddingHorizontal: 15,
                  paddingBottom: 15,
                  backgroundColor: colors.surface,
                  borderTopLeftRadius: 30,
                  borderTopRightRadius: 30,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    paddingHorizontal: 15,
                    marginTop: 25,
                    marginBottom: 15,
                  }}
                >
                  <Text variant="headlineSmall">Imagens</Text>
                  <TouchableOpacity
                    onPress={() => setIsModalVisible(true)}
                    style={{
                      backgroundColor: colors.primary,
                      borderRadius: 50,
                      padding: 8,
                    }}
                    disabled={isAddingAnimation}
                  >
                    {isAddingAnimation && (
                      <ActivityIndicator size={16} color={colors.onPrimary} />
                    )}
                    {!isAddingAnimation && (
                      <MaterialIcons
                        name="add"
                        size={24}
                        color={colors.onPrimary}
                      />
                    )}
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    flexWrap: "wrap",
                  }}
                >
                  {product.productImages?.map((image) => (
                    <View
                      key={image.id}
                      style={{
                        width: "50%",
                        padding: 15,
                      }}
                    >
                      <Image
                        source={{ uri: `${apiUrl}/${image.imageUrl}` }}
                        style={{
                          width: "100%",
                          aspectRatio: 1,
                          borderRadius: 5,
                          resizeMode: "cover",
                        }}
                      />
                      <TouchableOpacity
                        onPress={() => handleDeleteImage(image.id)}
                        style={{
                          position: "absolute",
                          bottom: 0,
                          right: 0,
                          backgroundColor: colors.background,
                          borderRadius: 50,
                          padding: 8,
                        }}
                      >
                        <MaterialIcons
                          name="close"
                          size={24}
                          color={colors.onBackground}
                        />
                      </TouchableOpacity>
                    </View>
                  ))}
                  {product.productImages?.length === 0 && (
                    <Text
                      variant="bodyMedium"
                      style={{
                        width: "100%",
                        textAlign: "center",
                        color: colors.outline,
                      }}
                    >
                      nenhuma imagem adicionada.
                    </Text>
                  )}
                </View>
              </View>
            </ScrollView>
          )}
          {!product && (
            <Text variant="bodyMedium" style={{ color: colors.outline }}>
              produto não encontrado.
            </Text>
          )}
        </React.Fragment>
      )}
      <ImageDialog
        visible={isDialogVisible}
        onDismiss={handleDialogDismiss}
        uploadCamera={() => uploadImage("camera")}
        uploadGallery={() => uploadImage("gallery")}
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
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  item: {
    alignItems: "center",
    padding: 12,
    gap: 8,
  },
});
