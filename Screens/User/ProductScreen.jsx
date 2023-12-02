import { View } from "react-native";
import { MainText, TabBar } from "../../Components";

const ProductScreen = ({navigation}) => {

  return(
    <View flex={1}>
      <MainText text={"ProductScreen"}/>
      <TabBar navigation={navigation}/>
    </View>
  )
}

export default ProductScreen;
