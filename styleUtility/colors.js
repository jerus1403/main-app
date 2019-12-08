import { StyleSheet } from "react-native";

export const colors = {
  theme: "tomato",
  easyGreen: "#1ebbd7",
  white: "#fff",
  lightWhite: "#f7f7f7",
  mainText: "black",
  fadedGrey: "#333333",
  invisible: "#dddddd",
  lightBlack: "#555555"
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
