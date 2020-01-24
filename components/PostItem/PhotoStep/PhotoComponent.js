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
  closeModal,
  takePhotoHandler,
  selectPhotoHandler
}) => {
  [isViewerVisible, setViewer] = useState(false);
  [currentImgIndex, setIndex] = useState();
  [isPhotoButtonModalVisible, setPhotoButtonModal] = useState(false);

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
            selectPhotoHandler={selectPhotoHandler}
            takePhotoHandler={takePhotoHandler}
            removePhoto={removePhoto}
            setCoveredPhoto={setCoveredPhoto}
            setViewer={setViewer}
            setIndex={setIndex}
            isPhotoButtonModalVisible={isPhotoButtonModalVisible}
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
    alignItems: "center"
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
