import React from "react";
import { StyleSheet, Text, View, Image, ImageBackground } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default function Header({ title, navigation }) {

  return (
    <View style= {styles.header}>
      <View style={styles.headerTitle}>
        <Text style={styles.headerText}>{title}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 20,
    color: "white",
    letterSpacing: 1,
    marginLeft:10
  },
  icon: {
    alignContent: "flex-start",
    left: 0,
    color:"white"
  },
  headerTitle: {
    flexDirection: "row",
    marginLeft: 20,
  },
  headerImage: {
    width: 26,
    height: 26,
    marginHorizontal: 10,
  },
});
