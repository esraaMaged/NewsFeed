import { Pressable, View, Text, StyleSheet, Platform, Image, Dimensions } from 'react-native';

type Param = {
  title: string
  img: string
  // description: string
  // source: string
  // author: string
  // content: string
  // publishedAt: string

  onPress: () => void
}
let deviceWidth = Dimensions.get("window").width;
function MainMenuItem(props: Param){
    return(
        <View style={styles.gridItem}>
      <Pressable
        android_ripple={{ color: '#ccc' }}
        style={({ pressed }) => [
          styles.button,
          pressed ? styles.buttonPressed : null,
        ]}
        onPress={props.onPress}
      >
        <View style={[styles.innerContainer]}>
          <Image style={styles.imageStyle} source={{uri: props.img}}/>
          <Text style={styles.title}>{props.title}</Text>
        </View>
      </Pressable>
    </View>
    )
}

export default MainMenuItem

const styles = StyleSheet.create({
    gridItem: {
      flex: 1,
      margin: 12,
      borderRadius: 8,
      elevation: 4,
      backgroundColor: 'white',
      shadowColor: 'black',
      shadowOpacity: 0.25,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 8,
      overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
      height: 120,
    },
    button: {
      flex: 1,
    },
    buttonPressed: {
      opacity: 0.5,
    },
    innerContainer: {
      flex: 1,
      padding: 16,
      borderRadius: 8,
      alignItems: 'center',
      flexDirection: "row",
    },
    title: {
      fontWeight: 'bold',
      fontSize: 15,
      color: "#0B5345", 
      padding: 6,
      maxWidth: deviceWidth*2/3
    },
    imageStyle: {
      height: 100,
      width: 100,
      borderRadius: 8
    },
  })