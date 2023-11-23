import { Text, View, StyleSheet } from "react-native";
import { CATEGORIES, ICONWRAPPER } from "../../Constants";
import Feather from "react-native-vector-icons/Feather";



const NumCost = (numSigns) => {
  let finalComponents = []
  const SelectedIcon = ICONWRAPPER["Feather"]

  for (let i = 0; i < numSigns + 1; i++) {
    finalComponents.push(
      <SelectedIcon style={container_styles.cost} name={"dollar-sign"}/>
    )
  }

  return finalComponents
}

const Rating = (rating) => {
  return (
    <View style={rating_stylesheet.container}>
      <ICONWRAPPER["AntDesign"] style=star>
      <Text style={rating_stylesheet.rating_text}>{rating}</Text>
    </View>

  )
}

const rating_stylesheet = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: 60,
    height: 22.5,
    backgroundColor: "#8E0000",
    borderRadius: 4,
    alignItems: "center"
  },
  rating_text: {
    fontFamily: "Roboto-bold",
    color: "#FFFFFF"
  },
  star: {
    fontSize: 15,
    color: "#FFFFFF"
  }
})
const ListItem = ({name, category, phone_number, cost, distance, rating, description}) => {

  const CostComponents = NumCost(cost)
  description = "Description: " + description
  distance = distance + " mi"
  category = CATEGORIES[category]
  const b = Rating(rating)
  return(

    <View style={container_styles.list}>
      <View style={container_styles.header}>
        <View style={container_styles.intermediate}>
          <Text style={[text_styles.store_name]}>{name}</Text>
          <View style={container_styles.info_row}>
            <Text style={[text_styles.info_text_first_item, text_styles.info]}>{category}</Text>
            <Text style={[text_styles.info_text_other_items, text_styles.info, text_styles.phone_number]}>{phone_number}</Text>
            <View style={container_styles.cost_container}>
              <View style={container_styles.cost}>{NumCost(cost)}</View>
            </View>
            <Text style={[text_styles.info_text_other_items, text_styles.info]}>{distance}</Text>
          </View>
        </View>
        {Rating(rating)}

      </View>

      <View style={container_styles.description}>
        <Text style={text_styles.description}>{ description }</Text>
      </View>




    </View>
  )
};

const container_styles = StyleSheet.create({

  list: {
    paddingLeft: 15,
    paddingRight: 15
  },
  header: {
    flexDirection: 'row',
    paddingTop: 10,
    justifyContent: 'space-between',
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




})

const text_styles = StyleSheet.create({
  store_name : {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Roboto-Bold',
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

export {ListItem};
