import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { CATEGORIES, ICONWRAPPER } from "../../Constants";
import { useEffect, useState } from "react";
import { parseJSON } from "../../Services/Utils";
import FastImage from "react-native-fast-image";

const ListShopLandingHorizontal = ({ name, category, distance, rating, navigation, shop }) => {
  const [image, set_image] = useState(null);
  // useEffect(() => {
  //   Image.prefetch("https://reactjs.org/logo-og.png").then(([image]) => {
  //     set_image(image);
  //   })
  // }, [])
  return (

  <TouchableOpacity onPress={() => navigation.navigate("ProductScreen", { shop : shop })}>
    <View style={styles.container}>

      <View style={styles.image_container}>
        <FastImage source={{ uri: "https://reactjs.org/logo-og.png"}}  style={styles.image} />
      </View>

      <View style={styles.descriptor_container}>

        <View style={styles.title_container}>
          <Text style={styles.title_text}>{name}</Text>
        </View>


        <View style={styles.traits_container}>

          <View style={styles.specific_traits_container}>
            <Text style={styles.specific_traits_text}>{category}</Text>
            <View style={{paddingHorizontal: 3}}/>
            <Text style={styles.specific_traits_text}>{distance + " mi"}</Text>
          </View>

          <View style={styles.rating_container}>
            <Text style={styles.rating_text}>{Rating(rating)}</Text>
            <View style={{paddingHorizontal: 2}}/>
          </View>

        </View>
      </View>


    </View>
  </TouchableOpacity>
  )
};

const styles = {
  container: {
    flexDirection: 'column',
    marginRight: 20,
    borderRadius: 5, // Make sure the container also has rounded corners if needed
    overflow: 'hidden',
    borderWidth: .5,
    borderColor: "#d2d2d2",
    backgroundColor: "#e5e5e5",

  },
  image_container: {
  },
  image: {
    width: 200,
    height: 85
  },
  title_container: {

  },
  title_text: {
    fontFamily: 'Roboto-Wide',
    fontSize: 10,
    fontWeight: '500'

  },
  descriptor_container: {
    paddingLeft: 8,
    paddingTop: 3
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
    fontSize: 8,
    color: "#626262"
  },
  rating_container: {
    flexDirection: 'row'
  },
  rating_text: {
    fontFamily: 'Roboto-Wide',
    fontSize: 8
  }
}
const rating_stylesheet = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: 22,
    height: 11,
    alignItems: "center",
    justifyContent: "space-evenly"
  },
  rating_text: {
    fontFamily: "Roboto-bold",
    color: "#505050",
    fontSize: 8,
    paddingTop: 1
  },
  star_container: {

  },
  star: {
    fontSize: 8,
    color: "#505050",
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



export {ListShopLandingHorizontal};
