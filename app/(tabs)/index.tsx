import Login from "@/screeens/Login";
import { StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SplashScreen from "@/screeens/SplashScreen";
import InventoryScreen from "@/screeens/InventoryScreen";
import ItemDetailScreen from "@/screeens/ItemDetailScreen";
import AddItemScreen from "@/screeens/AddItemsScreen";
import { Provider } from "react-redux";
import store from "../../redux/store";

type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  Homepage: undefined;
  Inventory: undefined;
  ItemDetail: undefined;
  AddItem: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function HomeScreen() {
  return (
    <Provider store={store}>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Inventory" component={InventoryScreen} />
        <Stack.Screen name="ItemDetail" component={ItemDetailScreen} />
        <Stack.Screen name="AddItem" component={AddItemScreen} />
      </Stack.Navigator>
    </Provider>
  );
}

const styles = StyleSheet.create({});
