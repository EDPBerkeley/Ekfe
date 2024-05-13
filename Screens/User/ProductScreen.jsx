import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  LogBox,
} from "react-native";
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset
} from 'react-native-reanimated';
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ICONWRAPPER, SCREEN_WIDTH } from "../../Constants/constants";
import React, { useEffect, useState } from "react";
import { get_product_for_shop } from "../../API";
import { TabBar } from "../../Components";
import { ListProductHorizontal } from "../../Components/List/ListProductHorizontal";
import { get_general_product_field_for_shop, get_sorted_products } from "../../API/product";
import { ListProductVertical } from "../../Components/List/ListProductVertical";
import { get_shop_given_id } from "../../API/store";
import { ListProductVerticalLoading } from "../../Components/List/ListProductVerticalLoading";
import { ListProductHorizontalLoading } from "../../Components/List/ListProductHorizontalLoading";
import FastImage from "react-native-fast-image";
console.disableYellowBox = true;
console.disableYellowBox = true;

const { width } = Dimensions.get('window');
const IMG_HEIGHT = 200;

const ProductScreen = ({route, navigation}) => {
  const scrollRef = useAnimatedRef();
  const scrollOffset = useScrollViewOffset(scrollRef);
  const [products, set_products] = useState([])
  const [for_you_products, set_for_you_products] = useState([])
  const [featured_products, set_featured_products] = useState([])
  const { shop } = route.params
  const [isLoading, setIsLoading] = useState(true);
  const [selected_category, set_selected_category] = useState("All Products")
  const [sorted_products, set_sorted_products] = useState([])
  const [resolved_shop, set_resolved_shop] = useState(null)
  const dataArray = Array.from({ length: 10 }, (_, index) => ({
    id: index.toString(), // Ensure a unique key by using the index
    // Any other data you might want to use for each item
  }));
  const banner = shop.banner;
  console.log("THIS IS SHOP BANNER ELEMENT" + shop.banner.element)

  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, [])

  useEffect(() => {
    Promise.all([
      Image.prefetch("https://reactjs.org/logo-og.png"),
      get_shop_given_id(shop.id, true)
    ]).then(([
               image_prefetch_result,
               shop
             ]) => {
      set_products(shop.products)
      set_featured_products(shop.featured_products)
      set_for_you_products(shop.for_you_products)
      set_sorted_products(shop.sorted_products)
      setIsLoading(false)

    }).catch((error) => {
      console.log(error)
    })
  }, []);

  const NumCost = (numSigns) => {


    let finalComponents = []
    const SelectedIcon = ICONWRAPPER["Feather"]


    for (let i = 0; i < parseInt(numSigns); i++) {
      console.log("Running" + i)
      finalComponents.push(
        <SelectedIcon style={styles.cost} name={"dollar-sign"}/>
      )
    }
    return finalComponents
  }

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

              <TouchableOpacity onPress={() => (set_selected_category(category))}>
                <View >
                  <Text style={styles.category_text}>{category}</Text>
                </View>
              </TouchableOpacity>

            )}
            showsHorizontalScrollIndicator={false}

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
      <View style={styles.container}>
        <Header />
        <Animated.ScrollView ref={scrollRef} scrollEventThrottle={16} style={{backgroundColor: "#FFFFFF"}}>
          <View style={{width: SCREEN_WIDTH, height: 200, backgroundColor: "#e5e5e5"}}/>

          <View style={{backgroundColor: "#FFFFFF"}}>
            <View style={header_styles.container}>

              <View style={header_styles.name_container}>
                <Text style={header_styles.name_text}>{shop.name}</Text>
              </View>



              <View style={header_styles.horizontal_container_loading}/>



            </View>
            <View style={{marginTop: 10}}/>
            <View style={styles.bar}/>
          </View>


          <View style={{backgroundColor: '#FFFFFF'}}>


            <View style={styles.horizontal_products_container}>
              <Text style={styles.header_product_text}>Featured</Text>
              <FlatList
                data={dataArray}
                horizontal={true}
                renderItem={({ item: product }) => (
                  <ListProductHorizontalLoading
                    name=""
                    price=""
                    images=""
                  />
                )}
                keyExtractor={(item, index) => String(index)} // Provide a unique key extractor for each item
                showsHorizontalScrollIndicator={false}
              />
            </View>
            <View style={styles.horizontal_products_container}>
              <Text style={styles.header_product_text}>For You</Text>
              <FlatList
                data={dataArray}
                horizontal={true}
                renderItem={({ item: product }) => (
                  <ListProductHorizontalLoading
                    name=""
                    price=""
                    images=""
                  />
                )}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, index) => String(index)} // Provide a unique key extractor for each item
              />
            </View >
            <View style={{marginTop: 30}}/>
            <View style={styles.bar}></View>
            <View style={{paddingTop: 15}}>
              <Text style={styles.all_product_text}>{selected_category}</Text>
              <FlatList
                data={dataArray}
                renderItem={({ item: product, index }) => (
                  <ListProductVerticalLoading
                    name=""
                    price=""
                    images=""
                  />
                )}
                contentContainerStyle={vertical_product_list.flatListContent}
              />
            </View>

          </View>
        </Animated.ScrollView>
        <TabBar navigation={navigation} />

      </View>

    );
  } if (isLoading === false) {
    return (
      <View style={styles.container}>
        <Header />
        <Animated.ScrollView ref={scrollRef} scrollEventThrottle={16} style={{backgroundColor: "#FFFFFF"}}>
          {/*<Animated.Image*/}
          {/*  source={{*/}
          {/*    uri: "https://reactjs.org/logo-og.png"*/}
          {/*  }}*/}
          {/*  style={[styles.image, imageAnimatedStyle]}*/}
          {/*/>*/}
          {/*<Text>{shop.banner.element}</Text>*/}


          <Animated.Image source={{ uri: `data:image/jpeg;base64,${shop.banner.element}` }} />
          <FastImage source={{ uri: `data:image/jpeg;base64,${shop.banner.element}`}}  style={styles.image} />

          <View style={{backgroundColor: "#FFFFFF"}}>
            <View style={header_styles.container}>

              <View style={header_styles.name_container}>
                <Text style={header_styles.name_text}>{shop.name}</Text>
              </View>



              <View style={header_styles.horizontal_container}>
                <View style={header_styles.category_container}>
                  <Text style={header_styles.category_text}>{shop.category}</Text>
                </View>

                <View style={{paddingHorizontal: 5, alignItems: "center"}}>
                  <Text style={{color: "#555555"}}>|</Text>
                </View>



                <View style={header_styles.distance_container}>
                  <Text style={header_styles.distance_text}>{shop.distance + "mi"}</Text>
                </View>

                <View style={{paddingHorizontal: 5, alignItems: "center"}}>
                  <Text style={{color: "#555555"}}>|</Text>
                </View>

                <View style={header_styles.cost_container}>
                  <Text style={header_styles.cost_text}>{NumCost(shop.cost)}</Text>
                </View>
              </View>



            </View>
            <View style={{marginTop: 10}}/>
            <View style={styles.bar}/>
          </View>


          <View style={{backgroundColor: '#FFFFFF'}}>


            <View style={styles.horizontal_products_container}>
              <Text style={styles.header_product_text}>Featured</Text>



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
              <Text style={styles.header_product_text}>For You</Text>
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


            </View >

            <View style={{marginTop: 30}}/>
            <View style={styles.bar}></View>

            <View style={{paddingTop: 15}}>
              <Text style={styles.all_product_text}>{selected_category}</Text>

              <FlatList
                data={sorted_products[selected_category]}
                renderItem={({ item: product, index }) => (
                  <ListProductVertical
                    name={product.name}
                    price={product.price}
                    images={product.images}
                    category={product.category}
                  />
                )}
              />
              <View style={{paddingBottom:87}}/>
            </View>

          </View>
        </Animated.ScrollView>
        <TabBar navigation={navigation} />

      </View>

    );
  }
};



