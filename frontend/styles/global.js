import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";
const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

export const globalStyles = StyleSheet.create({
  titleText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    alignItems: "center",
    marginLeft: 50,
  },
  paragraph: {
    marginVertical: 8,
    lineHeight: 20,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
    paddingBottom: 100,
  },
  input: {
    borderWidth: 2,
    borderColor: "#ddd",
    padding: 15,
    fontSize: 18,
    borderRadius: 6,
    marginLeft: 15,
  },
  errorText: {
    color: "crimson",
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 6,
    textAlign: "center",
  },
});
