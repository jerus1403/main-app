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
import { getTimeFieldValues } from "uuid-js";
import * as authActions from "../../store/actions/auth";
import * as profilePictureAction from "../../store/actions/profile";

const ChangeProfilePictureModal = props => {
  const dispatch = useDispatch();
  [pickedImage, setImage] = useState(null);
  [isLoading, setLoading] = useState(false);

  useEffect(() => {
    //Get User Attributes
    // const getUserData = async () => {
    //   await authActions.retrieveUserData(
    //     setLoading,
    //     null,
    //     null,
    //     null,
    //     null,
    //     setImage
    //   );
    // };
    // getUserData();
  }, []);
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
  //Take Photo Handler
  const takePhotoHandler = async () => {
    const hasCameraPermission = await cameraPermission();
    if (!hasCameraPermission) {
      return;
    }
    ImagePicker.launchCameraAsync();
  };
  //Select Photo from Gallery Handler
  const selectPhotoHandler = async () => {
    const hasGalleryPermission = await galleryPermission();
    if (!hasGalleryPermission) {
      return;
    }
    const image = await ImagePicker.launchImageLibraryAsync({ base64: true });
    // type = "picture";
    // await dispatch(authActions.addAttribute(image.uri, type));
    if (!image.cancelled) {
      setImage(image.uri);
      await dispatch(profilePictureAction.postProfilePicture(image));
      console.log(image.uri, "image");
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
