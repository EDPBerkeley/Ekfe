import { ActivityIndicator, Dimensions, StyleSheet, Text, View, Image, FlatList } from "react-native";
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset
} from 'react-native-reanimated';
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SCREEN_WIDTH } from "../../Constants/constants";
import { useEffect, useState } from "react";
import { get_product_for_shop } from "../../API";
import { TabBar } from "../../Components";
import { ListProduct } from "../../Components/List/ListProduct";


const ListProductHorizontal = ({name, price, images}) => {

  return (
    <View style={horizontal_product_styles.container}>
      <View style={horizontal_product_styles.image_container}>
        <Image source={{ uri: `data:image/png;base64,${images[0].element}` }}  style={horizontal_product_styles.image} />
      </View>

      <View style={horizontal_product_styles.name_container}>
        <Text style={horizontal_product_styles.name_text}> {name} </Text>
      </View>

      <View style={horizontal_product_styles.price_container}>
        <Text style={horizontal_product_styles.price_text}> {price} </Text>
      </View>

    </View>
  )
}


const CONTAINER_WIDTH = 120;
const horizontal_product_styles = StyleSheet.create({
  container: {
    marginRight: 20,
    backgroundColor: "#F5F5F5",
    borderRadius: 5
  },
  image_container: {

  },
  image: {
    width: CONTAINER_WIDTH,
    height: 120,
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
  },
  name_container: {
    paddingLeft: 5,
    paddingTop: 5,
    width: CONTAINER_WIDTH
  },
  name_text: {
    fontFamily: "Roboto-Medium",
    fontSize: 12

  },
  price_container: {
    paddingLeft: 5,
    paddingTop: 2

  },
  price_text: {
    fontSize: 10


  }
})

export { ListProductHorizontal };
