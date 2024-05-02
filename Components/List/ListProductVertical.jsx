import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { CATEGORIES, ICONWRAPPER } from "../../Constants";
import React, { useEffect, useState } from "react";
import { SCREEN_WIDTH } from "../../Constants/constants";
import FastImage from "react-native-fast-image";
const ListProductVertical = ({ name, price, images, category }) => {
  return (

    <View >
      <View style={styles.container}>


        <View style={styles.left_text}>
          <View flex={1} style={{height: 10}}/>
          <View style={styles.descriptor_container}>
            <View style={styles.title_container}>
              <Text style={styles.title_text}>{name}</Text>
            </View>

            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>

              <View style={styles.rating_container}>


                <Text style={styles.rating_text}>{category}</Text>
                <View style={{padding: 5}}/>
                <Text style={styles.rating_text}>{'$'+price}</Text>
              </View>
            </View>

            <View style={styles.description}>
              <Text numberOfLines={3} style={styles.long_description}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ultrices non turpis egestas sollicitudin. Duis molestie est at nulla varius scelerisque. Quisque in elit mattis neque faucibus eleifend eget sed lacus. Morbi nec sem maximus, ornare magna at, faucibus ante. Cras ut massa sed metus tristique mattis.</Text>
            </View>


            <View style={styles.traits_container}>

            </View>


          </View>
          <View flex={10}/>
        </View>




        <View style={styles.image_container}>
          <FastImage source={{ uri: `data:image/png;base64,${images[0].element}`}}  style={styles.image} />
        </View>





      </View>

      {/*<View style={styles.divider}/>*/}
    </View>
  )
};

const IMAGE_WIDTH = 200;
const styles = {
  container: {
    flexDirection: 'row',
    justifyContent: "space-between",
    flex: 1,
    paddingLeft: 7,
    borderWidth: 1,
    borderRadius: 6,
    marginHorizontal: 13,
    borderColor: '#a1a1a1',
    marginVertical: 8
  },
  image_container: {
    paddingRight: 10,
    paddingVertical: 8

  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 6,
  },
  title_container: {

  },
  left_text: {
    flexDirection: 'column',
    width: 200,
    // justifyContent: 'center'
  },
  title_text: {
    fontFamily: 'Roboto-Wide',
    fontSize: 15,
    fontWeight: '500',
    color: "#000000"

  },
  descriptor_container: {
    paddingLeft: 5,
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
    fontSize: 11,
    color: "#2a2a2a",
  },
  divider: {
    flexDirection: "row",
    backgroundColor: "#9a2828",
    marginTop: 10,
    height: 1,
    // marginHorizontal: 5
  },
  description: {

    paddingTop: 9
  },
  long_description: {
    fontSize: 12,
    lineHeight: 17,
    color: "#2a2a2a",
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
    color: "#2a2a2a",
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



export {ListProductVertical};
