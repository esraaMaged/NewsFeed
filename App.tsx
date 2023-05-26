import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator, NativeStackScreenProps } from "@react-navigation/native-stack";
import MainScreen from './screens/MainScreen';
import NewsDetailsScreen from './screens/NewsDetailsScreen';
import NewsArticleModel from './models/NewsArticleModel';

// color scheme hook
import {useColorScheme} from 'react-native';
// theme components and the navigation container
import {DarkTheme,DefaultTheme} from '@react-navigation/native'; 

export default function App() {
  const scheme = useColorScheme();
  // console.log("system theme" + scheme)
  const Stack = createNativeStackNavigator<StackParamList>();
  return (
    <NavigationContainer theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={MainScreen} />
        <Stack.Screen name="NewsDetails" component={NewsDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

type StackParamList = {
  Home: undefined
  NewsDetails: {itemDetails: NewsArticleModel}
}

export type StackScreenProps<T extends keyof StackParamList> = NativeStackScreenProps< StackParamList, T>

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
