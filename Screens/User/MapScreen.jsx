import { View, Text, StyleSheet, Button, TouchableOpacity, FlatList } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Feather';
import { MainText, TabBar } from "../../Components";
import { get_all_stores, get_stores_in_boundary } from "../../API";
import { ListItem } from "../../Components/List";
import { Title } from "../../Components/Title/title";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { MAPSTYLE } from "../../Constants";




const MapScreen = ({ navigation }) => {

  const [list_data, set_list_data] = useState(null)
  const [mapRef, set_mapRef] = useState(null)
  let intial = true
  // const mapRef = useRef(null)
  const [center, set_center] = useState({
    latitude: 37.8715,
    longitude: -122.2730,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  })

  const regionChange = (region) => {
    set_center(region)
    get_store_markers()
    console.log("This is the center", center)
  }

  const get_store_markers = () => {
    if (intial === true) {
      get_all_stores()
        .then((data) => {
          set_list_data(JSON.parse(data))
        })
    }
    if (intial === false) {
      let boundaries = mapRef
        .getMapBoundaries()
        .then((boundaries) => {
          console.log(boundaries)
          get_stores_in_boundary(
            boundaries["northEast"]["latitude"],
            boundaries["northEast"]["longitude"],
            boundaries["southWest"]["latitude"],
            boundaries["southWest"]["longitude"])
            .then((data) => {
              console.log("THIS IS DATAASDFSDF", Object.keys(data).length)
              intial = false
              set_list_data(JSON.parse(data))

            })
        })
    }
  }


  // if (mounted === false) {
  //   useEffect(() => {
  //     let mounted = true;
  //     get_all_stores()
  //       .then((data) => {
  //         if (mounted) {
  //           set_list_data(JSON.parse(data))
  //         }
  //       })
  //   }, [])
  // }




    return (
      <View flex={1}>

        <Title text={"Marketplace"} />
        <View flex={2}>




          <MapView
            customMapStyle={MAPSTYLE}
            provider={PROVIDER_GOOGLE}
            ref={(ref) => (set_mapRef(ref))}
            style={{flex: 1}}
            region={center}
            onRegionChangeComplete={regionChange}
          >
            <Marker
              key={1}
              coordinate={{latitude: center["latitude"], longitude: center["longitude"]}}
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
            keyExtractor={(item, index) => {
              return index.toString();
            }}
            renderItem={({ item, index }) => (
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
          />
        </View>
        </View>
        <TabBar navigation={navigation} />
      </View>




    );
  };

export default MapScreen;
