import { View, Text, StyleSheet, Button, TouchableOpacity } from "react-native";
import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Feather';
import { MainText, TabBar } from "../../Components";

const MapScreen = ({ navigation }) => {

    return (
      <View flex={1}>
        <MainText text="Map Screen"/>
        <TabBar navigation={ navigation }/>
      </View>

    );
};


export default MapScreen;
