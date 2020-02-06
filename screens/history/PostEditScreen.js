import React, { useState, useReducer, useCallback, useEffect } from "react";
import { useDispatch, connect, getState } from "react-redux";
import {
  StyleSheet,
  Text,
  ScrollView,
  TextInput,
  RefreshControl,
  View,
  Image,
  Button,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Dimensions,
  Modal,
  Platform,
  TouchableHighlight
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";

import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../styleUtility/colors";
import { fonts } from "../../styleUtility/fonts";
import PhotoComponent from "../../components/PostItem/PhotoStep/PhotoComponent";
import DetailComponent from "../../components/PostItem/DetailStep/DetailComponent";

const PostEditScreen = props => {
  const postObject = props.navigation.getParam("postObject");
  console.log(postObject, "POSTTTTTTTTTTTTTTT");
  let detail;
  if (postObject.description) {
    detail = postObject.description;
  }
  const dispatch = useDispatch();
  // const userId = props.state.attributes.userId;

  [isLoading, setLoading] = useState(false);
  [imageList, setImgArray] = useState(postObject.imgPathList);
  [categoryList, setCategory] = useState(postObject.categoryList);
  [title, setTitle] = useState(postObject.title);
  [description, setDescription] = useState(detail);
  [latitude, setLatitude] = useState(postObject.latitude);
  [longitude, setLongitude] = useState(postObject.longitude);
  [city, setCity] = useState(postObject.city);
  [rate, setRate] = useState(postObject.rate);
  [openModal, setModal] = useState({
    photoViewerModal: false,
    photoButtonsModal: false,
    postSuccessModal: false
  });

  const toggleModal = modal => {
    setModal({ ...openModal, [modal]: !openModal[modal] });
  };

  const closeModal = modal => {
    setModal({ ...openModal, [modal]: false });
  };

  useEffect(() => {
    // if (props.state.posts.addPostStatus) {
    //   setModal({ ...openModal, postSuccessModal: true });
    // }
  }, [
    imageList,
    categoryList,
    title,
    description,
    latitude,
    longitude,
    rate,
    city
  ]);

  // Method: Generate a post ID ---------------------------------------------------------
  const guidGenerator = () => {
    var S4 = function() {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return (
      S4() +
      S4() +
      "-" +
      S4() +
      "-" +
      S4() +
      "-" +
      S4() +
      "-" +
      S4() +
      S4() +
      S4()
    );
  };

  // Check if Image exists UTILITY FUNCTION ---------------------------------------------------------
  const checkObject = (obj, list) => {
    let found = list.some(el => el.id === obj.id);
    if (found) {
      return true;
    } else {
      return false;
    }
  };

  //Ask Permission for Camera ---------------------------------------------------------
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

  //Ask Permission for Gallery ---------------------------------------------------------
  const galleryPermission = async () => {
    const result = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (result.status !== "granted") {
      alert("You need to grant access to the gallery first!");
      return false;
    }
    return true;
  };

  //Take Photo Handler ---------------------------------------------------------
  const takePhotoHandler = async () => {
    const imgId = guidGenerator();
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
        id: imgId,
        base64: cameraImage.base64,
        type: imageType,
        url: cameraImage.uri,
        filename: imageName
      };
      setImgArray(oldArr => [...oldArr, imageObj]);
    }
    closeModal("photoButtonsModal");
  };

  // Select Photo from Gallery Handler ---------------------------------------------------------
  const selectPhotoHandler = async () => {
    const imgId = guidGenerator();
    const hasGalleryPermission = await galleryPermission();
    if (!hasGalleryPermission) {
      return;
    }
    const image = await ImagePicker.launchImageLibraryAsync({
      base64: true
    });
    closeModal("photoButtonsModal");
    if (!image.cancelled) {
      const imageName = image.uri.split("/").pop();
      const imageArray = imageName.split(".");
      const imageType = imageArray[imageArray.length - 1];
      const imageObj = {
        id: imgId,
        base64: image.base64,
        type: imageType,
        url: image.uri,
        filename: imageName
      };
      if (!checkObject(imageObj, imageList)) {
        closeModal("photoButtonsModal");
        setImgArray(oldArr => [...oldArr, imageObj]);
      } else {
        closeModal("photoButtonsModal");

        setTimeout(() => {
          Alert.alert("Photo added already. Please choose another photo.");
        }, 600);
      }
    }
  };

  // Method: Submit a post ---------------------------------------------------------
  const submitPost = async () => {
    setLoading(true);
    const postId = guidGenerator();
    await dispatch(
      posts.addPost(
        postId,
        userId,
        categoryList,
        title,
        description,
        imageList,
        latitude,
        longitude,
        city,
        rate
      )
    );

    setImgArray([]);
    setCategory([]);
    setTitle();
    setDescription();
    setLatitude();
    setLongitude();
    setCity();
    setRate();
    setLoading(false);
  };

  return (
    <ScrollView style={styles.container}>
      <PhotoComponent
        imageList={imageList}
        setImgArray={setImgArray}
        toggleModal={toggleModal}
        openModal={openModal}
        closeModal={closeModal}
        takePhotoHandler={takePhotoHandler}
        selectPhotoHandler={selectPhotoHandler}
      />
      <DetailComponent
        categoryList={categoryList}
        setCategory={setCategory}
        title={title}
        setTitle={setTitle}
        description={description}
        setDescription={setDescription}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12
  },
  closeButton: {
    marginRight: 7
  },
  closeBtnText: {
    color: colors.white
  }
});

PostEditScreen.navigationOptions = ({ navigation }) => ({
  headerTitle: "Edit Post",
  headerRight: () => {
    return (
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.closeButton}
      >
        <Text style={styles.closeBtnText}>Close</Text>
      </TouchableOpacity>
    );
  },
  headerLeft: null,
  headerStyle: {
    backgroundColor: colors.theme
  },
  headerTitleStyle: fonts.screenHeader
});

export default PostEditScreen;
