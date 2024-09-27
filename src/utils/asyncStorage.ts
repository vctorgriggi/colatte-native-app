import AsyncStorage from "@react-native-async-storage/async-storage";

export const APP_KEY = "APPKEY";

export async function getStorageItem(key: string) {
  try {
    const data = await AsyncStorage.getItem(`${APP_KEY}_${key}`);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error(`Error retrieving the item '${key}':`, error);
    return null;
  }
}

export async function setStorageItem(key: string, value: unknown) {
  try {
    const data = JSON.stringify(value);
    await AsyncStorage.setItem(`${APP_KEY}_${key}`, data);
  } catch (error) {
    console.error(`Error saving the item '${key}':`, error);
  }
}

export async function removeStorageItem(key: string) {
  try {
    await AsyncStorage.removeItem(`${APP_KEY}_${key}`);
  } catch (error) {
    console.error(`Error removing the item '${key}':`, error);
  }
}

export async function clearStorage() {
  try {
    const keys = await AsyncStorage.getAllKeys();
    const appKeys = keys.filter((key) => key.startsWith(`${APP_KEY}_`));
    await AsyncStorage.multiRemove(appKeys);
  } catch (error) {
    console.error("Error clearing storage:", error);
  }
}
