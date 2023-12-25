// In App.js in a new project

import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  MapScreen,
  CheckoutScreen,
  ProductScreen,
  SettingUserScreen
} from './Screens/User';
import {
  AllProductScreen,
  NewProductScreen,
  WarehouseScreen,
  SettingBusinessScreen,
  StorefrontScreen,
  ProductDataScreen,
  OverviewScreen
} from './Screens/Business'

import { LogBox } from 'react-native';

const Stack = createNativeStackNavigator();
LogBox.ignoreLogs(["Warning: Each child in a list should have a unique \"key\" prop."]);
function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="StorefrontScreen">
        <Stack.Screen name="MapScreen" component={MapScreen} options={{ headerShown: false, animation: "none"  }}/>
        <Stack.Screen name="CheckoutScreen" component={CheckoutScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="ProductScreen" component={ProductScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="StorefrontScreen" component={StorefrontScreen} options={{ headerShown: false, animation: "none"  }}/>
        <Stack.Screen name="AllProductScreen" component={AllProductScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="NewProductScreen" component={NewProductScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="WarehouseScrren" component={WarehouseScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="SettingUserScreen" component={SettingUserScreen} options={{ headerShown: false, animation: "none"  }}/>
        <Stack.Screen name='SettingBusinessScreen' component={SettingBusinessScreen} options={{ headerShown: false}}/>
        <Stack.Screen name={"ProductDataScreen"} component={ProductDataScreen} options={{headerShown: false}}/>
        <Stack.Screen name={"OverviewScreen"} component={OverviewScreen} options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;
