import React, {useCallback} from 'react';
import {
  View,
  ImageBackground,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  Pressable,
  Alert
} from "react-native";
import * as Linking from 'expo-linking';
import { StackScreenProps } from "../App";
import { LinearGradient } from "expo-linear-gradient";
import NewsArticleModel from "../models/NewsArticleModel";
import { useTheme } from "@react-navigation/native";
import { useColorScheme } from "react-native";
//localization
import { useTranslation } from "react-i18next";

function NewsDetailsScreen({ route }: StackScreenProps<"NewsDetails">) {
  const itemDetails: NewsArticleModel = route.params.itemDetails;
  //   console.log(itemDetails);
  let strSplitDate = String(itemDetails.publishedAt).split("T");
  let date = strSplitDate[0];
  //theme
  const { colors } = useTheme();
  const scheme = useColorScheme();
  //localization
  const { t } = useTranslation();

  let url = itemDetails.url
  const handlePress = useCallback(async () => {
    // Checking if the link is supported for links with custom URL scheme.
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      // Opening the link with some app, if the URL scheme is "http" the web link should be opened
      // by some browser in the mobile
      await Linking.openURL(url);
    } else {
      Alert.alert(`You need to install "${url.split(":")[0]}" App to open this URL: ${url}`);
    }
  }, [url]);

  let gradientBackGroundEnd = scheme === "dark" ? "#DE9954" : "#0B5345";
  return (
    <LinearGradient
      colors={[colors.background, gradientBackGroundEnd]}
      style={styles.rootScreen}
    >
      <ImageBackground
        source={require("../assets/newsbackgroundImage.png")}
        resizeMode="cover"
        style={styles.rootScreen}
        imageStyle={styles.backgroundImage}
      >
        <ScrollView>
          <View style={styles.container}>
            <Image
              style={styles.imageStyle}
              source={{ uri: itemDetails.urlToImage }}
            />
            <Text style={styles.title}> {itemDetails.title} </Text>
            <View style={styles.subViewStyle}>
              <Text style={styles.descStyle}> {itemDetails.description}</Text>
              <Text style={styles.contentStyle}> {itemDetails.content} </Text>
              <View style={styles.finalDetailsViewStyle}>
                <Text>{itemDetails.source.name}</Text>
                <Text style={styles.publishedAtStyle}>{date}</Text>
                <Text style={styles.publishedAtStyle}>
                  {"By: " + itemDetails.author}
                </Text>
              </View>
            </View>
            <Pressable style={[styles.buttonStyle, {backgroundColor: colors.border}]} onPress={handlePress} >
              <Text style={[styles.textInButtonStyle, {color: colors.text}]} >{t('common:openLink')}</Text>
            </Pressable>
          </View>
        </ScrollView>
      </ImageBackground>
    </LinearGradient>
  );
}

export default NewsDetailsScreen;

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
  },
  backgroundImage: {
    opacity: 0.15,
  },
  container: {
    flex: 1,
  },
  title: {
    margin: 16,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    color: "#fff",
    fontWeight: "bold",
    fontSize: 24,
  },
  imageStyle: {
    height: 200,
    width: "100%",
    borderRadius: 8,
  },
  subViewStyle: {
    borderColor: "#fff",
    borderRadius: 8,
    borderWidth: 2,
    margin: 8,
  },
  descStyle: {
    margin: 8,
    justifyContent: "flex-start",
    textAlign: "left",
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
  contentStyle: {
    margin: 8,
    justifyContent: "flex-start",
    textAlign: "left",
    color: "#1C2833",
    fontWeight: "bold",
    fontSize: 18,
  },
  finalDetailsViewStyle: {
    flexDirection: "row",
    margin: 8,
  },
  publishedAtStyle: {
    marginLeft: 16,
  },
  buttonStyle: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 12,
      paddingHorizontal: 32,
      borderRadius: 6,
      elevation: 3,
      margin: 16,
      marginBottom: 70
    },
    textInButtonStyle: {
      fontSize: 16,
      lineHeight: 21,
      fontWeight: 'bold',
      letterSpacing: 0.25,
    },
});
