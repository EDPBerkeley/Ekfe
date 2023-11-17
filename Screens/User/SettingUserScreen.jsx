import { Text, View } from "react-native";
import { MainText, TabBar } from "../../Components";

const SettingUserScreen = ({navigation}) => {
  return(
    <View flex={1}>
      <MainText text="Settings Screen"/>
      <TabBar navigation={navigation}/>
    </View>
  )
};

export default SettingUserScreen;
