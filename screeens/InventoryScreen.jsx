import React, { useEffect, useRef, useState } from "react";
import {
  View,
  FlatList,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";

import RBSheet from "react-native-raw-bottom-sheet";
import { useSelector, useDispatch } from "react-redux";
import { setItems } from "../redux/inventorySlice";
import {
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import AccordionCard from "@/components/AccordionCard";

const InventoryScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.inventory.items);
  const user = useSelector((state) => state.auth.user);

  const [nameFilter, setNameFilter] = useState("");
  const [ownerFilter, setOwnerFilter] = useState("");
  const [minQuantity, setMinQuantity] = useState("");
  const [maxQuantity, setMaxQuantity] = useState("");

  useEffect(() => {
    // Fetch items from API or load from local storage
    const mockItems = [
      {
        id: "1",
        name: "Electronics",
        quantity: 10,
        location: "Japan",
        owner: "Mr Tunde",
      },
      {
        id: "2",
        name: "Clothes",
        quantity: 20,
        location: "Dubai",
        owner: "Mr Philps",
      },
      // Add more mock items...
    ];
    dispatch(setItems(mockItems));
  }, []);

  const refRBSheet = useRef(null);

  const filteredItems = items.filter((item) => {
    const nameMatch = item.name
      .toLowerCase()
      .includes(nameFilter.toLowerCase());
    const ownerMatch = item.owner
      .toLowerCase()
      .includes(ownerFilter.toLowerCase());
    const quantityMatch =
      (minQuantity === "" || item.quantity >= parseInt(minQuantity)) &&
      (maxQuantity === "" || item.quantity <= parseInt(maxQuantity));
    return nameMatch && ownerMatch && quantityMatch;
  });

  const renderItem = ({ item }) => (
    <ScrollView style={{ paddingVertical: 8 }}>
      <AccordionCard item={item} navigation={navigation} />
    </ScrollView>
  );

  return (
    <View style={styles.container}>
      <View
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexDirection: "row",
        }}
      >
        <View>
          <Image
            style={{
              height: 40,
              width: 40,
              borderRadius: 99,
              alignSelf: "center",
            }}
            source={require("../assets/images/Face.png")}
            resizeMode="contain"
          />
        </View>
        <View>
          <Image
            style={{
              height: 16,
              width: 92,
              alignSelf: "center",
            }}
            source={require("../assets/images/Logo2.png")}
            resizeMode="contain"
          />
        </View>
        <View>
          <Image
            style={{
              height: 40,
              width: 40,
              alignSelf: "center",
            }}
            source={require("../assets/images/bell.png")}
            resizeMode="contain"
          />
        </View>
      </View>
      <View style={{ paddingTop: 12, gap: 6, paddingBottom: 12 }}>
        <Text style={{ fontSize: 28, fontWeight: "500" }}>
          Hello {user.role === "manager" ? "Manager" : "Staff"}
        </Text>
      </View>

      {/* Filter */}

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingTop: 14,
        }}
      >
        <TouchableOpacity
          onPress={() => refRBSheet.current?.open()}
          style={{
            backgroundColor: "#F4F2F8",
            height: 44,
            borderRadius: 5,
            width: "45%",

            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Ionicons name="filter-outline" size={24} color="#58536E" />
            <Text
              style={{
                color: "#58536E",
                fontSize: 16,
                marginLeft: 10,
              }}
            >
              Filters
            </Text>
          </View>
        </TouchableOpacity>
        {user.role === "manager" && (
          <TouchableOpacity
            style={{
              backgroundColor: "#007AFF", // blue color
              height: 44,
              borderRadius: 5,
              width: "45%",
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={() => navigation.navigate("AddItem")}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",

                justifyContent: "center",
              }}
            >
              <MaterialCommunityIcons name="line-scan" size={24} color="#fff" />
              <Text
                style={{
                  color: "#fff",
                  fontSize: 16,
                  marginLeft: 10,
                }}
              >
                Add Item
              </Text>
            </View>
          </TouchableOpacity>
        )}
      </View>

      {/* BottomSheet */}
      <RBSheet
        ref={refRBSheet}
        height={250}
        closeOnPressMask={true}
        customStyles={{
          wrapper: {
            backgroundColor: "rgba(0,0,0,0.5)",
          },
          container: {
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
          },
          draggableIcon: {
            backgroundColor: "#000",
          },
        }}
      >
        <View style={styles.sheetHeader}>
          <TouchableOpacity onPress={() => refRBSheet.current?.close()}>
            <Text style={styles.cancelButton}>Cancel</Text>
          </TouchableOpacity>
          <Text style={{ fontSize: 18, fontWeight: "700" }}>Filters</Text>
          <TouchableOpacity onPress={() => refRBSheet.current?.close()}>
            <Text style={styles.doneButton}>Done</Text>
          </TouchableOpacity>
        </View>

        <Text style={{ color: "#58536e", paddingHorizontal: 16 }}>STATUS</Text>
        <View style={{ padding: 12 }}>
          <View style={{ gap: 3 }}>
            <View
              style={{
                backgroundColor: "#F4F2F8",
                flexDirection: "row",
                alignItems: "center",
                height: 44,
                paddingHorizontal: 12,
                borderRadius: 10,
              }}
            >
              <FontAwesome name="search" size={24} color="#A7A3B3" />
              <TextInput
                placeholder="Filter by Name"
                style={{
                  flex: 1,
                  padding: 10,
                  fontSize: 16,
                  color: "",
                }}
                value={nameFilter}
                onChangeText={setNameFilter}
              />
            </View>

            <View
              style={{
                backgroundColor: "#F4F2F8",
                flexDirection: "row",
                alignItems: "center",
                height: 44,
                paddingHorizontal: 12,
                borderRadius: 10,
              }}
            >
              <FontAwesome name="search" size={24} color="#A7A3B3" />
              <TextInput
                placeholder="Filter by Owner"
                style={{
                  flex: 1,
                  padding: 10,
                  fontSize: 16,
                  color: "",
                }}
                value={ownerFilter}
                onChangeText={setOwnerFilter}
              />
            </View>

            <View style={styles.quantityFilterContainer}>
              <TextInput
                style={{
                  backgroundColor: "#F4F2F8",
                  flexDirection: "row",
                  alignItems: "center",
                  height: 44,
                  paddingHorizontal: 12,
                  borderRadius: 10,
                }}
                placeholder="Min Quantity"
                value={minQuantity}
                onChangeText={setMinQuantity}
                keyboardType="numeric"
              />
              <TextInput
                style={{
                  backgroundColor: "#F4F2F8",
                  flexDirection: "row",
                  alignItems: "center",
                  height: 44,
                  paddingHorizontal: 12,
                  borderRadius: 10,
                }}
                placeholder="Max Quantity"
                value={maxQuantity}
                onChangeText={setMaxQuantity}
                keyboardType="numeric"
              />
            </View>
          </View>
        </View>
      </RBSheet>

      <FlatList
        data={filteredItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//   },
//   greeting: {
//     fontSize: 24,
//     fontWeight: "bold",
//     marginBottom: 16,
//   },
//   filtersContainer: {
//     marginBottom: 16,
//   },
//   input: {
//     height: 40,
//     borderColor: "gray",
//     borderWidth: 1,
//     marginBottom: 8,
//     paddingHorizontal: 8,
//   },
//   quantityFilterContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//   },
//   quantityInput: {
//     flex: 1,
//     marginRight: 8,
//   },
//   itemContainer: {
//     marginBottom: 16,
//     padding: 8,
//     borderWidth: 1,
//     borderColor: "gray",
//   },
// });

const styles = StyleSheet.create({
  container: {
    height: "100%",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "white",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
  },

  sheetHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomColor: "#Eae7f2",
    borderBottomWidth: 1,
    marginBottom: 12,
  },
  cancelButton: {
    color: "#2f50c1",
    fontSize: 16,
  },
  doneButton: {
    color: "#2f50c1",
    fontSize: 16,
  },
  buttonsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    paddingHorizontal: 10,
    marginTop: 10,
  },
  quantityFilterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  statusButton: {
    paddingHorizontal: 15,
    height: 40,
    backgroundColor: "#f4f2f8",
    borderRadius: 10,
    margin: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  selectedButton: {
    borderColor: "#007AFF",
    borderWidth: 2,
  },
  buttonText: {
    color: "#000",
  },
});

export default InventoryScreen;
