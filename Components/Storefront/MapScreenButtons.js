import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet, TouchableOpacity } from "react-native";

const MapScreenButtons = ({navigation, map_button, set_map_button, item_button, set_item_button}) => {

  const click = (destination_page) => {

    if (destination_page === "MapScreen") {

      set_map_button("clicked")
      set_item_button("not_clicked")
    } else if (destination_page === "ItemScreen") {

      set_map_button("not_clicked")
      set_item_button("clicked")
    }
  }


  return (


      <View style={container_styles.container}>
        <TouchableOpacity style={[container_styles[map_button], ]} onPress={() => click("MapScreen")}>
              <Text style={text_styles.button}>Search by Location</Text>
        </TouchableOpacity>


      <TouchableOpacity style={[container_styles[item_button], ]} onPress={() => click("ItemScreen")}>
          <Text style={text_styles.button}>Search by Item</Text>
      </TouchableOpacity>



    </View>

  )
}

const container_styles = StyleSheet.create({
  container: {
    backgroundColor:  "#590000",
    flexDirection: "row"
  },
  not_clicked: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#590000",
    width: "50%",
    height: 42.5
  },
  clicked: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#8E0000",
    width: "50%",
    height: 42.5
  }
})

const text_styles = StyleSheet.create({
  button: {
    color: "#FFFFFF",
    fontSize: 15,
    fontFamily: "Roboto-Wide",
    // fontWeight: "450"
  },
})

export { MapScreenButtons }
