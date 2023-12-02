import { FlatList, View } from "react-native";
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
  const [marker_data, set_marker_data] = useState(null)
  const[initial, set_initial] = useState(true)
  const[markers, set_markers] = useState(null)
  // const mapRef = useRef(null)
  const [center, set_center] = useState({
    latitude: 37.8715,
    longitude: -122.2730,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  })

  const doubleBounds = (boundary, scope) => {
    const x1 = boundary["southWest"]["latitude"]
    const y1 = boundary["southWest"]["longitude"]
    const x2 = boundary["northEast"]["latitude"]
    const y2 = boundary["northEast"]["longitude"]

    const length = x2 - x1
    const height = y2 - y1

    const bounds =  [
      x2 + (scope * length),
      y2 + (scope * height),
      x1 - (scope * length),
      y1 - (scope * height)
    ]
    return bounds
  }

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
        .then((boundary) => {
          // console.log(boundaries)
          const list_store_boundary = doubleBounds(boundary, 0)
          const marker_store_boundary = doubleBounds(boundary, 4)

          get_stores_in_boundary(
            list_store_boundary[0],
            list_store_boundary[1],
            list_store_boundary[2],
            list_store_boundary[3])
            .then((data) => {

              // console.log("Length of list_store", Object.keys(JSON.parse(data)).length)

              set_list_data(JSON.parse(data))

              get_stores_in_boundary(
                marker_store_boundary[0],
                marker_store_boundary[1],
                marker_store_boundary[2],
                marker_store_boundary[3]
              )
                .then((marker_data_p) => {

                  set_marker_data(JSON.parse(marker_data_p))
                  create_store_markers()
                })




            })
        })
    }
  }

  const create_store_markers = () => {

    let updated_markers = marker_data.map((shop, index) => {

      return <Marker
        key={shop._id}
        coordinate={{"latitude": shop.location.geometry.coordinates[1], "longitude":shop.location.geometry.coordinates[0]}}
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
            {markers}

          </MapView>




        </View>
        <View flex={3}>
        <View paddingTop={0}>
          <FlatList
            data={list_data}
            renderItem={({ item }) => (
              <ListItem
                key = {item._id}
                name={item.name}
                rating={item.rating}
                category={item.category}
                phone_number={item.number}
                cost={item.cost}
                distance={item.distance}
                description={item.description}
                navigation={navigation}
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
