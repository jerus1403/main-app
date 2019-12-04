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
  Alert,
  TouchableOpacity
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { colors } from "../../../styleUtility/colors";
import ThumbnailModule from "./ThumbnailModule";
import ImageListModule from "./ImageListModule";

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
    if (!hasGalleryPermission) {
      return;
    }
    const image = await ImagePicker.launchImageLibraryAsync({ base64: true });

    if (!image.cancelled) {
      const imageName = image.uri.split("/").pop();
      const imageArray = imageName.split(".");
      const imageType = imageArray[imageArray.length - 1];
      const imageObj = {
        data: image.base64,
        type: imageType,
        uri: image.uri
      };
      setImgArray(oldArr => [...oldArr, imageObj]);
    }
  };

  console.log(imageArray.length, "LENGTH");
  return (
    <View>
      {imageArray.length > 0 ? (
        <View style={styles.container}>
          <ThumbnailModule image={imageArray[0]} />
          <ImageListModule
            imageArray={imageArray}
            selectPhotoHandler={selectPhotoHandler}
          />
        </View>
      ) : (
        <View>
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
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  buttons: {
    marginTop: 10,
    alignSelf: "center",
    width: "60%",
    backgroundColor: colors.theme
  }
});

export default PhotoComponent;
