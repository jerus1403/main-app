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

import { colors } from "../../styleUtility/colors";
import { fonts } from "../../styleUtility/fonts";
import { GetUserData } from "../../utils/utils";
import * as profilePictureAction from "../../store/actions/profile";

const ChangeProfilePictureModal = props => {
  const userId = props.state.attributes.userId;
  const dispatch = useDispatch();
  [pickedImage, setImage] = useState(null);
  [isLoading, setLoading] = useState(false);
  [fetchRes, setFetch] = useState();
  const profileData = props.state.attributes;

  useEffect(() => {
    getProfileImage();
  }, [dispatch, getProfileImage]);
  //Dispatching get user profile image
  const getProfileImage = useCallback(async () => {
    setLoading(true);
    await dispatch(profilePictureAction.getProfilePicture(userId));
    setLoading(false);
  }, [setLoading, dispatch]);
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
  const galleryPermission = async () => {
    const result = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (result.status !== "granted") {
      alert("You need to grant access to the gallery first!");
      return false;
    }
    return true;
  };

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
      setLoading(true);
      const imageObj = {
        id: cameraImage.base64,
        type: imageType,
        url: cameraImage.uri,
        filename: `${userId}.${imageType}`
      };
      setImage(imageObj.url);
      dispatch(profilePictureAction.postProfilePicture(userId, imageObj));
      setLoading(false);
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
      setLoading(true);
      const imageObject = {
        id: image.base64,
        type: imageType,
        url: image.uri,
        filename: `${userId}.${imageType}`
      };
      setImage(imageObject.url);
      dispatch(profilePictureAction.postProfilePicture(userId, imageObject));
      setLoading(false);
    }
  };
  return (
    <KeyboardAvoidingView style={styles.screen}>
      <Text style={styles.header}>Profile picture</Text>
      <View>
        {isLoading ? (
          <ActivityIndicator color={colors.theme} size='large' />
        ) : !profileData.profileImage && !profileData.getProfileImgStatus ? (
          <Text>No image picked yet</Text>
        ) : (
          <Image
            style={styles.profileImage}
            source={{
              uri: profileData.profileImage
                ? profileData.profileImage.url
                : profileData.getProfileImgStatus
                ? profileData.getProfileImgSuccess.url
                : ""
            }}
          />
        )}
      </View>
      <View style={styles.button}>
        <Button
          title='TAKE PHOTO'
          color={colors.white}
          onPress={takePhotoHandler}
        />
      </View>
      <View style={styles.button}>
        <Button
          title='SELECT PHOTO'
          color={colors.white}
          onPress={selectPhotoHandler}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

ChangeProfilePictureModal.navigationOptions = ({ navigation }) => ({
  headerTitle: "Profile Picture",
  headerLeft: () => {
    return (
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons
          name='ios-arrow-back'
          size={25}
          color={colors.white}
        ></Ionicons>
      </TouchableOpacity>
    );
  },
  headerStyle: {
    backgroundColor: colors.theme
  },
  headerTitleStyle: fonts.screenHeader
});

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    backgroundColor: colors.lightWhite,
    paddingTop: 40
  },
  profileImage: {
    alignSelf: "center",
    height: 180,
    width: 180,
    borderRadius: 180 / 2,
    marginBottom: 20
  },
  backButton: {
    paddingHorizontal: 15
  },
  header: {
    fontSize: 30,
    textAlign: "center",
    marginTop: 30,
    marginBottom: 25
  },
  input: {
    height: 40,
    width: "90%",
    paddingHorizontal: 5,
    marginHorizontal: 10,
    borderColor: colors.fadedGrey,
    borderWidth: 1
  },
  button: {
    marginTop: 10,
    width: "60%",
    backgroundColor: colors.theme
  }
});

const mapStateToProps = state => {
  return {
    state: state
  };
};

export default connect(mapStateToProps)(ChangeProfilePictureModal);
