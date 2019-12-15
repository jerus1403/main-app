import React from "react";
import { TouchableOpacity } from "react-native";

const ButtonModule = ({ style, onPress, children }) => {
  return (
    <TouchableOpacity style={style} onPress={onPress}>
      {children}
    </TouchableOpacity>
  );
};

export default ButtonModule;
