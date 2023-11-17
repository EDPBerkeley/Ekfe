import { View, Text, StyleSheet, Button, TouchableOpacity } from "react-native";
import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome'


const TabBar = ({navigation}) => {
  return (
      <View style={styles.buttonTabBar}>
        <TabIcon icon="Ionicons" icon_name="globe-outline" description="Marketplace" onPress={() => navigation.navigate("MapScreen")} />
        <TabIcon icon="Ionicons" icon_name="clipboard-outline" description="Storefront" onPress={() => navigation.navigate("StorefrontScreen")} />
        <TabIcon icon="FontAwesome" icon_name="bars" description={"Settings"} onPress={() => navigation.navigate("SettingUserScreen")} />
      </View>
  )
}
const TabIcon = ({ icon, icon_name, onPress, description }) => {

  const SelectedIcon = IconWrapper[icon]

  return (
    <TouchableOpacity style={styles.iconGroup} onPress={onPress}>
      <SelectedIcon name={icon_name} size={30} color='#FFFFFF'/>
      <Text style={styles.text}>{description}</Text>
    </TouchableOpacity>
  );
};

const IconWrapper = {
  Feather,
  Ionicons,
  FontAwesome
}

const styles = StyleSheet.create({
  buttonTabBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 10,
    paddingTop: 10,
    paddingLeft: 35,
    paddingRight: 35,
    backgroundColor: '#8E0000',
    height: 60
  },
  icon: {
    color: '#FFFFFF'
  },
  iconGroup: {
    alignItems: 'center'
  },
  text: {
    fontSize: 10,
    color: '#FFFFFF',
    paddingTop: 2
  }
});

export {TabBar, TabIcon};