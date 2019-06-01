import { StyleSheet } from "react-native";
import { metrics, colors } from "../../styles";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lighter
  },
  loading: {
    marginTop: metrics.baseMargin * 2
  }
});
