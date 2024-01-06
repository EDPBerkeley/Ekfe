import { MainText, TabBar } from "../../Components";
import { FlatList, View } from "react-native";
import { StorefrontButtons } from "../../Components/Storefront/StorefrontButtons";
import { Title } from "../../Components/Title/title";
import React, { useEffect, useState } from "react";
import { get_store_overview_data } from "../../API/store_overview";
import { SHOP } from "../../App";
import { get_random_shop } from "../../API/store";
import { DisplayOverviewData } from "../../Components/Statistics/Overview_Data";
import { ListProduct } from "../../Components/List/ListProduct";

const StorefrontScreen = ({navigation}) => {

  const [overview_button, set_overview_button] = useState("clicked")
  const [product_data_button, set_product_data_button] = useState("not_clicked")
  const [store, set_store] = useState(null)
  const [store_overview_data, set_store_overview_data] = useState(null)

  useEffect(() => {
    get_random_shop().then(data => {
      set_store(data)
    })
  }, []);


  useEffect(() => {
    // console.log("THIS IS STORE " + JSON.stringify(store))
    if (store != null) {
      // console.log("THIS IS STORE" + store._id)
      get_store_overview_data(store._id).then(data => {
        // console.log("THIS IS MOST" + data.most_revenue_product)
        set_store_overview_data(data)
      })
    }

  }, [store]);

  //
  //
  // useEffect(() => {
  //   console.log("DHAJDHC" + SHOP)
  //   get_store_overview_data(SHOP.id)
  //     .then(data => {
  //       console.log("THIS IS DATA" + data.js)
  //     })
  // }, [SHOP]);


  if (overview_button === "clicked" && store_overview_data != null) {
    return(
      <View flex={1} backgroundColor ={"#d7d7d7"}>
        <Title text={"Storefront"} />
        <StorefrontButtons
          navigation={navigation}
          overview_button={overview_button}
          set_overview_button={set_overview_button}
          product_data_button={product_data_button}
          set_product_data_button={set_product_data_button}/>

        <View marginTop={10}/>
        <FlatList
          // keyExtractor={(item) => item._id.toString()}
          data={store_overview_data}
          renderItem={({ item }) => (
            <DisplayOverviewData stat_name={item.stat_name} stat={item.stat}/>
          )}
          contentContainerStyle={{ paddingBottom: 87 }}
        />

        <TabBar navigation={navigation}/>
      </View>
    )
  } else if (product_data_button === "clicked" && store_overview_data != null) {
    return(
      <View flex={1}>
        <Title text={"Storefront"} />
        <StorefrontButtons
          navigation={navigation}
          overview_button={overview_button}
          set_overview_button={set_overview_button}
          product_data_button={product_data_button}
          set_product_data_button={set_product_data_button}/>
        <MainText text={"Product Data Screen"}/>
        <TabBar navigation={navigation}/>
      </View>
    )
  }
}







export default StorefrontScreen;