const header_styles = StyleSheet.create({
  container: {
    paddingLeft: 20,
    paddingTop: 20,
    backgroundColor: "#FFFFFF",
  },
  horizontal_container: {
    flexDirection: "row",
    alignItems: "center",
  },
  horizontal_container_loading: {
    flexDirection: "row",
    width: 150,
    height: 15,
    backgroundColor: "#F5F5F5"
  },
  name_container: {
    paddingBottom: 5
  },
  name_text: {
    fontSize: 25,
    fontFamily: "Roboto-Bold"
  },
  category_container: {
    paddingRight: 5
  },
  category_text: {
    fontFamily: "Roboto",
    fontSize: 13,
    color: "#555555"
  },
  rating_container: {
    paddingRight: 5
  },
  rating_text: {
    fontFamily: "Roboto",
    fontSize: 13,
    color: "#555555"
  },
  distance_container: {
    paddingRight: 5
  },
  distance_text: {
    fontFamily: "Roboto",
    fontSize: 13,
    color: "#555555"
  },
  cost_container: {
    paddingRight: 5,
    paddingTop: 2.5
  },
  cost_text: {
    color: "#555555",
    fontSize: 12,
  }
})

const vertical_product_list = StyleSheet.create({
  flatListContent: {
    alignItems: 'center',
    paddingBottom: 87
  },
})

const styles = StyleSheet.create({
  cost: {
    fontSize: 11,
    flexDirection: "row",
    paddingBottom: .025,
    marginEnd: -3,
    color: "#555555",
  },

  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  image: {
    width: SCREEN_WIDTH,
    height: 250,
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
    fontSize: 18,
    color: "#FFFFFF",
    fontFamily: 'Roboto-Medium',
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
  vertical_products_container : {
    paddingLeft: 20,
    paddingTop: 20,
  },
  header_product_text: {
    fontFamily: 'Roboto-Bold',
    fontSize: 20,
    paddingBottom: 10,

  },
  all_product_text: {
    fontFamily: 'Roboto-Bold',
    fontSize: 23,
    paddingBottom: 10,
    paddingLeft: 20
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
  },
  bar: {
    flexDirection: "row",
    height: 1,
    marginHorizontal: 15,
    backgroundColor: "#bd0000",
  }
});
export default ProductScreen;
