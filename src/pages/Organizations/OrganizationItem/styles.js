import { StyleSheet } from "react-native";
import { colors, metrics } from "../../../styles";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: metrics.baseRadius,
    padding: metrics.basePadding,
    marginTop: metrics.baseMargin,
    alignItems: "center",
    maxWidth: (metrics.screenWidth - 60) / 2
  },
  avatar: {
    width: 50,
    height: 50
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: metrics.baseMargin,
    color: colors.darker
  }
});
