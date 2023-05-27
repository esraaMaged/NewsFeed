import { View, Text } from "react-native";
import { StackScreenProps } from "../App";
import { useTheme } from "@react-navigation/native";
import Selector from '../translations/LanguageSelector';
//localization
import { useTranslation } from "react-i18next";

function SettingsScreen({ route }: StackScreenProps<"Settings">) {
  //localization
  const { i18n } = useTranslation();
  let lang = i18n.language;
  let isLangRTL = lang === "ar";
  //theme
  const { colors } = useTheme();
  return <View style={[{ backgroundColor: colors.background }, {direction: isLangRTL ? "rtl" : "ltr"}]} >
    <Selector />
  </View>
}

export default SettingsScreen;
