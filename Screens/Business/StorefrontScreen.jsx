import { MainText, TabBar } from "../../Components";
import { View } from "react-native";
import { StorefrontButtons } from "../../Components/Storefront/StorefrontButtons";
import { Title } from "../../Components/Title/title";
import React, { useState } from "react";

const StorefrontScreen = ({navigation}) => {

  const [overview_button, set_overview_button] = useState("clicked")
  const [product_data_button, set_product_data_button] = useState("not_clicked")



  if (overview_button === "clicked") {
    return(
      <View flex={1}>
        <Title text={"Storefront"} />
        <StorefrontButtons
          navigation={navigation}
          overview_button={overview_button}
          set_overview_button={set_overview_button}
          product_data_button={product_data_button}
          set_product_data_button={set_product_data_button}/>
        <MainText text={"Overview Screen"}/>
        <TabBar navigation={navigation}/>
      </View>
    )
  } else if (product_data_button === "clicked") {
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
