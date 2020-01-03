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

import { colors } from "../../styleUtility/colors";

import { GetUserData } from "../../utils/utils";
import * as profilePictureAction from "../../store/actions/profile";

const ChangeProfilePictureModal = props => {
  const dispatch = useDispatch();
  [pickedImage, setImage] = useState(null);
  [isLoading, setLoading] = useState(false);
  [userId, setUserId] = useState();
  [fetchRes, setFetch] = useState();

  useEffect(() => {
    const getUserId = async () => {
      setLoading(true);
      const data = await GetUserData();
      if (data) {
        const jsonData = JSON.parse(data);
        const cognitoUserId = jsonData.userData.accessToken.payload.username;
        setUserId(cognitoUserId);
      }
    };
    getUserId();
    if (userId) {
      console.log(userId, "USER ID");
      const bodyObj = {
        user_id: userId,
        type: "jpg"
      };
      // const fetchImage = () => {
      const url =
        "https://yr19pxohlc.execute-api.us-east-1.amazonaws.com/dev/getUserProfileImageURL";
      const options = {
        method: "POST",
        body: JSON.stringify(bodyObj)
      };
      fetch(url, options)
        .then(res => {
          console.log(res.status, "RESPONSE");
        })
        .catch(err => {
          console.log(err, "ERROR FETCHING");
        });
      setLoading(false);
      // };
      // fetchImage();
    }
  }, [userId]);

  // console.log(fetchRes, "FETCH RESULT");

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
    const cameraImage = await ImagePicker.launchCameraAsync();
    console.log(cameraImage, "CAMERA IMAGE");
  };

  //Select Photo from Gallery Handler
  const selectPhotoHandler = async () => {
    const hasGalleryPermission = await galleryPermission();
    if (!hasGalleryPermission) {
      return;
    }
    const image = await ImagePicker.launchImageLibraryAsync({ base64: true });
    const imageName = image.uri.split("/").pop();
    const imageArray = imageName.split(".");
    const imageType = imageArray[imageArray.length - 1];
    if (!image.cancelled && userId) {
      setImage(image.uri);
      const imageObject = {
        data: image.base64,
        name: `${userId}.${imageType}`,
        type: imageType,
        uri: image.uri
      };
      const result = await dispatch(
        profilePictureAction.postProfilePicture(imageObject)
      );
      // console.log(result, "image");
    }
  };

  return (
    <KeyboardAvoidingView style={styles.screen}>
      <Text style={styles.header}>Profile picture</Text>
      <View>
        {!pickedImage && !isLoading ? (
          <Text>No image picked yet</Text>
        ) : isLoading ? (
          <ActivityIndicator color={colors.theme} size='small' />
        ) : (
          <Image
            style={styles.profileImage}
            source={{ uri: pickedImage ? pickedImage : "" }}
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

styles = StyleSheet.create({
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

export default ChangeProfilePictureModal;
