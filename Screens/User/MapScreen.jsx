import { View, Text, StyleSheet, Button, TouchableOpacity, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Feather';
import { MainText, TabBar } from "../../Components";
import { get_all_stores } from "../../API";
import { ListItem } from "../../Components/List";
import { Title } from "../../Components/Title/title";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { MAPSTYLE } from "../../Constants";


const stuff = (region) => {
  console.log(region)
}
const MapScreen = ({ navigation }) => {

  const [list_data, set_list_data] = useState(null)

  useEffect(() => {
    let mounted = true;
    get_all_stores()
      .then((data) => {
        if (mounted) {
          set_list_data(JSON.parse(data))
        }
      })
    return () => {
      mounted = false;
    }
  }, [])


  if (list_data != null) {
    return (
      <View flex={1}>

        <Title text={"Marketplace"} />
        <View flex={2}>
          <MapView
            customMapStyle={MAPSTYLE}
            provider={PROVIDER_GOOGLE}
            style={{flex: 1}}
            region={{
              latitude: 37.8715,
              longitude: -122.2730,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421
            }}
            onRegionChangeComplete={
            stuff
            }
          >
            <Marker
              key={1}
              coordinate={{latitude: 37.8715, longitude: -122.2730}}
              title={"Pin"}
              description={"Desc"}
              pinColor={"#00FFFF"}
            />
          </MapView>
        </View>
        <View flex={3}>
        <View paddingTop={0}>
          <FlatList
            data={list_data}
            renderItem={({ item }) => (
              <ListItem
                name={item.name}
                rating={item.rating}
                category={item.category}
                phone_number={item.number}
                cost={item.cost}
                distance={item.distance}
                description={item.description}
              />
            )}
            keyExtractor={item => item.id}
          />
        </View>
        </View>

        <TabBar navigation={navigation} />
      </View>
    );
  };
}

const styles = StyleSheet.create({
  map: {

  }

})




export default MapScreen;
