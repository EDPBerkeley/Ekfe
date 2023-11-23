import { View, Text, StyleSheet, Button, TouchableOpacity } from "react-native";
import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Feather';
import { MainText, TabBar } from "../../Components";
import { get_all_stores } from "../../API";
import { ListItem } from "../../Components/List";
import { Title } from "../../Components/Title/title";

const MapScreen = ({ navigation }) => {


  get_all_stores()

  return (
    <View flex={1}>
      <Title text={"Marketplace"}/>
      <ListItem
        name={"The Cool Store"}
        rating={5}
        category={3}
        phone_number={"240-550-1099"}
        cost={2}
        distance={5}
        description={"Guess mother serious down wrong. Manager door her particular. Adult resource use indeed white trip only always. Final financial after."}
      />
      <TabBar navigation={ navigation }/>
    </View>
  );
};


export default MapScreen;
