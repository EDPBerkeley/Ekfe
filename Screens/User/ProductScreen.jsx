import { FlatList, Text, View } from "react-native";
import { MainText, TabBar } from "../../Components";
import { Title } from "../../Components/Title/title";
import React, { useEffect, useState } from "react";
import { ListProduct } from "../../Components/List/ListProduct";
import { ListItem } from "../../Components/List";
import { get_product_for_shop } from "../../API";





const ProductScreen = ({route, navigation}) => {
  const [products, set_products] = useState([])
  const { shop } = route.params

  useEffect(() => {
    get_product_for_shop(shop._id)
      .then((data) => {

        set_products(data)
      })
  }, []);

  // useEffect(() => {
  //   console.log("THIS IS products", products)
  // }, [products])



  return(
    <View flex={1}>

      <Title text={"Products"} />

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

        <TabBar navigation={navigation} />
    </View>
  )
}

export default ProductScreen;
