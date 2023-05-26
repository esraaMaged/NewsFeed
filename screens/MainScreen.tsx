import React from "react";
import {
  Text,
  Dimensions,
  View,
  ImageBackground,
  ActivityIndicator,
} from "react-native";
import { StyleSheet } from "react-native";
import { StackScreenProps } from "../App";
import MainMenuItemModel from "../models/MainMenuItemModel";
import MainMenu from "../components/MainMenu";
import { useEffect, useState } from "react";
import { NEWS_URL } from "../utils/HttpRequests";
import axios from "axios";
import NewsArticleModel from "../models/NewsArticleModel";
import { LinearGradient } from "expo-linear-gradient";
import { SearchBar } from "@rneui/themed";
import LoadingAndErrorOverlay from "../components/LoadingandErrorOverlay";

import { useTheme } from '@react-navigation/native';
import {useColorScheme} from 'react-native';

let deviceWidth = Dimensions.get("window").width;
function MainScreen({ navigation }: StackScreenProps<"News">) {
  const [fetchedNews, setFetchedNews] = useState<NewsArticleModel[]>([]);

  const [search, setSearch] = useState("");
  const [filteredNews, setFilteredNews] = useState<NewsArticleModel[]>([]);

  const [isFetching, setIsFetching] = useState(false);
  const [hasError, setHasError] = useState(false);

  //theme
  const { colors } = useTheme();
  const scheme = useColorScheme();
  let gradientBackGroundEnd = scheme === "dark" ? "#DE9954" : "#0B5345"

  useEffect(() => {
    setIsFetching(true)
    fetchUser();
  }, []);

  /// fetchData functionality
  const fetchUser = async () => {
    /// get data from api
    const url = NEWS_URL;
    try {
      const response = await axios.get(url);
      /// render data type
      let newsObj: MainMenuItemModel = response.data;
      let listOfNewArticles: NewsArticleModel[] = newsObj.articles;
      // console.log(listOfNewArticles)
      /// set state of changed data
      setFetchedNews(listOfNewArticles);
      setFilteredNews(listOfNewArticles);
      setHasError(false)
    } catch (error) {
      setHasError(true)
    }
    setIsFetching(false)
  };

  if (isFetching) {
    return <LoadingAndErrorOverlay isLoading={true} />;
  }
  if (hasError && !isFetching) {
    return <LoadingAndErrorOverlay isLoading={false} />
  }


  /// pull to refresh functionality
  function menuGotRefreshed() {
    // console.log("pullToRefresh")
    fetchUser();
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
    <LinearGradient colors={[colors.background, gradientBackGroundEnd]} style={styles.rootScreen}>
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
            refreshControl={menuGotRefreshed}
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
});
