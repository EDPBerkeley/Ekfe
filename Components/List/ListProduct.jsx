import { CATEGORIES, ICONWRAPPER } from "../../Constants";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const ListProduct = ({name, category, price, description, navigation, product } ) => {
  description = "Description: " + description
  let phone_number = 1234567890
  let qty_string = "Qty: " + product.quantity
  category = CATEGORIES[category]
  return(
    <TouchableOpacity onPress={() => navigation.navigate("ProductScreen", { shop : shop })}>

      <View style={container_styles.list}>


        <View style={container_styles.header}>
          <View style={container_styles.intermediate}>
            <Text style={[text_styles.store_name]}>{name}</Text>
            <View style={container_styles.info_row}>
              <Text style={[text_styles.info_text_first_item, text_styles.info]}>{category}</Text>
              <Text style={[text_styles.info_text_other_items, text_styles.info]}>{qty_string}</Text>
            </View>
          </View>
        </View>

        <View style={container_styles.description}>
          <Text numberOfLines={4} style={text_styles.description}>{ description }</Text>
        </View>

        <View style={container_styles.divider}/>


      </View>

    </TouchableOpacity>
  )
};

const container_styles = StyleSheet.create({

  list: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 22
  },
  intermediate: {
    flexDirection: 'column'
  },
  info_row: {
    flexDirection: 'row',
    alignItems: "center",
    paddingTop: 1
  },
  rating: {
    paddingRight: 15,
    paddingTop: 5
  },
  description: {
    flex: 3,
    paddingTop: 9
  },
  cost: {
    fontSize: 11,
    flexDirection: "row",
    paddingBottom: .025,
    marginEnd: -3,
    color: "#484848",
  },
  cost_container: {
    paddingHorizontal: 13
  },
  divider: {
    flexDirection: "row",
    backgroundColor: "#8E0000",
    paddingHorizontal: 15,
    marginTop: 10,
    height: 1

  }
})

const text_styles = StyleSheet.create({
  store_name : {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Roboto-Bold',
    color: "#343434"
  },
  info_text_other_items: {
    paddingLeft: 13
  },
  info_text_first_item: {

  },
  rating: {
  },
  info: {
    fontSize: 12.5,
    fontFamily: 'Roboto-Light',
  },
  description: {
    fontFamily: 'Roboto-Light',
    fontSize: 12.5
  },
  phone_number: {
    textDecorationLine: 'underline',
    color: "#007bff"
  },
  category: {
    fontWeight: 'bold'
  }
})


const rating_stylesheet = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: 50,
    height: 22.5,
    backgroundColor: "#8E0000",
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "space-evenly"
  },
  rating_text: {
    fontFamily: "Roboto-bold",
    color: "#FFFFFF",
    fontSize: 16,
    paddingTop: 1
  },
  star_container: {

  },
  star: {
    fontSize: 15,
    color: "#FFFFFF"
  }
})

export { ListProduct }
