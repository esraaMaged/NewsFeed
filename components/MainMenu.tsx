import NewsArticleModel from "../models/NewsArticleModel";
import MainMenuItem from "./MainMenuItem";
import { FlatList, StyleSheet, Dimensions } from "react-native";
import { ListRenderItem } from "react-native";

let deviceWidth = Dimensions.get("window").width

type Pram = {
  menuData: NewsArticleModel[];
  onMenuItemPressed(action:NewsArticleModel):void
}

function MainMenu(props: Pram)
{
  // console.log(props)
    function onPressedHandler(itemDetails: NewsArticleModel) {
        props.onMenuItemPressed(itemDetails);
    }
    const renderCategoryItem: ListRenderItem<NewsArticleModel> = ({ item }) => (
        // console.log(itemData);
          <MainMenuItem
            title={item.title}
            img={item.urlToImage}
            onPress={onPressedHandler.bind(null, item)}
          />
    )

      return(
        <FlatList
        style={styles.flatlistStyle}
        data={props.menuData}
        keyExtractor={(item) => item.author + item.title + item.urlToImage}
        renderItem={renderCategoryItem}
      />
      )
}

export default MainMenu

const styles = StyleSheet.create({
    container:{
      
    },
    flatlistStyle: {
      flex: 1,
      width: deviceWidth,
    },
  });