import { CATEGORIES, ICONWRAPPER } from "../../Constants";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const ListProductData = ({name, category, price, description, navigation, product } ) => {
  description = "Description: " + description
  let phone_number = 1234567890
  let qty_string = "Qty: " + product.quantity
  const revenue = Math.floor(Math.random() * 900) + 100;
  var units_sold = Math.floor(Math.random() * 50) + 1;
  const rating = Math.floor(Math.random() * 30 + 20) / 10;
  category = CATEGORIES[category]
  return(

      <View style={container_styles.list}>


        <View style={container_styles.header}>


          <Text style={[text_styles.store_name, container_styles.shop_name]}>{name}</Text>

          <View style={container_styles.info_row}>
            <Text style={[text_styles.info_text_first_item, text_styles.info]}>{category}</Text>
            <Text style={[text_styles.info_text_other_items, text_styles.info]}>{qty_string}</Text>
          </View>





          <View style={container_styles.stats_row}>
            <View style={container_styles.stat}>
              <Text style={text_styles.stat}>{revenue}</Text>
              <Text style={text_styles.stat_name}>Revenue (Dollars)</Text>
            </View>
            <View style={container_styles.stat}>
              <Text style={text_styles.stat}>{units_sold}</Text>
              <Text style={text_styles.stat_name}>Units Sold</Text>
            </View>
            <View style={container_styles.stat}>
              <Text style={text_styles.stat}>{rating}</Text>
              <Text style={text_styles.stat_name}>Rating</Text>
            </View>
          </View>


        </View>



      </View>


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

    justifyContent: 'space-between',
    paddingTop: 10,

    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    marginVertical: 7

  },
  stats_row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 8,
    paddingBottom: 15
  },
  stat: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingBottom: 5,
    // backgroundColor: "#e11717",
    paddingTop: 10


  },
  shop_name: {
    paddingLeft: 20,
    paddingTop: 5
  },
  top_text: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  info_row: {
    flexDirection: 'row',
    paddingRight: 35,
    paddingLeft: 22,
    paddingTop: 3
  },


})

const text_styles = StyleSheet.create({
  store_name : {
    fontSize: 24,
    fontWeight: 'bold',
    // fontFamily: 'Roboto-Bold',
    color: "#343434"
  },
  stat_name: {
    fontSize: 10
  },
  stat: {
    fontSize: 20
  },
  info_text_other_items: {
    paddingLeft: 13
  },
  rating: {
  },
  info: {
    fontSize: 10,
    fontFamily: 'Roboto-Light',
  },
})

export { ListProductData }
