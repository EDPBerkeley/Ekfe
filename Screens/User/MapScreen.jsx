import { View, FlatList, Text } from "react-native";
import React, { useState } from "react";
import { TabBar } from "../../Components";
import { get_all_stores, get_stores_in_boundary } from "../../API";
import { ListItem } from "../../Components/List";
import { Title } from "../../Components/Title/title";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { MAPSTYLE } from "../../Constants";




const MapScreen = ({ navigation }) => {

  const [list_data, set_list_data] = useState(null)
  const [mapRef, set_mapRef] = useState(null)
  const[initial, set_initial] = useState(true)
  const[markers, set_markers] = useState(null)
  // const mapRef = useRef(null)
  const [center, set_center] = useState({
    latitude: 37.8715,
    longitude: -122.2730,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  })

  const regionChange = (region) => {
    set_center(region)
    get_store_by_boundaries()
    // console.log("This is the center", center)
  }

  const get_store_by_boundaries = () => {
    if (initial === true) {
      get_all_stores()
        .then((data) => {
          set_list_data(JSON.parse(data))
          set_initial(false)
        })
    }
    if (initial === false) {
      let boundaries = mapRef
        .getMapBoundaries()
        .then((boundaries) => {
          // console.log(boundaries)
          get_stores_in_boundary(
            boundaries["northEast"]["latitude"],
            boundaries["northEast"]["longitude"],
            boundaries["southWest"]["latitude"],
            boundaries["southWest"]["longitude"])
            .then((data) => {

              set_list_data(JSON.parse(data))

              create_store_markers()


            })
        })
    }
  }

  const create_store_markers = () => {
    // console.log(list_data[0]["location"]["geometry"]["coordinates"])
    let updated_markers = list_data.map((marker, index) => {
      // console.log("THIS IS MARKER", marker["location"]["geometry"]["coordinates"])
      // return <Marker
      //   key={index}
      //   coordinate={marker["location"]["geometry"]["coordinates"]}
      //   title={marker["name"]}
      //   description={marker["description"]}
      // />
      return <Marker
        key={index}
        coordinate={{"latitude": marker.location.geometry.coordinates[1], "longitude":marker.location.geometry.coordinates[0]}}
        title={"HI"}
        description={"DESC"}
      />
    })

    set_markers(updated_markers)
  }


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
            {/*<Marker*/}
            {/*  key={1}*/}
            {/*  coordinate={{latitude: center["latitude"], longitude: center["longitude"]}}*/}
            {/*  title={"Pin"}*/}
            {/*  description={"Desc"}*/}
            {/*  pinColor={"#00FFFF"}*/}
            {/*/>*/}
            {markers}

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
