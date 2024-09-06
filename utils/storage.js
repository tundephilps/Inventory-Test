import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveInventory = async (inventory) => {
  try {
    await AsyncStorage.setItem("@inventory", JSON.stringify(inventory));
  } catch (e) {
    console.error("Error saving inventory:", e);
  }
};

export const loadInventory = async () => {
  try {
    const inventoryString = await AsyncStorage.getItem("@inventory");
    return inventoryString ? JSON.parse(inventoryString) : [];
  } catch (e) {
    console.error("Error loading inventory:", e);
    return [];
  }
};
