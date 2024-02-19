import {
  ActivityIndicator,
  FlatList,
  Text,
  View,
  StyleSheet,
  Dimensions,
  Image,
  ScrollView,
  Button, SafeAreaView,
} from "react-native";
import { MainText, TabBar } from "../../Components";
import { Title } from "../../Components/Title/title";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { ListProduct } from "../../Components/List/ListProduct";
import { ListItem } from "../../Components/List";
import { get_product_for_shop } from "../../API";

import Animated, {
  interpolate,
  useAnimatedRef, useAnimatedScrollHandler,
  useAnimatedStyle,
  useScrollViewOffset, useSharedValue,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";



const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window')
const IMG_HEIGHT = 300;

const ProductScreen = ({route, navigation}) => {
  const [products, set_products] = useState([])
  const { shop } = route.params
  const [isLoading, setIsLoading] = useState(true);
  const scrollRef = useAnimatedRef();
  const scrollOffset = useScrollViewOffset(scrollRef);
  const CustomHeader = ({ opacity }) => {
    console.log(opacity)
    return (
      <View style={[styles.header, { opacity }]}>
        <Text style={styles.headerText}>My Custom Header</Text>
      </View>
    );
  };


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

  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scrollOffset.value, [0, IMG_HEIGHT / 1.5], [0, 1])
    };
  });

  const Header = () => {
    const insets = useSafeAreaInsets();
    return (
      <Animated.View style={ [headerAnimatedStyle, styles3.container, {paddingTop: insets.top}] }>
        <Text style={styles3.text}>Product Screen</Text>
      </Animated.View>
    )
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTransparent: true,
      headerLeft: () => <View/>,
      headerTitle: '',
      headerBackground: () => <Header/>
    });
  }, [navigation]); // Re-run when navigation changes (though usually it doesn't)


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
          />
          <View style={{ height: height, backgroundColor: '#fff' }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginTop: 20 }}>
              Parallax Scroll
            </Text>

          </View>
        </Animated.ScrollView>

      </View>
    )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  image: {
    width: width,
    height: IMG_HEIGHT
  },
  header: {
    height: 60,
    width: '100%',
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
  }
});

const styles3 = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 15,
    backgroundColor:'#8E0000',
  },
  text: {
    fontSize: 25,
    color: "#FFFFFF",
    fontWeight: 'bold'
  }
})

export default ProductScreen;

