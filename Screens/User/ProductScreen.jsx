import { Text, View } from "react-native";
import { MainText, TabBar } from "../../Components";
import { Title } from "../../Components/Title/title";
import React from "react";
import { ScrollProduct } from "../../Components/List/ScrollProduct";

const ProductScreen = ({route, navigation}) => {
  const { shop } = route.params
  return(
    <View flex={1}>
      <Title text={"Products"} />
      <Text>{shop.name}</Text>
      <ScrollProduct></ScrollProduct>
      <MainText text={"ProductScreen"}/>
      <TabBar navigation={navigation}/>
    </View>
  )
}

export default ProductScreen;
