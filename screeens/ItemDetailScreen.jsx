import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { updateItem, deleteItem } from "../redux/inventorySlice";
import { FontAwesome } from "@expo/vector-icons";

import { useNavigation } from "@react-navigation/native";

const ItemDetailScreen = ({ route, navigation }) => {
  const { itemId } = route.params;
  const dispatch = useDispatch();
  const item = useSelector((state) =>
    state.inventory.items.find((item) => item.id === itemId)
  );
  const userRole = useSelector((state) => state.auth.user.role);

  const [name, setName] = useState(item.name);
  const [quantity, setQuantity] = useState(item.quantity.toString());
  const [location, setLocation] = useState(item.location);
  const [owner, setOwner] = useState(item.owner);

  const validateInputs = () => {
    if (!name || !quantity || !location || !owner) {
      Alert.alert("Error", "Please fill in all fields");
      return false;
    }

    const quantityNum = parseInt(quantity);
    if (isNaN(quantityNum) || quantityNum <= 0) {
      Alert.alert("Error", "Quantity must be a positive number");
      return false;
    }

    return true;
  };

  const handleUpdate = () => {
    if (validateInputs()) {
      const updatedItem = {
        ...item,
        name,
        quantity: parseInt(quantity),
        location,
        owner,
      };
      dispatch(updateItem(updatedItem));
      navigation.goBack();
    }
  };

  const handleDelete = () => {
    dispatch(deleteItem(itemId));
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <FontAwesome
          name="arrow-circle-left"
          style={{ fontSize: 35, paddingVertical: 8 }}
        />
      </TouchableOpacity>
      <Text style={styles.label}>Name:</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        editable={userRole === "manager"}
      />
      <Text style={styles.label}>Quantity:</Text>
      <TextInput
        style={styles.input}
        value={quantity}
        onChangeText={setQuantity}
        keyboardType="numeric"
      />
      <Text style={styles.label}>Location:</Text>
      <TextInput
        style={styles.input}
        value={location}
        onChangeText={setLocation}
        editable={userRole === "manager"}
      />
      <Text style={styles.label}>Owner:</Text>
      <TextInput
        style={styles.input}
        value={owner}
        onChangeText={setOwner}
        editable={userRole === "manager"}
      />
      <TouchableOpacity onPress={handleUpdate} style={styles.loginButton}>
        <Text style={styles.loginButtonText}>Update Item</Text>
      </TouchableOpacity>
      {userRole === "manager" && (
        <Button title="Delete Item" onPress={handleDelete} color="red" />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "white",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  input: {
    height: 56,
    backgroundColor: "#f4f2f8",

    borderRadius: 8,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  inputFocused: {
    borderColor: "#2f50c1", // Blue border color when
    borderWidth: 1,
    color: "#2f50c1", // Blue text color when focused
  },
  loginButton: {
    backgroundColor: "#2f50c1",
    height: 56,
    borderRadius: 8,
    alignItems: "center",
    top: "25%",
    justifyContent: "center",
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
});

export default ItemDetailScreen;
