import { useTheme, IconButton, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import {
  KeyboardAvoidingView,
  View,
  ScrollView,
  RefreshControl,
  StyleSheet,
} from "react-native";
import React from "react";

import { create, get, updateById, deleteById } from "@/services/productService";
import { get as getPCategories } from "@/services/productCategoryService";
import ActivityIndicator from "@/components/ActivityIndicator";
import CancelButton from "@/components/button/Cancel";
import DeleteDialog from "@/components/dialog/Delete";
import Paragraph from "@/components/text/Paragraph";
import SaveButton from "@/components/button/Save";
import TextInput from "@/components/TextInput";
import Dropdown from "@/components/Dropdown";
import Snackbar from "@/components/Snackbar";
import Appbar from "@/components/Appbar";
import Modal from "@/components/Modal";
import Card from "@/components/Card";
import FAB from "@/components/FAB";
import {
  Product as ProductType,
  ProductCategory as PCategoryType,
} from "@/types";

interface FormErrors {
  name?: string;
  productCategoryId?: string;
}

export default function Products() {
  const { colors } = useTheme();

  /* products */
  const [products, setProducts] = React.useState<ProductType[]>([]);
  const [selectedProduct, setSelectedProduct] =
    React.useState<ProductType | null>(null);
  const [isSearchingAnimation, setIsSearchingAnimation] = React.useState(false);

  async function find() {
    try {
      setIsSearchingAnimation(true);
      const data = await get();
      setProducts(data);
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

  /* searching product categories */
  const [pCategories, setPCategories] = React.useState<PCategoryType[]>([]);
  const [isSearchingPCategoriesAnimation, setIsSearchingPCategoriesAnimation] =
    React.useState(false); // TODO: implement searching animation

  async function findPCategories() {
    try {
      setIsSearchingPCategoriesAnimation(true);
      const data = await getPCategories();
      setPCategories(data);
    } catch (error) {
      if (error instanceof Error) {
        setSnackbarMessage(error.message);
      } else {
        setSnackbarMessage("An unexpected error occurred.");
      }
      setSnackbarVisible(true);
    } finally {
      setIsSearchingPCategoriesAnimation(false);
    }
  }

  React.useEffect(() => {
    findPCategories();
  }, []);

  /* deleting action */
  const [isDeleting, setIsDeleting] = React.useState(false);
  const [isDeletingAnimation, setIsDeletingAnimation] = React.useState(false);

  const showDelete = (product: ProductType) => {
    setSelectedProduct(product);
    setIsDeleting(true);
  };

  const hideDelete = () => {
    setIsDeleting(false);
    setSelectedProduct(null);
  };

  const handleDelete = async () => {
    if (!selectedProduct) return;

    try {
      setIsDeletingAnimation(true);
      await deleteById(selectedProduct.id);
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
  const [formData, setFormData] = React.useState<Partial<ProductType>>({
    name: "",
    description: "",
    productCategoryId: "",
  });

  const handleFieldChange = (name: keyof ProductType, value: string) => {
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
    if (!formData.productCategoryId)
      errors.productCategoryId = "Categoria de Produto é obrigatória.";

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
      description: "",
      productCategoryId: "",
    });
    setFormErrors({
      name: "",
      productCategoryId: "",
    });
    setSelectedProduct(null);
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

  const showUpdate = (product: ProductType) => {
    setSelectedProduct(product);
    setFormData({
      name: product.name || "",
      description: product.description || "",
      productCategoryId: product.productCategoryId || "",
    });
    setFormMode("update");
  };

  const handleUpdate = async () => {
    if (!selectedProduct) return;

    try {
      setIsUpdatingAnimation(true);
      await updateById(selectedProduct.id, formData);
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
              {products.length > 0 && (
                <ScrollView
                  contentContainerStyle={{ gap: 16 }}
                  refreshControl={
                    <RefreshControl
                      refreshing={isSearchingAnimation}
                      onRefresh={find}
                    />
                  }
                >
                  {products.map((product) => (
                    <Card
                      key={product.id}
                      title={product.name}
                      caption={product.productCategory.name}
                      description={product.description}
                      actions={
                        <React.Fragment>
                          <IconButton
                            icon={({ size, color }) => (
                              <MaterialIcons
                                name="remove-red-eye"
                                size={size}
                                color={color}
                              />
                            )}
                            iconColor={colors.onSurface}
                            size={24}
                            onPress={() =>
                              router.push(`/(details)/${product.id}`)
                            }
                          />
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
                            onPress={() => showUpdate(product)}
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
                            onPress={() => showDelete(product)}
                          />
                        </React.Fragment>
                      }
                    />
                  ))}
                </ScrollView>
              )}
              {products.length === 0 && (
                <Text variant="bodyMedium" style={{ color: colors.outline }}>
                  não há produtos cadastrados.
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
                <TextInput
                  label="Descrição"
                  returnKeyType="next"
                  value={formData.description}
                  onChangeText={(text) =>
                    handleFieldChange("description", text)
                  }
                />
                <Dropdown
                  label="Categoria de Produto"
                  options={pCategories.map((pCategory) => ({
                    label: pCategory.name,
                    value: pCategory.id,
                  }))}
                  value={formData.productCategoryId}
                  onSelect={(text) =>
                    handleFieldChange("productCategoryId", text || "")
                  }
                  error={!!formErrors.productCategoryId}
                  errorText={formErrors.productCategoryId}
                />
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
