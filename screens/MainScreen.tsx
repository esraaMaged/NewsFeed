import { Text, Dimensions, View, ImageBackground } from "react-native";
import { StyleSheet } from "react-native";
import { StackScreenProps } from "../App";
import MainMenuItemModel from "../models/MainMenuItemModel";
import MainMenu from "../components/MainMenu";
import { useEffect, useState } from "react";
import { NEWS_URL } from "../utils/httpRequests";
import axios from "axios";
import NewsArticleModel from "../models/NewsArticleModel";
import { LinearGradient } from "expo-linear-gradient";

let deviceWidth = Dimensions.get("window").width;
function MainScreen({ navigation }: StackScreenProps<"Home">) {
  const [fetchedNews, setFetchedNews] = useState<NewsArticleModel[]>([]);

  useEffect(() => {
    const fetchUser = async () => {
      /// get dta from api
      const url = NEWS_URL;
      const response = await axios.get(url);
      /// render data type
      let newsObj: MainMenuItemModel = response.data;
      let listOfNewArticles: NewsArticleModel[] = newsObj.articles;
      //   console.log(listOfNewArticles)
      /// set state of changed data
      setFetchedNews(listOfNewArticles);
    };
    fetchUser();
  }, []);

  function menuItemPressed(itemDetails: NewsArticleModel) {
    // console.log(itemDetails);
    navigation.navigate("NewsDetails" , {
      itemDetails: itemDetails
    } )
  }

  return (
    <LinearGradient colors={["#F5B7B1", "#154360"]} style={styles.rootScreen}>
      <ImageBackground
        source={require("../assets/newsbackgroundImage.png")}
        resizeMode="cover"
        style={styles.rootScreen}
        imageStyle={styles.backgroundImage}
      >
        <View style={styles.container}>
          <Text style={styles.title}> Latest News </Text>
          <MainMenu
            menuData={fetchedNews}
            onMenuItemPressed={menuItemPressed}
          />
        </View>
      </ImageBackground>
    </LinearGradient>
  );
}
export default MainScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    margin: 16,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    color: "#0E6655",
    fontWeight: "bold",
    fontSize: 22,
  },
  menuStyle: {
    flex: 1,
    width: deviceWidth,
  },
  rootScreen: {
    flex: 1,
  },
  backgroundImage: {
    opacity: 0.15,
  },
});
