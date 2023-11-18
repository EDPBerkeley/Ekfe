import { View, Text, StyleSheet, Button, TouchableOpacity } from "react-native";
import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Feather';
import { MainText, TabBar } from "../../Components";
import { get_all_stores } from "../../API";
import { ListItem } from "../../Components/List";

const MapScreen = ({ navigation }) => {


  get_all_stores()

  return (
    <View flex={1}>
      <TabBar navigation={ navigation }/>
    </View>
  );
};


export default MapScreen;
