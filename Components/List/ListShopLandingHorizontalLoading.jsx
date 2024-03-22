import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import FastImage from "react-native-fast-image";

const ListShopLandingHorizontalLoading = () => {
  return (
      <View style={styles.container}>

        <View style={styles.image_container}>
          <View  style={styles.image} />
        </View>

      </View>

  )
}

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
    height: 100
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
export {ListShopLandingHorizontalLoading}
