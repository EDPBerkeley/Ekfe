import { MainText, TabBar } from "../../Components";
import { View } from "react-native";

const StorefrontScreen = ({navigation}) => {
  return(
    <View flex={1}>
      <MainText text="Storefront Screen"/>
      <TabBar navigation={navigation}/>
    </View>
  )
}

export default StorefrontScreen;
