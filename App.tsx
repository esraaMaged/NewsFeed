import { StyleSheet } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator, NativeStackScreenProps } from "@react-navigation/native-stack";
import MainScreen from './screens/MainScreen';
import NewsDetailsScreen from './screens/NewsDetailsScreen';
import NewsArticleModel from './models/NewsArticleModel';
import SettingsScreen from './screens/SettingsScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

// color scheme hook
import {useColorScheme} from 'react-native';
// theme components and the navigation container
import {DarkTheme,DefaultTheme} from '@react-navigation/native'; 

const BottomTabs = createBottomTabNavigator<StackParamList>();
function NewsBottomTabs() {
  return (
    <BottomTabs.Navigator
      screenOptions={({ navigation }) => ({
        // headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        // headerTintColor: 'white',
        // tabBarStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        // tabBarActiveTintColor: GlobalStyles.colors.accent500,
        // headerRight: ({ tintColor }) => (
        //   <IconButton
        //     icon="add"
        //     size={24}
        //     color={tintColor}
        //     onPress={() => {
        //       navigation.navigate('ManageExpense');
        //     }}
        //   />
        // ),
      })}
    >
      <BottomTabs.Screen
        name="News"
        component={MainScreen}
        options={{
          title: 'Recent News',
          tabBarLabel: 'News',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="newspaper" size={size} color={color} />
          ),
        }}
      />
      <BottomTabs.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          title: 'Settings',
          tabBarLabel: 'Settings',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings" size={size} color={color} />
          ),
        }}
      />
    </BottomTabs.Navigator>
  );
}


export default function App() {
  const scheme = useColorScheme();
  const Stack = createNativeStackNavigator<StackParamList>();
  return (
    <NavigationContainer theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack.Navigator>
        <Stack.Screen options={{headerShown: false}} name="NewsBottomTabs" component={NewsBottomTabs} />
        <Stack.Screen name="NewsDetails" component={NewsDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

type StackParamList = {
  NewsBottomTabs: undefined
  News: undefined
  Settings: undefined
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
