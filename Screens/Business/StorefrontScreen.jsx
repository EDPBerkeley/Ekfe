import { MainText, TabBar } from "../../Components";
import { FlatList, Text, View, StyleSheet } from "react-native";
import { BlurView } from '@react-native-community/blur';
import { StorefrontButtons } from "../../Components/Storefront/StorefrontButtons";
import { Title } from "../../Components/Title/title";
import React, { useEffect, useState } from "react";
import { get_store_overview_data } from "../../API/store_overview";
import { SHOP } from "../../App";
import { get_random_shop } from "../../API/store";
import { DisplayOverviewData } from "../../Components/Statistics/Overview_Data";
import { ListProduct } from "../../Components/List/ListProduct";
import { get_product_for_shop } from "../../API";
import { ListProductData } from "../../Components/List/ListProductData";
import MyLineChart from "../../Components/Graphs/RevenueGraph";
import { SCREEN_WIDTH } from "../../Constants/constants";

const StorefrontScreen = ({ navigation }) => {

  const [overview_button, set_overview_button] = useState("clicked");
  const [product_data_button, set_product_data_button] = useState("not_clicked");
  const [shop, set_shop] = useState(null);
  const [store_overview_data, set_store_overview_data] = useState(null);
  const [product_data, set_product_data] = useState(null);

  useEffect(() => {
    get_random_shop().then(data => {
      set_shop(data);
    }).catch((error) => {
      console.log(error);
    });
  }, []);


  useEffect(() => {
    // console.log("THIS IS STORE " + JSON.stringify(shop))
    if (shop != null) {
      // console.log("THIS IS STORE" + shop._id)
      get_store_overview_data(shop._id).then(data => {
        // console.log("THIS IS MOST" + data.most_revenue_product)
        set_store_overview_data(data);
      }).catch((error) => {
        console.log(error);
      });

      get_product_for_shop(shop._id).then(data => {
        set_product_data(data);
      }).catch((error) => {
        console.log(error);
      });
    }

  }, [shop]);

  if (overview_button === "clicked" && store_overview_data != null) {
    return (
      <View style={{ flex: 1 }}>
        <Title text={"Storefront"} />
        <StorefrontButtons
          navigation={navigation}
          overview_button={overview_button}
          set_overview_button={set_overview_button}
          product_data_button={product_data_button}
          set_product_data_button={set_product_data_button} />

        <View style={styles.graph_title_container}>
          <Text style={styles.graph_title_text}>$2,300</Text>
        </View>

        <View style={styles.graph_description_container}>
          <Text style={styles.graph_description_text}>Revenue increased by </Text>
          <Text style={styles.graph_description_text_bold}>$2,300 </Text>
          <Text style={styles.graph_description_text}>in past </Text>
          <Text style={styles.graph_description_text_bold}>30 days</Text>
        </View>

        <View style={{ flex: 1 }} />
        <View style={{ borderColor: "#000000", borderWidth: 0 }}>


          <MyLineChart style={{zIndex: 1}}/>

          <View style={{ zIndex: 2, alignItems: "center", justifyContent: "center" }}>
            <View style={styles.interval_container}>
              <Text style={styles.interval_text}>0d</Text>
              <Text style={styles.interval_text}>10d</Text>
              <Text style={styles.interval_text}>20d</Text>
              <Text style={styles.interval_text}>30d</Text>
            </View>


          </View>



        </View>

        {/*<FlatList*/}
        {/*  // keyExtractor={(item) => item._id.toString()}*/}
        {/*  data={store_overview_data}*/}
        {/*  renderItem={({ item }) => (*/}
        {/*    <DisplayOverviewData stat_name={item.stat_name} stat={item.stat}/>*/}
        {/*  )}*/}
        {/*  contentContainerStyle={{ paddingBottom: 87 }}*/}
        {/*/>*/}

        <View style={{ height: 60 }} />

        <TabBar navigation={navigation} />
      </View>
    );
  } else if (product_data_button === "clicked" && store_overview_data != null) {
    return (
      <View flex={1}>
        <Title text={"Storefront"} />
        <StorefrontButtons
          navigation={navigation}
          overview_button={overview_button}
          set_overview_button={set_overview_button}
          product_data_button={product_data_button}
          set_product_data_button={set_product_data_button} />
        {/*<View marginTop={10}/>*/}
        <FlatList
          keyExtractor={(item) => item._id.toString()}
          data={product_data}
          renderItem={({ item: product }) => (
            <ListProductData
              name={product.name}
              category={product.category}
              price={product.price}
              description={product.description}
              navigation={navigation}
              shop={shop}
              product={product}
            />
          )}
          contentContainerStyle={{ paddingBottom: 87 }}
        />
        <TabBar navigation={navigation} />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  graph_title_container: {
    paddingTop: 80,
    paddingLeft: 15,
  },
  graph_description_container: {
    flexDirection: "row",
    paddingTop: 10,
    paddingLeft: 20,
  },
  graph_title_text: {
    fontSize: 40,
    fontFamily: "Roboto-Wide",
    fontWeight: "bold",
    color: "#2d2d2d",
  },
  graph_description_text: {

  },
  graph_description_text_bold: {
    fontWeight: "bold",
  },
  interval_container: {
    borderColor: "#000000",
    borderWidth: 0,
    fontSize: 8,
    color: "#000000",
    height: 35,
    width: SCREEN_WIDTH - 20,
    alignItems: "center",
    justifyContent: "space-around",
    flexDirection: "row",
    position: "absolute",
    bottom: 25,
    zIndex: 2,
    paddingHorizontal: 10,
    backgroundColor: "#4b0000",
    borderRadius: 8
  },
  interval_text: {
    fontFamily: "Roboto",
    fontSize: 16,
    color: "#ffffff",
    fontWeight: "600"
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    opacity: 0.8,
  },
});


export default StorefrontScreen;
