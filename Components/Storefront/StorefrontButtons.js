import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet, TouchableOpacity } from "react-native";

const StorefrontButtons = ({navigation, overview_button, set_overview_button, product_data_button, set_product_data_button}) => {

  const click = (destination_page) => {

    if (destination_page === "OverviewScreen") {

      set_overview_button("clicked")
      set_product_data_button("not_clicked")
    } else if (destination_page === "ProductDataScreen") {

      set_overview_button("not_clicked")
      set_product_data_button("clicked")
    }
  }


  return (

    <View style={container_styles.container}>
      <TouchableOpacity style={container_styles[overview_button]} onPress={() => click("OverviewScreen")}>
            <Text style={text_styles.button}>Overview</Text>
    </TouchableOpacity>


    <TouchableOpacity style={container_styles[product_data_button]} onPress={() => click("ProductDataScreen")}>
        <Text style={text_styles.button}>Product Data</Text>
    </TouchableOpacity>


    </View>

  )
}

const container_styles = StyleSheet.create({
  container: {
    backgroundColor:  "#590000",
    flexDirection: "row",
  },
  not_clicked: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#590000",
    height: 50
  },
  clicked: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#8E0000",
    height: 50
  }
})

const text_styles = StyleSheet.create({
  button: {
    color: "#FFFFFF",
    fontSize: 17,
    fontFamily: "Roboto",
  },
})

export { StorefrontButtons }
