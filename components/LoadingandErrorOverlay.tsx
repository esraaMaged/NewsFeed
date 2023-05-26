import { View, ActivityIndicator, StyleSheet, ImageBackground, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { useTheme } from '@react-navigation/native';
import {useColorScheme} from 'react-native';

type Param = {
  isLoading: boolean
}
function LoadingAndErrorOverlay(props: Param) {
  //theme
  const { colors } = useTheme();
  const scheme = useColorScheme();
  let gradientBackGroundEnd = scheme === "dark" ? "#FCA009" : "#0B5345"
  return (
    <LinearGradient colors={[colors.background, gradientBackGroundEnd]} style={styles.rootScreen}>
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
