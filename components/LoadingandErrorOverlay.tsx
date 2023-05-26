import { View, ActivityIndicator, StyleSheet, ImageBackground, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

type Param = {
  isLoading: boolean
}
function LoadingAndErrorOverlay(props: Param) {
  return (
    <LinearGradient colors={["#F5B7B1", "#154360"]} style={styles.rootScreen}>
      <ImageBackground
        source={require("../assets/newsbackgroundImage.png")}
        resizeMode="cover"
        style={styles.rootScreen}
        imageStyle={styles.backgroundImage}
      >
        <View style={styles.container}>
          { props.isLoading && <ActivityIndicator size="large" color="white" />}
          { !props.isLoading && <Text>Error Occured!, can't fetch data</Text>}
        </View>
      </ImageBackground>
   </LinearGradient>
  );
}

export default LoadingAndErrorOverlay;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  rootScreen: {
    flex: 1,
  },
  backgroundImage: {
    opacity: 0.15,
  },
});
