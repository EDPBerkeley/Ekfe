import { FlatList, View, StyleSheet, Text, ScrollView, LogBox, Image, TextInput } from "react-native";
import React, { useCallback, useEffect, useLayoutEffect, useState } from "react";
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
import debounce from "@react-navigation/stack/src/utils/debounce";
import { get_shop_from_text_search } from "../../API/store";
import { MapScreenButtons } from "../../Components/Storefront/MapScreenButtons";


const MapScreen = ({ navigation }) => {
  const [shops_in_list, set_shops_in_list] = useState([])
  const [shops_in_search, set_shops_in_search] = useState([])
  const [mapRef, set_mapRef] = useState(null)
  const [shops_in_markers, set_shops_in_markers] = useState([])
  const [shops_promoted, set_shops_promoted] = useState([])
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
  const [query, setQuery] = useState('');
  const [map_button, set_map_button] = useState("clicked");
  const [item_button, set_item_button] = useState("not_clicked")
  // Debounce the onSearch function. Adjust the 300ms delay as needed.
  const debouncedSearch = useCallback(
    debounce((query) => {
      get_shop_from_text_search(query).then(shops => {
        set_shops_in_search(shops);
      });
    }, 300),
    []
  );

  // Effect to trigger the debounced search whenever the query changes.
  useEffect(() => {
    if (query.trim()) {
      debouncedSearch(query);
    }
  }, [query, debouncedSearch]);


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


  function SelectedContent () {

    if (map_button === "clicked" && isLoading === true) {
      return(
      <View flex={1}>
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
    } else if (map_button === "clicked" && isLoading === false) {
      return (
        <View flex={1}>
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
                    data={shops_in_markers}
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
                    data={shops_in_markers}
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
        </View>
      )
    } else if (item_button === "clicked") {
      return (
        <View flex={1} flexDirection={"column"}>

            <View style={styles.vertical_list_search}>
              <FlatList
                keyExtractor={(item) => item.id.toString()}
                data={shops_in_search}
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

            <View style={{height: 500, backgroundColor: "#8E0000"}}>
              <TextInput
                style={styles.input}
                placeholder="Search..."
                value={query}
                onChangeText={setQuery}
              />
            </View>

        </View>
      )
    }
  }

  const updateRegionStateVars = async () => {
    try {

      let bounds = null;
      if (mapRef != null) {
        bounds = await mapRef.getMapBoundaries();

      } else {
        bounds =  {
          "northEast": { "latitude": 37.9176, "longitude": -122.25195 },
          "southWest": { "latitude": 37.825399999999995, "longitude": -122.29405 }
        }
      }

      const scaled_bounds = scaleBounds(bounds, 4)

      await Image.prefetch("https://reactjs.org/logo-og.png")

      const shopsMarkerData = await get_stores_in_boundary(scaled_bounds);
      shopsMarkerData !== null && set_shops_in_markers(shopsMarkerData)


      const shopsListData = await get_stores_in_boundary(bounds);
      shopsListData !== null && set_shops_in_list(shopsListData);


    } catch (error) {
      throw error
    }
  };


  return (
      <View flex={1}>

        <Title text={"Marketplace"} />
        <MapScreenButtons
          navigation={navigation}
          map_button={map_button}
          set_map_button={set_map_button}
          item_button={item_button}
          set_item_button={set_item_button}
        />

        {SelectedContent()}

        <TabBar navigation={navigation} />
      </View>
    );



  };


const styles = StyleSheet.create({
  horizontal_list: {
    paddingTop: 10,
    paddingLeft: 10,
  },
  vertical_list: {
    paddingTop: 20

  },
  vertical_list_search: {
    paddingTop: 0,
    height: "80%"
  },
  horizontal_list_title: {
    fontFamily: 'Roboto-Wide',
    fontSize: 17,
    paddingBottom: 5
  },
  vertical_list_title: {
    fontFamily: 'Roboto-Wide',
    fontSize: 25,
    paddingBottom: 5,
    paddingLeft: 10,
    marginBottom: -8
  },
  input: {
    height: 40, // Set the height,
    marginTop: 15,
    marginHorizontal: 15, // Outer space,
    marginBottom: 5,
    // borderWidth: 1, // Border thickness
    padding: 10, // Inner space,
    paddingLeft: 30,
    // borderColor: 'gray', // Border color
    borderRadius: 20, // Rounded corners,
    backgroundColor: "#dadada",
    color: "#000000",

  }
})
export default MapScreen;
