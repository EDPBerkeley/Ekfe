import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { CATEGORIES, ICONWRAPPER } from "../../Constants";
import React, { useEffect, useState } from "react";
import { SCREEN_WIDTH } from "../../Constants/constants";
import FastImage from "react-native-fast-image";
const ListShopLandingVertical = ({ name, category, distance, rating, navigation, shop }) => {
  const [image, set_image] = useState(null);
  //
  // useEffect(() => {
  //   Image.prefetch("https://reactjs.org/logo-og.png").then(([image]) => {
  //     set_image(image);
  //   })
  // }, [])
  return (

  <TouchableOpacity onPress={() => navigation.navigate("ProductScreen", { shop : shop })} >
    <View style={styles.container}>


      <View style={styles.descriptor_container}>

        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={styles.title_container}>
            <Text style={styles.title_text}>{name}</Text>
          </View>

          <View style={styles.rating_container}>
            <Text style={styles.rating_text}>{Rating(rating)}</Text>
            <View style={{paddingHorizontal: 2}}/>
          </View>
        </View>


        <View style={styles.traits_container}>

          <View style={styles.specific_traits_container}>
            <Text style={styles.specific_traits_text}>{category}</Text>
            <View style={{paddingHorizontal: 3}}/>
            <Text style={styles.specific_traits_text}>{distance + " mi"}</Text>
          </View>



        </View>


      </View>



      <View style={styles.image_container}>
        <FastImage source={{ uri: "https://reactjs.org/logo-og.png"}}  style={styles.image} />
      </View>






    </View>

    <View style={styles.divider}/>
  </TouchableOpacity>
  )
};

const IMAGE_WIDTH = 200;
const styles = {
  container: {
    flexDirection: 'column',
    flex: 1,
    paddingTop: 10
  },
  image_container: {
    paddingLeft: 10,

  },
  image: {
    width: SCREEN_WIDTH - 20,
    height: (SCREEN_WIDTH - 20) * .45,
    borderRadius: 6,
  },
  title_container: {

  },
  title_text: {
    fontFamily: 'Roboto-Wide',
    fontSize: 15,
    fontWeight: '500'

  },
  descriptor_container: {
    paddingLeft: 10,
    paddingTop: 3,
    paddingBottom: 10
  },
  traits_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 1
  },
  specific_traits_container: {
    flexDirection: 'row',
  },
  specific_traits_text: {
    fontFamily: 'Roboto-Wide',
    fontSize: 10,
    color: "#626262"
  },
  rating_container: {
    flexDirection: 'row',
    marginRight: 10,
    paddingTop: 5
  },
  rating_text: {
    fontFamily: 'Roboto-Wide',
    fontSize: 10
  },
  divider: {
    flexDirection: "row",
    backgroundColor: "#9a2828",
    marginTop: 10,
    height: 1,
    // marginHorizontal: 5
  }
}
const rating_stylesheet = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly"
  },
  rating_text: {
    fontFamily: "Roboto-bold",
    color: "#3b3b3b",
    fontSize: 13,
  },
  star_container: {

  },
  star: {
    fontSize: 13,
    color: "#3b3b3b",
  }
})

const Rating = (rating) => {

  const SelectedIcon = ICONWRAPPER["AntDesign"]
  return (
    <View style={rating_stylesheet.container}>
      <SelectedIcon style={[rating_stylesheet.star, rating_stylesheet.star_container]} name={"star"}/>
      <Text style={rating_stylesheet.rating_text}>{rating}</Text>
    </View>

  )
}



export {ListShopLandingVertical};
