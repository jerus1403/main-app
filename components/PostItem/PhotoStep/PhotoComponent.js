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
  TouchableOpacity,
  Dimensions
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { colors } from "../../../styleUtility/colors";
import ThumbnailModule from "./ThumbnailModule";
import ImageListModule from "./ImageListModule";
import ImageViewerModal from "../../UI/ImageViewerModal";
import * as post from "../../../store/actions/post";

const PhotoComponent = ({ imageList, setImgArray, state }) => {
  [isViewerVisible, setViewer] = useState(false);
  [currentImgIndex, setIndex] = useState();
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

  //Check if object exists method
  const checkObject = (obj, list) => {
    let found = list.some(el => el.data === obj.data);
    if (found) {
      return true;
    } else {
      return false;
    }
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
        url: image.uri
      };

      if (!checkObject(imageObj, imageList)) {
        setImgArray(oldArr => [...oldArr, imageObj]);
      } else {
        alert("Photo added already. Please choose another photo!");
      }
    }
  };

  //Remove photo method from List
  const removePhoto = id => {
    let newList = imageList.filter(el => el.data !== id);
    setImgArray([...newList]);
  };

  //Set covered photo
  const setCoveredPhoto = indexB => {
    let temp = imageList[0];
    imageList[0] = imageList[indexB];
    imageList[indexB] = temp;
    setImgArray([...imageList]);
  };
  console.log(state.imageList, "REDUCER");
  return (
    <View>
      {imageList.length > 0 ? (
        <View style={styles.container}>
          <ThumbnailModule
            imageList={imageList}
            removePhoto={removePhoto}
            setViewer={setViewer}
            setIndex={setIndex}
          />
          <ImageListModule
            imageList={imageList}
            selectPhotoHandler={selectPhotoHandler}
            removePhoto={removePhoto}
            setCoveredPhoto={setCoveredPhoto}
            setViewer={setViewer}
            setIndex={setIndex}
          />
          <ImageViewerModal
            isViewerVisible={isViewerVisible}
            imageList={imageList}
            setViewer={setViewer}
            currentImgIndex={currentImgIndex}
          />
        </View>
      ) : (
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
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  buttons: {
    alignSelf: "center",
    width: "60%",
    marginTop: 10,
    backgroundColor: colors.theme
  }
});

const mapStateToProps = state => {
  return {
    state: state.post
  };
};

export default connect(mapStateToProps)(PhotoComponent);
