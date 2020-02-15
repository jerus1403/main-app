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
import TakePhotoButtonModal from "../PhotoStep/TakePhotoButtonModal";
import ImageOptionModal from "../PhotoStep/ImageOptionModal";
import ButtonModule from "../../UI/ButtonModule";
import { fonts } from "../../../styleUtility/fonts";

const PhotoComponent = ({
  imageList,
  toggleModal,
  openModal,
  takePhotoHandler,
  selectPhotoHandler,
  // isViewerVisible,
  setModal,
  // currentImgIndex,
  setIndex,
  openPhotoModal,
  closeModal,
  removePhoto,
  setCoveredPhoto,
  // isImageOptionModalVisible,
  photoId
}) => {
  // [isViewerVisible, setViewer] = useState(false);
  // [currentImgIndex, setIndex] = useState();

  // //Remove photo method from List
  // const removePhoto = id => {
  //   let newList = imageList.filter(el => el.id !== id);
  //   setImgArray([...newList]);
  // };

  // //Set covered photo
  // const setCoveredPhoto = indexB => {
  //   let temp = imageList[0];
  //   imageList[0] = imageList[indexB];
  //   imageList[indexB] = temp;
  //   setImgArray([...imageList]);
  // };

  return (
    <View>
      {imageList.length > 0 ? (
        <View style={styles.container}>
          <ThumbnailModule
            imageList={imageList}
            removePhoto={removePhoto}
            toggleModal={toggleModal}
            openModal={openModal}
            setIndex={setIndex}
          />
          <ImageListModule
            // isImageOptionModalVisible={isImageOptionModalVisible}
            openPhotoModal={openPhotoModal}
            closeModal={closeModal}
            photoId={photoId}
            currentPhotoIndex={currentPhotoIndex}
            imageList={imageList}
            selectPhotoHandler={selectPhotoHandler}
            takePhotoHandler={takePhotoHandler}
            removePhoto={removePhoto}
            setCoveredPhoto={setCoveredPhoto}
            // setModal={setModal}
            setIndex={setIndex}
            openModal={openModal}
            toggleModal={toggleModal}
          />
          <TakePhotoButtonModal
            openModal={openModal}
            selectPhotoHandler={selectPhotoHandler}
            takePhotoHandler={takePhotoHandler}
            toggleModal={toggleModal}
          />
          <ImageOptionModal
            openModal={openModal}
            photoId={photoId}
            currentPhotoIndex={currentPhotoIndex}
            closeModal={closeModal}
            removePhoto={removePhoto}
            setCoveredPhoto={setCoveredPhoto}
            toggleModal={toggleModal}
          />
          {/* <ImageViewerModal
            isViewerVisible={isViewerVisible}
            imageList={imageList}
            setViewer={setViewer}
            currentImgIndex={currentImgIndex}
          /> */}
        </View>
      ) : (
        <View style={styles.buttonContainer}>
          <ButtonModule style={styles.buttons} onPress={takePhotoHandler}>
            <Text style={[styles.buttonText, fonts.subHeading]}>
              TAKE PHOTO
            </Text>
          </ButtonModule>
          <ButtonModule style={styles.buttons} onPress={selectPhotoHandler}>
            <Text style={[styles.buttonText, fonts.subHeading]}>
              SELECT PHOTO
            </Text>
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
    alignItems: "center",
    paddingTop: 20
  },
  buttons: {
    alignSelf: "center",
    width: "60%",
    marginTop: 10,
    backgroundColor: colors.darkGreen,
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
