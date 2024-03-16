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
import { ListProductHorizontal } from "../../Components/List/ListProductHorizontal";
import { get_general_product_field_for_shop } from "../../API/product";

const { width } = Dimensions.get('window');
const IMG_HEIGHT = 300;

const ProductScreen = ({route, navigation}) => {
  const scrollRef = useAnimatedRef();
  const scrollOffset = useScrollViewOffset(scrollRef);
  const [products, set_products] = useState([])
  const [for_you_products, set_for_you_products] = useState([])
  const [featured_products, set_featured_products] = useState([])
  const { shop } = route.params
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    Promise.all([
      Image.prefetch("https://reactjs.org/logo-og.png"),
      get_product_for_shop(shop._id),
      get_general_product_field_for_shop(shop._id, "featured_products"),
      get_general_product_field_for_shop(shop._id, "for_you_products")

    ]).then(([
          image_prefetch_result,
          data,
          featured_products,
          for_you_products
      ]) => {
      set_products(data)
      set_featured_products(featured_products)
      set_for_you_products(for_you_products)
      setIsLoading(false)
    })
  }, []);

    const Header = () => {
    const insets = useSafeAreaInsets();
    return (
      <Animated.View style={[headerAnimatedStyle, styles.container2, { paddingTop: insets.top, position: 'absolute',  zIndex: 9999, width: SCREEN_WIDTH, flexDirection: "column"}]}>
        <View style={styles.product_title_container}>
          <Text style={styles.product_text}>{shop.name}</Text>
        </View>

        <View style={styles.category_bar}>
          <View style={{paddingLeft: 10}}/>
          <FlatList
            data={shop.product_categories}
            horizontal={true}
            renderItem={({ item: category }) => (
              <View >
                <Text style={styles.category_text}>{category}</Text>
              </View>
            )}
            keyExtractor={(item, index) => String(index)} // Provide a unique key extractor for each item

          />
        </View>
      </Animated.View>
    )
  }

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


    if (isLoading) {
    return (
      <View style={{flex: 1 }}>
        <View style={{backgroundColor: 'grey', height: 300, width: width}}/>
        <Animated.ScrollView ref={scrollRef} scrollEventThrottle={16} contentContainerStyle={{flexGrow: 1, alignItems:"center", justifyContent: "center"}}>


          <ActivityIndicator size="large" color="#8E0000" style={{alignItems:"center", justifyContent: "center"}}/>
          <View style={{height: 50}}/>
          {/*<View style={{height: 2000}}/>*/}
          {/* You can add additional text or graphics here */}
        </Animated.ScrollView>
        <TabBar navigation={navigation} />

      </View>

    );
  } if (isLoading === false) {
    return (
      <View style={styles.container}>
        <Header />
        <Animated.ScrollView ref={scrollRef} scrollEventThrottle={16}>
          <Animated.Image
            source={{
              uri: "https://reactjs.org/logo-og.png"
            }}
            style={[styles.image, imageAnimatedStyle]}
          />
          <View style={{backgroundColor: '#FFFFFF'}}>


            <View style={styles.horizontal_products_container}>
              <FlatList
                data={featured_products}
                horizontal={true}
                renderItem={({ item: product }) => (
                  <ListProductHorizontal
                    name={product.name}
                    price={product.price}
                    images={product.images}
                  />
                )}
                keyExtractor={(item, index) => String(index)} // Provide a unique key extractor for each item
                showsHorizontalScrollIndicator={false}
              />
            </View>

            <View style={styles.horizontal_products_container}>
              <FlatList
                data={for_you_products}
                horizontal={true}
                renderItem={({ item: product }) => (
                  <ListProductHorizontal
                    name={product.name}
                    price={product.price}
                    images={product.images}
                  />
                )}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, index) => String(index)} // Provide a unique key extractor for each item

              />
            </View>

            <FlatList
              data={products}
              renderItem={({ item: product, index }) => (
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
          </View>
        </Animated.ScrollView>
        <TabBar navigation={navigation} />

      </View>

    );
  }
};



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
    backgroundColor: '#fff',
    height: 100,
    borderWidth: StyleSheet.hairlineWidth
  },
  container2: {
    paddingTop: 10,

    backgroundColor:'#8E0000',
  },
    product_text: {
    fontSize: 20,
    color: "#FFFFFF",
    fontFamily: 'Roboto'
  },
  category_text: {
    fontSize: 14,
    color: "#FFFFFF",
    paddingRight: 40,
    fontFamily: 'Roboto',
  },
  horizontal_products_container : {
    paddingLeft: 20,
    paddingTop: 20,

  },
  category_bar: {
    flexDirection: "row",
    // backgroundColor: "#7A0000",
    paddingBottom: 15

  },
  product_title_container: {
    flexDirection: 'row',
    paddingLeft: 15,
    paddingRight: 8,
    paddingTop: 4,
    paddingBottom: 19,
    fontFamily: 'Roboto',
    justifyContent: 'center'
  }
});
export default ProductScreen;
