import { View, StyleSheet, Text } from "react-native";
import React from "react";
const DisplayOverviewData = ({ stat_name, stat }) => {
  return(

    <View>
      <View style={container_styles.data_block}>

        <Text style={text_styles.stat}> {stat} </Text>
        <Text style={text_styles.stat_name}> {stat_name} </Text>




      </View>

      <View style={container_styles.divider}/>

    </View>


  )
}

const container_styles = StyleSheet.create({
  data_block: {
    alignItems: 'center',
    paddingVertical: 50,
    // marginHorizontal: 10,
    // marginVertical: 7
  },
  divider: {
    // flexDirection: "row",
    backgroundColor: "#8E0000",
    marginHorizontal: 30,
    marginTop: 10,
    height: 1

  }

})

const text_styles= StyleSheet.create({
  stat_name: {
    fontSize: 11,
    color: "#383838"
  },
  stat: {
    fontSize: 30,
    fontWeight: "600",
    color: "#1c1c1c"
  }
})

export { DisplayOverviewData }
