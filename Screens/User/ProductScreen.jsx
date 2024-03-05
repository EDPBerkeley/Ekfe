import {
  ActivityIndicator,
  FlatList,
  Text,
  View,
  StyleSheet,
  Dimensions,
  Image,
  ScrollView,
  Button, SafeAreaView, TouchableWithoutFeedback,
} from "react-native";
import { MainText, TabBar } from "../../Components";
import { Title } from "../../Components/Title/title";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ListProduct } from "../../Components/List/ListProduct";
import { ListItem } from "../../Components/List";
import { get_product_for_shop } from "../../API";

import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset, useSharedValue,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useFocusEffect, useNavigation } from "@react-navigation/native";



const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window')
const IMG_HEIGHT = 300;

const ProductScreen = ({route, navigation}) => {
  const [products, set_products] = useState([])
  const { shop } = route.params
  const [isLoading, setIsLoading] = useState(true);

  const scrollRef = useAnimatedRef();
  const scrollOffset = useScrollViewOffset(scrollRef);



  useEffect(() => {
    Promise.all([
      Image.prefetch("https://reactjs.org/logo-og.png"),
      get_product_for_shop(shop._id),

    ]).then(([image_prefetch_result, data]) => {
        set_products(data)
        setIsLoading(false)
      })
  }, []);

  const imageAnimatedStyle = useAnimatedStyle(() => {

      // console.log("sldfjklsdjfkldsjfklsdjklfjsdklfjs")
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


  const OPACITY = useRef(new Animated.Value(0)).current;

  const headerAnimatedStyle = useAnimatedStyle(() => {
    // console.log({
    //   opacity: interpolate(scrollOffset.value, [0, IMG_HEIGHT / 1.5], [0, 1])
    // })
    return {
      opacity: interpolate(scrollOffset.value, [0, IMG_HEIGHT / 1.5], [0, 1])
    };
  });
  const createAnimatedOpacityStyle = (e) =useAnimatedStyle(() => {
    console.log("new function hit")
    return {
      opacity: interpolate(e.nativeEvent.contentOffset.y, [0, IMG_HEIGHT / 1.5], [0, 1]) // Adjust the formula as needed
    };
  });

  const Header = () => {
    const insets = useSafeAreaInsets();
    return (
      <Animated.View style={[createAnimatedOpacityStyle, styles3.container, { paddingTop: insets.top }]}>
        <Text style={styles3.text}>Product Screen</Text>
      </Animated.View>
    )
  }

  useFocusEffect(() => {
    navigation.setOptions({
      headerTransparent: true,
      headerLeft: () => <View />,
      headerTitle: '',
      headerBackground: () => <Header />
    });
  }); // Re-run when navigation changes (though usually it doesn't)

  const handleScroll = (e) => {
    console.log("hit handler and header should have opacity of", interpolate(e.nativeEvent.contentOffset.y, [0, IMG_HEIGHT / 1.5], [0, 1]))
    setOPACITY(interpolate(e.nativeEvent.contentOffset.y, [0, IMG_HEIGHT / 1.5], [0, 1]))
  }




  if (isLoading) {
    return (
      <View style={{flex: 1 }}>
        <View style={{backgroundColor: 'grey', height: 300, width: width}}/>
        <Animated.ScrollView ref={scrollRef} onScroll={handleScroll} scrollEventThrottle={16} contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center'}}>


          <ActivityIndicator size="large" color="#8E0000"/>
          <View style={{height: 50}}/>
          {/* You can add additional text or graphics here */}
        </Animated.ScrollView>
        <TabBar navigation={navigation} />

      </View>

    );
  } if (isLoading === false) {
    const insets2 = useSafeAreaInsets();

    const handleTouchStart = () => {
      scrollRef.current.setNativeProps({ scrollEnabled: false }); // Disable scrolling on ScrollView
    };

    const handleTouchMove = () => {
      scrollRef.current.setNativeProps({ scrollEnabled: true }); // Enable scrolling on ScrollView
    };





    return (
      <View style={{flex: 1 }}>


        {/*<View style={{backgroundColor: 'grey', height: 300, width: width}}/>*/}

        <Animated.ScrollView ref={scrollRef} onScroll={handleScroll} scrollEventThrottle={32} contentContainerStyle={{ flexGrow: 1}}>



          <Animated.Image
            source={{
              uri: "https://reactjs.org/logo-og.png"
            }}
            style={[styles.image, imageAnimatedStyle]}
          />

          <View style={{ flexGrow: 1}}>
            <FlatList
              keyExtractor={(item) => item._id.toString()}
              data={products}
              renderItem={({ item: product }) => (
                <ListProduct
                  name={product.name}
                  category={product.category}
                  price={product.price}
                  description={product.description}
                  navigation={navigation}
                  shop={shop}
                  images={product.images}
                  product={product}
                />
              )}
              contentContainerStyle={{ paddingBottom: 87 }}
            />
          {/* You can add additional text or graphics here */}
          </View>
        </Animated.ScrollView>
        <TabBar navigation={navigation} />

      </View>
    )
  }
}
//
//
// <View flex={1}>
//   {/*<Title text={"Products"} />*/}
//   <View style={[styles.container, ]}>
//
//     <Animated.ScrollView ref={scrollRef} scrollEventThrottle={16} contentContainerStyle={{ flexGrow: 1}}>
//       <Animated.Image
//         source={{
//           uri: "https://reactjs.org/logo-og.png"
//         }}
//         style={[styles.image, imageAnimatedStyle]}
//       />
//       <View style={{ backgroundColor: '#fff', height:300 }} >
//
/*//         {/!*<FlatList*!/}
//         {/!*  keyExtractor={(item) => item._id.toString()}*!/}
//         {/!*  data={products}*!/}
//         {/!*  renderItem={({ item: product }) => (*!/}
//         {/!*    <ListProduct*!/}
//         {/!*      name={product.name}*!/}
//         {/!*      category={product.category}*!/}
//         {/!*      price={product.price}*!/}
//         {/!*      description={product.description}*!/}
//         {/!*      navigation={navigation}*!/}
//         {/!*      shop={shop}*!/}
//         {/!*      images={product.images}*!/}
//         {/!*      product={product}*!/}
//         {/!*    />*!/}
//         {/!*  )}*!/}
//         {/!*  contentContainerStyle={{ paddingBottom: 87 }}*!/}
//         {/!*!/>*!/}*/
//       </View>
//     </Animated.ScrollView>
//     <TabBar navigation={navigation} />
//   </View>
// </View>

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
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
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
