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
  TouchableOpacity,
  Dimensions
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { colors } from "../../../styleUtility/colors";
import ThumbnailModule from "./ThumbnailModule";
import ImageListModule from "./ImageListModule";
import ImageViewerModal from "../../UI/ImageViewerModal";
import ButtonModule from "../../UI/ButtonModule";
import { fonts } from "../../../styleUtility/fonts";

const PhotoComponent = ({
  imageList,
  setImgArray,
  reducer,
  toggleModal,
  openModal,
  closeModal
}) => {
  [isViewerVisible, setViewer] = useState(false);
  [currentImgIndex, setIndex] = useState();
  [isPhotoButtonModalVisible, setPhotoButtonModal] = useState(false);

  // const toggleButtonModal = () => {
  //   setPhotoButtonModal(prevState => !prevState);
  // };

  //Ask Permission for Camera
  const cameraPermission = async () => {
    const result = await Permissions.askAsync(
      Permissions.CAMERA,
      Permissions.CAMERA_ROLL
    );
    if (result.status !== "granted") {
      alert("You need to grant the camera access first!");
      return false;
    }
    return true;
  };

  //Ask Permission for Gallery
  // const galleryPermission = async () => {
  //   const result = await Permissions.askAsync(Permissions.CAMERA_ROLL);
  //   if (result.status !== "granted") {
  //     alert("You need to grant access to the gallery first!");
  //     return false;
  //   }
  //   return true;
  // };

  //Check if object exists method
  // const checkObject = (obj, list) => {
  //   let found = list.some(el => el.id === obj.id);
  //   if (found) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // };

  //Take Photo Handler
  const takePhotoHandler = async () => {
    const hasCameraPermission = await cameraPermission();
    if (!hasCameraPermission) {
      return;
    }
    const cameraImage = await ImagePicker.launchCameraAsync({ base64: true });
    if (!cameraImage.cancelled) {
      const imageName = cameraImage.uri.split("/").pop();
      const imageArray = imageName.split(".");
      const imageType = imageArray[imageArray.length - 1];
      const imageObj = {
        id: cameraImage.base64,
        type: imageType,
        url: cameraImage.uri
      };
      setImgArray(oldArr => [...oldArr, imageObj]);
    }
    closeModal("photoButtonsModal");
  };

  // Select Photo from Gallery Handler
  // const selectPhotoHandler = async () => {
  //   const hasGalleryPermission = await galleryPermission();
  //   if (!hasGalleryPermission) {
  //     return;
  //   }
  //   const image = await ImagePicker.launchImageLibraryAsync({
  //     base64: true
  //   });
  //   closeModal("photoButtonsModal");
  //   if (!image.cancelled) {
  //     const imageName = image.uri.split("/").pop();
  //     const imageArray = imageName.split(".");
  //     const imageType = imageArray[imageArray.length - 1];
  //     const imageObj = {
  //       id: image.base64,
  //       type: imageType,
  //       url: image.uri
  //     };
  //     if (!checkObject(imageObj, imageList)) {
  //       closeModal("photoButtonsModal");
  //       setImgArray(oldArr => [...oldArr, imageObj]);
  //     } else {
  //       alert("Photo added already. Please choose another photo.");
  //       setTimeout(() => {
  //         closeModal("photoButtonsModal");
  //       }, 200);
  //     }
  //   }
  // };
  //Remove photo method from List
  const removePhoto = id => {
    let newList = imageList.filter(el => el.id !== id);
    setImgArray([...newList]);
  };

  //Set covered photo
  const setCoveredPhoto = indexB => {
    let temp = imageList[0];
    imageList[0] = imageList[indexB];
    imageList[indexB] = temp;
    setImgArray([...imageList]);
  };

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
            // selectPhotoHandler={selectPhotoHandler}
            takePhotoHandler={takePhotoHandler}
            removePhoto={removePhoto}
            setCoveredPhoto={setCoveredPhoto}
            setViewer={setViewer}
            setIndex={setIndex}
            // isPhotoButtonModalVisible={isPhotoButtonModalVisible}
            // toggleButtonModal={toggleButtonModal}
            openModal={openModal}
            toggleModal={toggleModal}
          />
          <ImageViewerModal
            isViewerVisible={isViewerVisible}
            imageList={imageList}
            setViewer={setViewer}
            currentImgIndex={currentImgIndex}
          />
        </View>
      ) : (
        <View style={styles.buttonContainer}>
          <ButtonModule style={styles.buttons} onPress={takePhotoHandler}>
            <Text style={[styles.buttonText, fonts.text]}>TAKE PHOTO</Text>
          </ButtonModule>
          <ButtonModule
            style={styles.buttons}
            onPress={() => {
              toggleModal("photoSelectorModal");
            }}
          >
            <Text style={[styles.buttonText, fonts.text]}>SELECT PHOTO</Text>
          </ButtonModule>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  buttons: {
    alignSelf: "center",
    width: "60%",
    marginTop: 10,
    backgroundColor: colors.theme,
    paddingVertical: 15,
    borderRadius: 5
  },
  buttonText: {
    color: colors.white,
    textAlign: "center"
  }
});

const mapStateToProps = state => {
  return {
    reducer: state.post
  };
};

export default connect(mapStateToProps)(PhotoComponent);
