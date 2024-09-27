import { useTheme, IconButton, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import {
  KeyboardAvoidingView,
  View,
  ScrollView,
  RefreshControl,
  StyleSheet,
} from "react-native";

import ActivityIndicator from "@/components/ActivityIndicator";
import { ProductCategory as PCategoryType } from "@/types";
import CancelButton from "@/components/button/Cancel";
import DeleteDialog from "@/components/dialog/Delete";
import Paragraph from "@/components/text/Paragraph";
import SaveButton from "@/components/button/Save";
import TextInput from "@/components/TextInput";
import Snackbar from "@/components/Snackbar";
import Appbar from "@/components/Appbar";
import Modal from "@/components/Modal";
import {
  create,
  get,
  updateById,
  deleteById,
} from "@/services/productCategoryService";
import Card from "@/components/Card";
import FAB from "@/components/FAB";

interface FormErrors {
  name?: string;
}

export default function ProductCategories() {
  const { colors } = useTheme();

  /* product categories */
  const [pCategories, setPCategories] = React.useState<PCategoryType[]>([]);
  const [selectedPCategory, setSelectedPCategory] =
    React.useState<PCategoryType | null>(null);
  const [isSearchingAnimation, setIsSearchingAnimation] = React.useState(false);

  async function find() {
    try {
      setIsSearchingAnimation(true);
      const data = await get();
      setPCategories(data);
    } catch (error) {
      if (error instanceof Error) {
        setSnackbarMessage(error.message);
      } else {
        setSnackbarMessage("An unexpected error occurred.");
      }
      setSnackbarVisible(true);
    } finally {
      setIsSearchingAnimation(false);
    }
  }

  React.useEffect(() => {
    find();
  }, []);

  /* deleting action */
  const [isDeleting, setIsDeleting] = React.useState(false);
  const [isDeletingAnimation, setIsDeletingAnimation] = React.useState(false);

  const showDelete = (pCategory: PCategoryType) => {
    setSelectedPCategory(pCategory);
    setIsDeleting(true);
  };

  const hideDelete = () => {
    setIsDeleting(false);
    setSelectedPCategory(null);
  };

  const handleDelete = async () => {
    if (!selectedPCategory) return;

    try {
      setIsDeletingAnimation(true);
      await deleteById(selectedPCategory.id);
      await find();
      setSnackbarMessage("Exclusão bem-sucedida: o conteúdo foi removido.");
      setSnackbarVisible(true);
    } catch (error) {
      if (error instanceof Error) {
        setSnackbarMessage(error.message);
      } else {
        setSnackbarMessage("An unexpected error occurred.");
      }
      setSnackbarVisible(true);
    } finally {
      setIsDeletingAnimation(false);
      hideDelete();
    }
  };

  /* init form data */
  const [formData, setFormData] = React.useState<Partial<PCategoryType>>({
    name: "",
  });

  const handleFieldChange = (name: keyof PCategoryType, value: string) => {
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setFormErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  /* init form errors */
  const [formErrors, setFormErrors] = React.useState<FormErrors>({});

  const validateForm = (): boolean => {
    const errors: FormErrors = {
      // object to store errors
    };

    if (!formData.name) errors.name = "Nome é obrigatório.";

    setFormErrors(errors);

    return Object.keys(errors).length === 0;
  };

  /* setup form */
  const [formMode, setFormMode] = React.useState<"create" | "update" | null>(
    null
  );

  const _onSubmitPressed = async () => {
    if (!validateForm()) return;

    formMode === "create" ? handleCreate() : handleUpdate();
  };

  const hideForm = () => {
    setFormMode(null);
    setFormData({
      name: "",
    });
    setFormErrors({
      name: "",
    });
    setSelectedPCategory(null);
  };

  /* creating action */
  const [isCreatingAnimation, setIsCreatingAnimation] = React.useState(false);

  const handleCreate = async () => {
    try {
      setIsCreatingAnimation(true);
      await create(formData);
      await find();
      setSnackbarMessage(
        "Nova adição: o conteúdo foi criado conforme solicitado."
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
      setIsCreatingAnimation(false);
      hideForm();
    }
  };

  /* updating action */
  const [isUpdatingAnimation, setIsUpdatingAnimation] = React.useState(false);

  const showUpdate = (pCategory: PCategoryType) => {
    setSelectedPCategory(pCategory);
    setFormData({
      name: pCategory.name || "",
    });
    setFormMode("update");
  };

  const handleUpdate = async () => {
    if (!selectedPCategory) return;

    try {
      setIsUpdatingAnimation(true);
      await updateById(selectedPCategory.id, formData);
      await find();
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
      setIsUpdatingAnimation(false);
      hideForm();
    }
  };

  /* snackbar */
  const [snackbarVisible, setSnackbarVisible] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView style={{ flex: 1 }}>
        <Appbar />
        <View style={[styles.content, { backgroundColor: colors.background }]}>
          {isSearchingAnimation && <ActivityIndicator />}
          {!isSearchingAnimation && (
            <React.Fragment>
              {pCategories.length > 0 && (
                <ScrollView
                  contentContainerStyle={{ gap: 16 }}
                  refreshControl={
                    <RefreshControl
                      refreshing={isSearchingAnimation}
                      onRefresh={find}
                    />
                  }
                >
                  {pCategories.map((pCategory) => (
                    <Card
                      key={pCategory.id}
                      source={pCategory.imageUrl}
                      title={pCategory.name}
                      actions={
                        <React.Fragment>
                          <IconButton
                            icon={({ size, color }) => (
                              <MaterialIcons
                                name="edit"
                                size={size}
                                color={color}
                              />
                            )}
                            iconColor={colors.onSurface}
                            size={24}
                            onPress={() => showUpdate(pCategory)}
                          />
                          <IconButton
                            icon={({ size, color }) => (
                              <MaterialIcons
                                name="delete"
                                size={size}
                                color={color}
                              />
                            )}
                            iconColor={colors.onSurface}
                            size={24}
                            onPress={() => showDelete(pCategory)}
                          />
                        </React.Fragment>
                      }
                    />
                  ))}
                </ScrollView>
              )}
              {pCategories.length === 0 && (
                <Text variant="bodyMedium" style={{ color: colors.outline }}>
                  não há categorias de produtos cadastradas.
                </Text>
              )}
              <FAB onPress={() => setFormMode("create")} />
            </React.Fragment>
          )}
          <DeleteDialog
            visible={isDeleting}
            onCancel={hideDelete}
            onConfirm={handleDelete}
            isDeletingAnimation={isDeletingAnimation}
          />
          <Modal
            visible={formMode !== null}
            onDismiss={hideForm}
            header={
              <Text variant="titleLarge">
                {formMode === "update"
                  ? "Atualize as informações do item"
                  : "Novo item"}
              </Text>
            }
            content={
              <React.Fragment>
                <Paragraph>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </Paragraph>
                <TextInput
                  label="Nome"
                  returnKeyType="next"
                  value={formData.name}
                  onChangeText={(text) => handleFieldChange("name", text)}
                  error={!!formErrors.name}
                  errorText={formErrors.name}
                />
                {/* TODO: add image upload */}
              </React.Fragment>
            }
            actions={
              <React.Fragment>
                <CancelButton onPress={hideForm} textColor={colors.onSurface} />
                <SaveButton
                  textColor={colors.onSurface}
                  isCreatingAnimation={isCreatingAnimation}
                  isUpdatingAnimation={isUpdatingAnimation}
                  formMode={formMode}
                  onPress={_onSubmitPressed}
                />
              </React.Fragment>
            }
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
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    padding: 15,
  },
});
