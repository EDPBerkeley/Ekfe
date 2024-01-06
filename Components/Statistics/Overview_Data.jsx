import { View, StyleSheet, Text } from "react-native";
import React from "react";
const DisplayOverviewData = ({ stat_name, stat }) => {
  return(

      <View style={container_styles.data_block}>

        <View style={container_styles.spacer2}/>
        <Text style={text_styles.stat}> {stat} </Text>
        <View style={container_styles.spacer}/>
        <Text style={text_styles.stat_name}> {stat_name} </Text>
        <View style={container_styles.spacer2}/>

      </View>


  )
}

const container_styles = StyleSheet.create({
  background: {
    backgroundColor: "#c4c4c4"
  },
  data_block: {
    backgroundColor: "#FFFFFF",

    paddingHorizontal: 25,
    alignItems: 'center',
    borderRadius: 10,
    marginHorizontal: 10,
    marginVertical: 7
  },
  spacer: {
    paddingVertical: 3
  },
  spacer2: {
    paddingTop: 40
  },
  divider: {
    flexDirection: "row",
    height: 1,
    width: "100%",
    marginTop: 50,



  }

})

const text_styles= StyleSheet.create({
  stat_name: {
    fontSize: 11,
    color: "#383838"

  },
  stat: {
    fontSize: 30,
    fontWeight: "500",
    color: "#1c1c1c"

  }
})

export { DisplayOverviewData }
