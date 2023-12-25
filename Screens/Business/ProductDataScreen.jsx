import { View } from "react-native";
import { Title } from "../../Components/Title/title";
import { MainText, TabBar } from "../../Components";
import { useState } from "react";


const ProductDataScreen = ({navigation}) => {




  return (
    <View flex={1}>
      <Title text="Product Data Overview"/>
      <MainText text="Product Data Screen"/>
      <TabBar navigation={navigation}/>
    </View>
  )
}

export default ProductDataScreen
