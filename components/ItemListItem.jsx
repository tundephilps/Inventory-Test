import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const ItemListItem = ({ item, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <Text style={styles.name}>{item.name}</Text>
        <Text>Quantity: {item.quantity}</Text>
        <Text>Location: {item.location}</Text>
        <Text>Owner: {item.owner}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
});

export default ItemListItem;
