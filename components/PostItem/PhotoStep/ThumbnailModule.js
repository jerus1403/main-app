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

const ThumbnailModule = ({ imageList, removePhoto, toggleModal, setIndex }) => {
  // console.log(imageList, "THUMBNAIL");
  return (
    <TouchableOpacity
      onPress={() => {
        setIndex(0);
        toggleModal("photoViewerModal");
      }}
      style={[styles.container, shadow.shadow_one]}
    >
      <ImageBackground
        source={{ uri: imageList[0].url }}
        style={styles.thumbnailContainter}
      >
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => removePhoto(imageList[0].id)}
        >
          <Ionicons
            name='ios-close-circle'
            size={30}
            color={colors.delete}
            style={styles.icon}
          />
        </TouchableOpacity>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginBottom: 5,
    borderRadius: 5
  },
  thumbnailContainter: {
    width: "100%",
    height: 200
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
    alignSelf: "center"
  }
});

export default ThumbnailModule;
