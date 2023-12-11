import { FlatList, View } from "react-native";
import React, { useEffect, useState } from "react";
import { TabBar } from "../../Components";
import { get_all_stores, get_stores_in_boundary } from "../../API";
import { ListItem } from "../../Components/List";
import { Title } from "../../Components/Title/title";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { MAPSTYLE } from "../../Constants";
import { scaleBounds } from "../../Services/Utils";


const MapScreen = ({ navigation }) => {
  const [bounds, set_bounds] = useState({
    "northEast": { "latitude": 37.9176, "longitude": -122.25195 },
    "southWest": { "latitude": 37.825399999999995, "longitude": -122.29405 }
  })
  let initial = true
  const [shops_in_list, set_shops_in_list] = useState(null)
  const [mapRef, set_mapRef] = useState([])
  const [shops_in_markers, set_shops_in_markers] = useState([])
  const [list_bounds, set_list_bounds] = useState(bounds)
  const [marker_bounds, set_marker_bounds] = useState(scaleBounds(list_bounds, 4))
  const [markers, set_markers] = useState(null)
  const [center, set_center] = useState({
    latitude: 37.8715,
    longitude: -122.2730,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  })
  const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

  useEffect(() => {
    console.log("Updated shops in list:", shops_in_list);
  }, [shops_in_list]);

  const updateMapRef = new Promise((resolve, reject) => {

    if (initial === true) {

      resolve(bounds)
    } else {
      resolve(mapRef.getMapBoundaries())
    }
  })

  const updateRegionStateVars = () => {
    console.log("1")

    mapRef.getMapBoundaries()
      .then((bounds) => {
        console.log("2")
        set_list_bounds(bounds)
        set_marker_bounds(scaleBounds(bounds, 4))

        get_stores_in_boundary(list_bounds)
          .then((data) => {
            console.log("3")
            set_shops_in_list(JSON.parse(data))

            get_stores_in_boundary(marker_bounds)
              .then((data) => {
                data = JSON.parse(data)
                console.log("4")
                // console.log("slfjldsf", data)
                set_shops_in_markers(data)

                if (initial === true) {
                  console.log("5")
                  initial = false
                }


              })

          })
      })

  }


  const create_store_markers = () => {
    console.log("slfjldsf-skjfnsjfd", shops_in_markers)
    let updated_markers = shops_in_markers.map((shop) => {

      return <Marker
        key={shop._id}
        coordinate={{
          "latitude": shop.location.geometry.coordinates[1],
          "longitude": shop.location.geometry.coordinates[0]
        }}
        title={"HI"}
        description={"DESC"}
      />
    })

    set_markers(updated_markers)
  }

    console.log("6")

    return (
      <View flex={1}>

        <Title text={"Marketplace"} />
        <View flex={2}>

          <MapView
            customMapStyle={MAPSTYLE}
            provider={PROVIDER_GOOGLE}
            ref={(ref) => (set_mapRef(ref))}
            style={{ flex: 1 }}
            region={center}
            onRegionChangeComplete={updateRegionStateVars}
          >
            {shops_in_markers.map((shop) => {

              return <Marker
                key={shop._id}
                coordinate={{
                  "latitude": shop.location.geometry.coordinates[1],
                  "longitude": shop.location.geometry.coordinates[0]
                }}
                title={"HI"}
                description={"DESC"}
              />
            })}

          </MapView>


        </View>
        <View flex={3}>
          <View paddingTop={0}>
            <FlatList
              keyExtractor={(item) => item._id.toString()}
              data={shops_in_list}
              renderItem={({ item: shop }) => (
                <ListItem
                  name={shop.name}
                  rating={shop.rating}
                  category={shop.category}
                  phone_number={shop.number}
                  cost={shop.cost}
                  distance={shop.distance}
                  description={shop.description}
                  navigation={navigation}
                  shop={shop}
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
