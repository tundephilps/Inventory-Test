import React, { useState, useRef } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Animated,
  StyleSheet,
} from "react-native";
import { AntDesign, Ionicons, FontAwesome } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";

const AccordionCard = ({ navigation, item }) => {
  const [isChecked, setChecked] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const animation = useRef(new Animated.Value(0)).current;

  const toggleAccordion = () => {
    if (isOpen) {
      Animated.timing(animation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(animation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
    setIsOpen(!isOpen);
  };

  const animatedHeight = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 120], // Adjust this value based on your details view height
  });

  return (
    <TouchableOpacity style={styles.cardContainer} onPress={toggleAccordion}>
      <View style={styles.header}>
        <Checkbox
          value={isChecked}
          onValueChange={setChecked}
          color={isChecked ? "#4630EB" : undefined}
        />
        <Image
          style={styles.image}
          source={require("../assets/images/box.png")}
          resizeMode="contain"
        />
        <View>
          <Text>{item.name}</Text>
          <Text style={styles.awbNumber}>{item.quantity}</Text>
          <Text style={styles.route}>
            {item.location}
            <AntDesign name="arrowright" size={14} color="blue" />
            {item.owner}
          </Text>
        </View>
        <View style={styles.statusContainer}>
          <Text style={styles.statusText}>RECEIVED</Text>
        </View>
        <TouchableOpacity
          style={[
            styles.arrowContainer,
            isOpen && styles.arrowContainerActive, // Apply active styles if open
          ]}
          onPress={toggleAccordion}
        >
          <AntDesign
            name="arrowsalt" // Icon stays the same
            size={14}
            color={isOpen ? "white" : "blue"} // Change icon color based on state
          />
        </TouchableOpacity>
      </View>
      {/* Animated Details */}
      <Animated.View style={[styles.details, { height: animatedHeight }]}>
        <View style={styles.detailsRow}>
          <View>
            <Text style={styles.detailLabel}>Origin</Text>
            <Text style={styles.detailValue}>{item.location} </Text>
          </View>
          <AntDesign name="arrowright" size={24} color="blue" />
          <View>
            <Text style={styles.detailLabel}>Destination</Text>
            <Text style={styles.detailValue}>{item.owner}</Text>
          </View>
        </View>
        {/* Contacts */}
        <View style={styles.contactsContainer}>
          <TouchableOpacity style={styles.callButton}>
            <View style={styles.buttonContent}>
              <Ionicons name="call" size={24} color="#ffffff" />
              <Text style={styles.buttonText}>Call</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.whatsappButton}
            onPress={() =>
              navigation.navigate("ItemDetail", { itemId: item.id })
            }
          >
            <View style={styles.buttonContent}>
              <FontAwesome name="eye" size={24} color="#ffffff" />
              <Text style={styles.buttonText}>View Details</Text>
            </View>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    borderColor: "#2f50c1",
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 0,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#F4F2F8",
    padding: 12,
    borderRadius: 10,
  },
  image: {
    height: 40,
    width: 40,
  },
  awbNumber: {
    fontSize: 18,
    fontWeight: "600",
  },
  route: {
    color: "#757281",
  },
  statusContainer: {
    backgroundColor: "#d9e6fd",
    padding: 4,
    borderRadius: 4,
  },
  statusText: {
    color: "blue",
  },
  arrowContainer: {
    padding: 6,
    borderRadius: 50,
    backgroundColor: "white",
  },
  arrowContainerActive: {
    backgroundColor: "blue", // Change background color when active
  },
  details: {
    backgroundColor: "white",
    borderRadius: 10,
    paddingHorizontal: 12,

    overflow: "hidden",
  },
  detailsRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 8,
  },
  detailLabel: {
    fontSize: 11,
    color: "#2f50c1",
  },
  detailValue: {
    color: "black",
    fontSize: 16,
  },
  detailAddress: {
    color: "#58536e",
    fontSize: 13,
  },
  contactsContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingTop: 14,
    gap: 12,
  },
  callButton: {
    backgroundColor: "#6E91EC",
    height: 44,
    borderRadius: 10,
    width: "30%",
    alignItems: "center",
    justifyContent: "center",
  },
  whatsappButton: {
    backgroundColor: "#25d366",
    height: 44,
    borderRadius: 10,
    width: "45%",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    marginLeft: 10,
  },
});

export default AccordionCard;
