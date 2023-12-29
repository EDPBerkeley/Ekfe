import { Title } from "../../Components/Title/title";
import { View } from "react-native";
import { MainText, TabBar } from "../../Components";
import { get_store_overview_data } from "../../API/store_overview";

const OverviewScreen = () => {

  // console.log("HIHIHIHI")
  //
  // get_store_overview_data()
  //   .then(data => {
  //     console.log(data)
  //   })

  return (
    <View flex={1}>
      <Title text="Storefront Overview"/>
      <MainText text="Overview Screen"/>
      <TabBar navigation={navigation}/>
    </View>
  )
}

export default OverviewScreen
