import React from 'react';
import { Text, Dimensions, View, ImageBackground,} from "react-native";
import { StyleSheet } from "react-native";
import { StackScreenProps } from "../App";
import MainMenuItemModel from "../models/MainMenuItemModel";
import MainMenu from "../components/MainMenu";
import { useEffect, useState } from "react";
import { NEWS_URL } from "../utils/httpRequests";
import axios from "axios";
import NewsArticleModel from "../models/NewsArticleModel";
import { LinearGradient } from "expo-linear-gradient";
import { SearchBar } from "@rneui/themed";

let deviceWidth = Dimensions.get("window").width;
function MainScreen({ navigation }: StackScreenProps<"Home">) {
  const [fetchedNews, setFetchedNews] = useState<NewsArticleModel[]>([]);

  const [search, setSearch] = useState("");
  const [filteredNews, setFilteredNews] = useState<NewsArticleModel[]>([]);

  useEffect(() => {
    fetchUser();
  }, []);

  /// fetchData functionality
  const fetchUser = async () => {
    /// get data from api
    const url = NEWS_URL;
    const response = await axios.get(url);
    /// render data type
    let newsObj: MainMenuItemModel = response.data;
    let listOfNewArticles: NewsArticleModel[] = newsObj.articles;
      // console.log(listOfNewArticles)
    /// set state of changed data
    setFetchedNews(listOfNewArticles);
    setFilteredNews(listOfNewArticles);
  };

  /// pull to refresh functionality
  function menuGotRefreshed(){
    fetchUser()
  }

  /// Search Fuctionality
  const searchFilterFunction = (text: string) => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the MainNewsArray
      // Update FilteredNewsArray
      const newData = fetchedNews.filter(function (item) {
        const itemData = item.title
          ? item.title.toUpperCase()
          : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredNews(newData);
      setSearch(text);
    } else {
      // Inserted text is blank
      // Update FilteredNewsArray with MainNewsArray
      setFilteredNews(fetchedNews);
      setSearch(text);
    }
  };

  function menuItemPressed(itemDetails: NewsArticleModel) {
    // console.log(itemDetails);
    
    navigation.navigate("NewsDetails", {
      itemDetails: itemDetails,
    });
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
            <SearchBar
              platform="default"
              round
              lightTheme
              searchIcon={{ size: 24 }}
              onChangeText={(text: string) => searchFilterFunction(text)}
              onClear={() => searchFilterFunction("")}
              placeholder="Type Here..."
              value={search}
              containerStyle={styles.searchBarStyle}
              inputContainerStyle={styles.searchBarInnerStyle}
            />
            <MainMenu
              menuData={filteredNews}
              onMenuItemPressed={menuItemPressed}
              refreshControl= {menuGotRefreshed}
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
    width: deviceWidth,
  },
  searchBarStyle: {
    backgroundColor: "transparent",
  },
  searchBarInnerStyle: {
    backgroundColor: "#fff",
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
  scrollView: {
    flex: 1,
    backgroundColor: 'pink',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
