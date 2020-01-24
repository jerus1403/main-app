import { StyleSheet } from "react-native";

export const colors = {
  theme: "#3ec1d3",
  easyGreen: "#1ebbd7",
  white: "#fff",
  lightWhite: "#f7f7f7",
  mainText: "black",
  fadedGrey: "#a7adba",
  lightGray: "#ebebe4",
  invisible: "#dddddd",
  lightBlack: "#555555",
  mainGreen: "#4bb543",
  // lightGreen: "#3ec1d3",
  tomato: "tomato",
  darkGreen: "#0fabbc",
  darkBlue: "#202E74",
  delete: "#fa163f",
  cancel: "#e4f9ff"
};

export const shadow = StyleSheet.create({
  shadow_one: {
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 5,
    borderRadius: 5,
    backgroundColor: "white"
  }
});
