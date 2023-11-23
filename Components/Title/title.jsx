import { Text, View, StyleSheet, SafeAreaView } from "react-native";
const Title = ({text}) => {
  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <Text style={styles.text}>{text}</Text>
      </SafeAreaView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 15,
    backgroundColor:'#8E0000',

  },
  text: {
    fontSize: 25,
    color: "#FFFFFF",
    fontWeight: 'bold'
  }
})

export {Title};
