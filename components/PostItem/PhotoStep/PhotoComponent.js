import React, { useState, useReducer, useCallback, useEffect } from "react";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import { useDispatch, connect } from "react-redux";
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
  Alert
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { colors } from "../../../styleUtility/colors";

const PhotoComponent = props => {
  [imageArray, setImgArray] = useState([]);
  //Ask Permission for Camera
  const cameraPermission = async () => {
    const result = await Permissions.askAsync(
      Permissions.CAMERA,
      Permissions.CAMERA_ROLL
    );
    if (result.status !== "granted") {
      Alert.alert("You need to grant the camera access first!", [
        { text: "OK" }
      ]);
      return false;
    }
    return true;
  };

  //Ask Permission for Gallery
  const galleryPermission = async () => {
    const result = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (result.status !== "granted") {
      Alert.alert("You need to grant access to the gallery first!", [
        { text: "OK" }
      ]);
      return false;
    }
    return true;
  };

  //Select Photo from Gallery Handler
  const selectPhotoHandler = async () => {
    const hasGalleryPermission = await galleryPermission();
    let arr = [];
    if (!hasGalleryPermission) {
      return;
    }
    const image = await ImagePicker.launchImageLibraryAsync({ base64: true });
    const imageName = image.uri.split("/").pop();
    const imageArray = imageName.split(".");
    const imageType = imageArray[imageArray.length - 1];

    if (!image.cancelled) {
      const imageObj = {
        data: image.base64,
        type: imageType,
        uri: image.uri
      };
      setImgArray(oldArr => [...oldArr, imageObj]);
    }
  };

  const displayImages = () => {
    if (imageArray) {
      return imageArray.map(el => {
        console.log(el, "ELEMENT");
        return (
          <View key={el.uri} style={styles.imageContainer}>
            <Image
              style={styles.postImage}
              source={{ uri: el.uri ? el.uri : "" }}
            />
          </View>
        );
      });
    }
  };

  console.log(imageArray, "IMAGEs");
  return (
    <View>
      {imageArray.length == 0 ? (
        <View style={styles.container}>
          <View style={styles.buttons}>
            <Button title='TAKE PHOTO' color={colors.white} />
          </View>
          <View style={styles.buttons}>
            <Button
              title='SELECT PHOTO'
              color={colors.white}
              onPress={selectPhotoHandler}
            />
          </View>
        </View>
      ) : (
        <View style={styles.container}>
          <View>{displayImages()}</View>
          <View style={styles.addButton}>
            <Button
              title='ADD'
              color={colors.white}
              onPress={selectPhotoHandler}
            />
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center"
  },
  buttons: {
    marginTop: 10,
    width: "60%",
    backgroundColor: colors.theme
  },
  imageContainer: {
    margin: 5
  },
  postImage: {
    alignSelf: "center",
    height: 60,
    width: 60
  },
  addButton: {
    marginTop: 10,
    width: 80,
    height: "auto",
    backgroundColor: colors.theme
  }
});

export default PhotoComponent;
