import { Title } from "../../Components/Title/title";
import { View } from "react-native";
import { MainText, TabBar } from "../../Components";

const OverviewScreen = () => {

  return (
    <View flex={1}>
      <Title text="Storefront Overview"/>
      <MainText text="Overview Screen"/>
      <TabBar navigation={navigation}/>
    </View>
  )
}

export default OverviewScreen
