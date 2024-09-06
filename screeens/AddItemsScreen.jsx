import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  Text,
  TouchableOpacity,
} from "react-native";
import { useDispatch } from "react-redux";
import { addItem } from "../redux/inventorySlice";
import { FontAwesome } from "@expo/vector-icons";

const AddItemScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [location, setLocation] = useState("");
  const [owner, setOwner] = useState("");

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

  const handleAddItem = () => {
    if (validateInputs()) {
      const newItem = {
        id: Date.now().toString(),
        name,
        quantity: parseInt(quantity),
        location,
        owner,
      };

      dispatch(addItem(newItem));
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <FontAwesome
          name="arrow-circle-left"
          style={{ fontSize: 35, paddingVertical: 8 }}
        />
      </TouchableOpacity>
      <Text style={styles.label}>Item Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Add Item Name"
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.label}>Quantity</Text>
      <TextInput
        style={styles.input}
        placeholder="Amt in numbers"
        value={quantity}
        onChangeText={setQuantity}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Location</Text>
      <TextInput
        style={styles.input}
        placeholder="Shelf A3"
        value={location}
        onChangeText={setLocation}
      />

      <Text style={styles.label}>Owner</Text>
      <TextInput
        style={styles.input}
        placeholder="Owner's name"
        value={owner}
        onChangeText={setOwner}
      />
      <TouchableOpacity style={styles.loginButton} onPress={handleAddItem}>
        <Text style={styles.loginButtonText}>Add Item</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "white",
  },
  input: {
    height: 56,
    backgroundColor: "#f4f2f8",

    borderRadius: 8,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
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

export default AddItemScreen;
