


import { ActivityIndicator, FlatList, Text, View, StyleSheet, Dimensions, Image, ScrollView } from "react-native";
import { MainText, TabBar } from "../../Components";
import { Title } from "../../Components/Title/title";
import React, { useEffect, useState } from "react";
import { ListProduct } from "../../Components/List/ListProduct";
import { ListItem } from "../../Components/List";
import { get_product_for_shop } from "../../API";

import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset
} from 'react-native-reanimated';



const { width } = Dimensions.get('window');
const IMG_HEIGHT = 300;

const ProductScreen = ({route, navigation}) => {
  const [products, set_products] = useState([])
  const { shop } = route.params
  const [isLoading, setIsLoading] = useState(true);
  const scrollRef = useAnimatedRef();
  const scrollOffset = useScrollViewOffset(scrollRef);

  const imageAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [-IMG_HEIGHT, 0, IMG_HEIGHT],
            [-IMG_HEIGHT / 2, 0, IMG_HEIGHT * 0.75]
          )
        },
        {
          scale: interpolate(scrollOffset.value, [-IMG_HEIGHT, 0, IMG_HEIGHT], [2, 1, 1])
        }
      ]
    };
  });


  useEffect(() => {
    get_product_for_shop(shop._id)
      .then((data) => {

        set_products(data)
        setIsLoading(false)
      })
  }, []);

    return (
      <View style={styles.container}>
        <Animated.ScrollView ref={scrollRef} scrollEventThrottle={16}>
          <Animated.Image
            source={{
              uri: "https://reactjs.org/logo-og.png"
            }}
            style={[styles.image, imageAnimatedStyle]}
            onError={(e) => console.log(e.nativeEvent.error)}
          />
          <View style={{ height: 2000, backgroundColor: '#fff' }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginTop: 20 }}>
              Parallax Scroll
            </Text>
          </View>
        </Animated.ScrollView>
      </View>
    )
}

// const styles = StyleSheet.create({
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// })

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  image: {
    width: width,
    height: IMG_HEIGHT
  }
});

export default ProductScreen;

