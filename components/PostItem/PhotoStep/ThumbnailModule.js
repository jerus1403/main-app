import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  ScrollView,
  Image,
  TextInput,
  View,
  Button,
  FlatList,
  KeyboardAvoidingView,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
  ImageBackground
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { shadow, colors } from "../../../styleUtility/colors";

const ThumbnailModule = ({ imageList, removePhoto }) => {
  // useEffect(() => {
  //   console.log(imageList, "IMAGE LIST");
  // }, [imageList]);
  return (
    <ImageBackground
      source={{ uri: imageList[0].uri }}
      style={[styles.thumbnailContainter, shadow.shadow_one]}
    >
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => removePhoto(imageList[0].data)}
      >
        <Ionicons
          name='ios-close-circle'
          size={30}
          color={colors.theme}
          style={styles.icon}
        />
      </TouchableOpacity>
      {/* <Image source={{ uri: imageList[0].uri }} style={styles.thumbnailImage} /> */}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  thumbnailContainter: {
    flex: 1,
    marginVertical: 10,
    marginTop: 30,
    width: "90%",
    height: 170,
    borderRadius: 5,
    alignSelf: "center"
  },
  thumbnailImage: {
    borderRadius: 5,
    height: 170,
    width: "100%"
  },
  deleteButton: {
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    right: -15,
    top: -15
  },
  icon: {
    // borderRadius: 15,
    // backgroundColor: colors.lightBlack,
    alignSelf: "center"
  }
});

export default ThumbnailModule;
