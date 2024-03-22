import { FlatList, View, StyleSheet, Text, ScrollView, LogBox, Image } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { TabBar } from "../../Components";
import { get_all_stores, get_stores_in_boundary } from "../../API";
import { ListItem } from "../../Components/List";
import { Title } from "../../Components/Title/title";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { MAPSTYLE } from "../../Constants";
import { parseJSON, parseJsonRecursively, scaleBounds } from "../../Services/Utils";
import { ListShopLandingHorizontal } from "../../Components/List/ListShopLandingHorizontal";
import { ListShopLandingVertical } from "../../Components/List/ListShopLandingVertical";
import { ListShopLandingHorizontalLoading } from "../../Components/List/ListShopLandingHorizontalLoading";
import { ListShopLandingVerticalLoading } from "../../Components/List/ListShopLandingVerticalLoading";


const MapScreen = ({ navigation }) => {
  const [shops_in_list, set_shops_in_list] = useState([])
  const [mapRef, set_mapRef] = useState(null)
  const [shops_in_markers, set_shops_in_markers] = useState([])
  const [bounds, set_bounds] = useState({
    "northEast": { "latitude": 37.9176, "longitude": -122.25195 },
    "southWest": { "latitude": 37.825399999999995, "longitude": -122.29405 }
  })
  const scaled_bounds = scaleBounds(bounds, 4)
  const center = {
    latitude: 37.8715,
    longitude: -122.2730,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  }
  const [isLoading, set_isLoading] = useState(true)
  const dataArray = Array.from({ length: 10 }, (_, index) => ({
    id: index.toString(), // Ensure a unique key by using the index
    // Any other data you might want to use for each item
  }));
  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, [])
  useLayoutEffect(() => {
    updateRegionStateVars().then(
      // set_isLoading(false)
      setTimeout(() => set_isLoading(false), 1000)
    ).catch((error) => {
      throw error
    })

  }, [])

  const shuffleArray = (array) => {
    let currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  const updateRegionStateVars = async () => {
    try {

      if (mapRef != null) {
        const bounds = await mapRef.getMapBoundaries();
        const scaled_bounds = scaleBounds(bounds, 4)
      }

      set_bounds(bounds);
      console.log("BOUNDS23", bounds)

      await Image.prefetch("https://reactjs.org/logo-og.png").then(console.log("LOADED"))

      const shopsListData = await get_stores_in_boundary(bounds);
      console.log("SHOPSHOPS", shopsListData)
      shopsListData !== null && set_shops_in_list(shopsListData);

      const shopsMarkerData = await get_stores_in_boundary(scaled_bounds);
      shopsMarkerData !== null && set_shops_in_markers(shopsMarkerData)



    } catch (error) {
      throw error
      // Handle the error appropriately here
    }
  };

  if (isLoading===true) {
    return (
      <View flex={1}>

        <Title text={"Marketplace"} />
        <View flex={1.4} style={{backgroundColor: 'grey'}}></View>

        <View flex={3}>

          <ScrollView>
            <View paddingTop={0}>

              <View style={styles.horizontal_list}>
                <Text style={styles.horizontal_list_title}>Recent</Text>

                <FlatList
                  keyExtractor={(item) => item.id.toString()}
                  data={dataArray}
                  renderItem={({ item: shop }) => (
                    <ListShopLandingHorizontalLoading/>
                  )}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                />
              </View>
              <View style={styles.horizontal_list}>
                <Text style={styles.horizontal_list_title}>Featured</Text>
                <FlatList
                  keyExtractor={(item) => item.id.toString()}
                  data={dataArray}
                  renderItem={({ item: shop }) => (
                    <ListShopLandingHorizontalLoading/>
                  )}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                />
              </View>

              <View style={styles.vertical_list}>
                <Text style={styles.vertical_list_title}>All Nearby</Text>
                <FlatList
                  keyExtractor={(item) => item.id.toString()}
                  data={dataArray}
                  renderItem={({ item: shop }) => (
                    <ListShopLandingVerticalLoading
                      name={shop.name}
                      rating={shop.rating}
                      category={shop.category}
                      distance={shop.distance}
                      navigation={navigation}
                      shop={shop}
                    />
                  )}
                />
              </View>

            </View>
          </ScrollView>

        </View>
        <TabBar navigation={navigation} />
      </View>
    )
  } else {
    return (
      <View flex={1}>

        <Title text={"Marketplace"} />
        <View flex={1.4}>

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
                key={shop.id}
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

          <ScrollView>
            <View paddingTop={0}>

              <View style={styles.horizontal_list}>
                <Text style={styles.horizontal_list_title}>Recent</Text>

                <FlatList
                  keyExtractor={(item) => item.id.toString()}
                  data={shops_in_list}
                  renderItem={({ item: shop }) => (
                    <ListShopLandingHorizontal
                      name={shop.name}
                      rating={shop.rating}
                      category={shop.category}
                      distance={shop.distance}
                      navigation={navigation}
                      shop={shop}
                    />
                  )}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                />
              </View>
              <View style={styles.horizontal_list}>
                <Text style={styles.horizontal_list_title}>Featured</Text>
                <FlatList
                  keyExtractor={(item) => item.id.toString()}
                  data={shops_in_list}
                  renderItem={({ item: shop }) => (
                    <ListShopLandingHorizontal
                      name={shop.name}
                      rating={shop.rating}
                      category={shop.category}
                      distance={shop.distance}
                      navigation={navigation}
                      shop={shop}
                    />
                  )}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                />
              </View>

              <View style={styles.vertical_list}>
                <Text style={styles.vertical_list_title}>All Nearby</Text>
                <FlatList
                  keyExtractor={(item) => item.id.toString()}
                  data={shops_in_list}
                  renderItem={({ item: shop }) => (
                    <ListShopLandingVertical
                      name={shop.name}
                      rating={shop.rating}
                      category={shop.category}
                      distance={shop.distance}
                      navigation={navigation}
                      shop={shop}
                    />
                  )}
                />
              </View>

            </View>
          </ScrollView>

        </View>
        <TabBar navigation={navigation} />
      </View>
    );
  }


  };


const styles = StyleSheet.create({
  horizontal_list: {
    paddingTop: 10,
    paddingLeft: 10,
  },
  vertical_list: {
    paddingTop: 20

  },
  horizontal_list_title: {
    fontFamily: 'Roboto-Wide',
    fontSize: 17,
    paddingBottom: 5,
    fontWeight: '700'
  },
  vertical_list_title: {
    fontFamily: 'Roboto-Wide',
    fontSize: 25,
    paddingBottom: 5,
    paddingLeft: 10,
    fontWeight: '700',
    marginBottom: -8
  }
})
export default MapScreen;
