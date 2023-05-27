import NewsArticleModel from "../models/NewsArticleModel";
import MainMenuItem from "./MainMenuItem";
import {
  FlatList,
  StyleSheet,
  Dimensions,
  RefreshControl,
} from "react-native";
import { ListRenderItem } from "react-native";

let deviceWidth = Dimensions.get("window").width;

type Pram = {
  menuData: NewsArticleModel[];
  onMenuItemPressed(action: NewsArticleModel): void;
  refreshControl(): void;
};

function MainMenu(props: Pram) {

  function onPressedHandler(itemDetails: NewsArticleModel) {
    props.onMenuItemPressed(itemDetails);
  }
  const renderCategoryItem: ListRenderItem<NewsArticleModel> = ({ item }) => (
    <MainMenuItem
      title={item.title}
      img={item.urlToImage}
      onPress={onPressedHandler.bind(null, item)}
    />
  );

  let refreshing = false;
  function onRefresh() {
    refreshing = true;
    render();
  }
  function render() {
    if (refreshing) {
      refreshing = false;
      props.refreshControl();
    }
  }

  return (
    <FlatList
      style={styles.flatlistStyle}
      data={props.menuData}
      keyExtractor={(item, index) => item.author +index}
      renderItem={renderCategoryItem}
      refreshControl={
        <RefreshControl
          //refresh control used for the Pull to Refresh
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }
    />
  );
}

export default MainMenu;

const styles = StyleSheet.create({
  container: {},
  flatlistStyle: {
    flex: 1,
    width: deviceWidth,
  },
});
