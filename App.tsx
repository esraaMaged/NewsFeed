import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import MainScreen from "./screens/MainScreen";
import NewsDetailsScreen from "./screens/NewsDetailsScreen";
import NewsArticleModel from "./models/NewsArticleModel";
import SettingsScreen from "./screens/SettingsScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
//localization
import { useTranslation } from 'react-i18next'
import './translations/IMLocalize'
// color scheme hook
import { useColorScheme } from "react-native";
// theme components and the navigation container
import { DarkTheme, DefaultTheme } from "@react-navigation/native";

//linking
import * as Linking from "expo-linking"
const prefix = Linking.createURL("/");
  const linking = {
    prefixes: [prefix],
    config: {
      screens: {
        NewsBottomTabs: {
          path: "NewsBottomTabs",
          screens: {
            News: {
              path: "News",
            },
            Settings: {
              path: "Settings",
            },
          },
        },
        NewsDetails: "NewsDetails",
      },
    },
  };

const BottomTabs = createBottomTabNavigator<StackParamList>();
function NewsBottomTabs() {
  //localization
  const { t } = useTranslation();
  let newsTabLabel: string = t('navigate:home')
  let settingsTabLabel: string = t('navigate:settings')

  return (
    <BottomTabs.Navigator>
      <BottomTabs.Screen
        name="News"
        component={MainScreen}
        options={{
          title: newsTabLabel,
          tabBarLabel: newsTabLabel,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="newspaper" size={size} color={color} />
          ),
        }}
      />
      <BottomTabs.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          title: settingsTabLabel,
          tabBarLabel: settingsTabLabel,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings" size={size} color={color} />
          ),
        }}
      />
    </BottomTabs.Navigator>
  );
}

export default function App() {
  //localization
  const { t } = useTranslation();
  let NewsDetails: string = t('navigate:newsDetails')
  let backButtonTitle: string = t('navigate:back')

  const scheme = useColorScheme();
  const Stack = createNativeStackNavigator<StackParamList>();
  return (
    <NavigationContainer linking={linking} theme={scheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack.Navigator>
        
        <Stack.Screen
          options={{ headerShown: false }}
          name="NewsBottomTabs"
          component={NewsBottomTabs}
        />
        <Stack.Screen name="NewsDetails" component={NewsDetailsScreen} options={ {title:NewsDetails, headerBackTitleVisible: false}  }  />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

type StackParamList = {
  NewsBottomTabs: undefined;
  News: undefined;
  Settings: undefined;
  NewsDetails: { itemDetails: NewsArticleModel };
};

export type StackScreenProps<T extends keyof StackParamList> =
  NativeStackScreenProps<StackParamList, T>;

