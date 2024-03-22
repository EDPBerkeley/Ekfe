import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { SCREEN_WIDTH } from "../../Constants/constants";
import FastImage from "react-native-fast-image";
import React from "react";
import LinearGradient from 'react-native-linear-gradient';
import SkeletonLoader from "../DefaultLanding/SkeletonLoading";



const ListShopLandingVerticalLoading = () => {


  return (
  <View>
      <View style={styles.container}>
        <View style={styles.image_container}>
          <View style={{height: 20}}/>
          <View width={SCREEN_WIDTH - 20} height={(SCREEN_WIDTH - 20) * .45} style={styles.image}/>
        </View>
      </View>
      <View style={styles.divider}/>
  </View>
  )
}

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
    backgroundColor: "#e5e5e5",
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

export {ListShopLandingVerticalLoading}
