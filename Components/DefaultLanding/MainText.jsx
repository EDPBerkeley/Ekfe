import { Dimensions, StyleSheet, Text, View } from "react-native";
import { ListItem } from "../List";

const { width, height } = Dimensions.get('window');
const MainText = ({text}) => {



  return (
    <View style={Styles.container}>

      <Text style={Styles.text}>{text}</Text>
    </View>

  )

};

const Styles = StyleSheet.create({
  container : {
    flex : 1,

    justifyContent: 'center',
    alignItems: 'center'
  },
  text : {
    fontSize : 40,
    color : '#000000'

  }
});

export default MainText;
