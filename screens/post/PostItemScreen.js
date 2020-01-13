import React, { useState, useReducer, useCallback, useEffect } from "react";
import {
  StyleSheet,
  Text,
  ScrollView,
  TextInput,
  View,
  Button,
  FlatList,
  Alert,
  Dimensions,
  ActivityIndicator
} from "react-native";
import { useDispatch, connect, getState } from "react-redux";
import { ProgressSteps, ProgressStep } from "react-native-progress-steps";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import { ImageBrowser } from "expo-multiple-media-imagepicker";

import { colors } from "../../styleUtility/colors";
import { fonts } from "../../styleUtility/fonts";
import * as post from "../../store/actions/post";
import * as posts from "../../store/actions/posts";
import { GetUserData } from "../../utils/utils";
import Post from "../../models/post";

import PhotoComponent from "../../components/PostItem/PhotoStep/PhotoComponent";
import DetailComponent from "../../components/PostItem/DetailStep/DetailComponent";
import LocationComponent from "../../components/PostItem/LocationStep/LocationComponent";
import RateComponent from "../../components/PostItem/RateStep/RateComponent";
import FullScreenModal from "../../components/UI/Modal";

const PostItem = props => {
  const dispatch = useDispatch();
  [imageList, setImgArray] = useState([]);
  [categoryList, setCategory] = useState([]);
  [title, setTitle] = useState();
  [description, setDescription] = useState();
  [latitude, setLatitude] = useState();
  [longitude, setLongitude] = useState();
  [city, setCity] = useState();
  [rate, setRate] = useState();
  [userId, setUserId] = useState();
  [currentStep, setCurrentStep] = useState(0);
  [openModal, setModal] = useState({
    photoViewerModal: false,
    photoButtonsModal: false
    // photoSelectorModal: false
  });

  const toggleModal = modal => {
    setModal({ ...openModal, [modal]: !openModal[modal] });
  };

  const closeModal = modal => {
    setModal({ ...openModal, [modal]: false });
  };

  useEffect(() => {
    let unmounted = false;
    // Get USER ID from Local Mememory
    const getUserID = async () => {
      const result = await GetUserData();
      const transformedResult = JSON.parse(result);
      if (!unmounted) {
        setUserId(transformedResult.userData.accessToken.payload.username);
      }
    };
    getUserID();

    return () => {
      unmounted = true;
    };
  }, [
    userId,
    imageList,
    categoryList,
    title,
    description,
    latitude,
    longitude,
    rate,
    city
  ]);

  // Check if Image exists UTILITY FUNCTION ---------------------------------------------------------
  const checkObject = (obj, list) => {
    let found = list.some(el => el.id === obj.id);
    if (found) {
      return true;
    } else {
      return false;
    }
  };

  // imageBrowserCallback = callback => {
  //   callback
  //     .then(photos => {
  //       if (photos.length === 0) {
  //         toggleModal("photoSelectorModal");
  //       } else if (photos.length > 0) {
  //         console.log(photos, "PHOTOS");
  //         const newArr = photos.map(({ uri, ...rest }) => ({
  //           url: uri,
  //           ...rest
  //         }));
  //         newArr.map(object => {
  //           if (!checkObject(object, imageList)) {
  //             setImgArray(oldArr => [...oldArr, object]);
  //           }
  //         });
  //         toggleModal("photoSelectorModal");
  //       }
  //     })
  //     .catch(e => console.log(e));
  // };

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
        url: cameraImage.uri,
        filename: imageName
      };
      setImgArray(oldArr => [...oldArr, imageObj]);
    }
    closeModal("photoButtonsModal");
  };

  // Select Photo from Gallery Handler ---------------------------------------------------------
  const selectPhotoHandler = async () => {
    const hasGalleryPermission = await galleryPermission();
    if (!hasGalleryPermission) {
      return;
    }
    const image = await ImagePicker.launchImageLibraryAsync({
      base64: true
    });
    closeModal("photoButtonsModal");
    if (!image.cancelled) {
      console.log(image, "IMAGE");
      const imageName = image.uri.split("/").pop();
      const imageArray = imageName.split(".");
      const imageType = imageArray[imageArray.length - 1];
      const imageObj = {
        id: image.base64,
        type: imageType,
        url: image.uri,
        filename: imageName
      };
      console.log(imageName, "IMAGE NAME");
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
  // Method: Submit a post ---------------------------------------------------------
  const submitPost = () => {
    const postId = guidGenerator();
    dispatch(
      posts.addPost(
        postId,
        userId,
        categoryList,
        title,
        description,
        imageList,
        latitude,
        longitude,
        rate
      )
    );
    setCurrentStep(0);
    setImgArray([]);
    setCategory([]);
    setTitle();
    setDescription();
    setLatitude();
    setLongitude();
    setCity();
    setRate();
    // props.navigation.navigate("Home");
  };
  console.log(props, "POST SCREEN");
  return (
    <View style={styles.container}>
      {props.posts.addPostPending ? (
        <ActivityIndicator size='large' color={colors.theme} />
      ) : (
        <ProgressSteps
          borderWidth={4}
          activeStepIconBorderColor={colors.theme}
          completedProgressBarColor={colors.theme}
          completedStepIconColor={colors.theme}
          activeLabelColor={colors.theme}
          activeStepNumColor={colors.theme}
          activeStep={currentStep}
        >
          <ProgressStep
            label='Photo'
            nextBtnStyle={styles.nextButton}
            nextBtnTextStyle={styles.btnTextStyle}
            nextBtnDisabled={imageList.length == 0 ? true : false}
            onNext={() => setCurrentStep(1)}
          >
            <View style={styles.content}>
              <PhotoComponent
                imageList={imageList}
                setImgArray={setImgArray}
                toggleModal={toggleModal}
                openModal={openModal}
                closeModal={closeModal}
                takePhotoHandler={takePhotoHandler}
                selectPhotoHandler={selectPhotoHandler}
              />
            </View>
          </ProgressStep>
          <ProgressStep
            label='Detail'
            nextBtnStyle={styles.nextButton}
            nextBtnTextStyle={styles.btnTextStyle}
            previousBtnStyle={styles.prevButton}
            previousBtnTextStyle={styles.btnTextStyle}
            nextBtnDisabled={
              categoryList.length == 0 || title == null ? true : false
            }
            onNext={() => setCurrentStep(2)}
          >
            <View style={styles.content}>
              <DetailComponent
                categoryList={categoryList}
                setCategory={setCategory}
                title={title}
                setTitle={setTitle}
                description={description}
                setDescription={setDescription}
              />
            </View>
          </ProgressStep>
          <ProgressStep
            label='Location'
            nextBtnStyle={styles.nextButton}
            nextBtnTextStyle={styles.btnTextStyle}
            previousBtnStyle={styles.prevButton}
            previousBtnTextStyle={styles.btnTextStyle}
            nextBtnDisabled={city == null ? true : false}
            onNext={() => setCurrentStep(3)}
          >
            <View style={styles.content}>
              <LocationComponent
                setLatitude={setLatitude}
                setLongitude={setLongitude}
                setCity={setCity}
                city={city}
                latitude={latitude}
                longitude={longitude}
              />
            </View>
          </ProgressStep>
          <ProgressStep
            label='Rate'
            nextBtnStyle={styles.nextButton}
            nextBtnTextStyle={styles.btnTextStyle}
            previousBtnStyle={styles.prevButton}
            previousBtnTextStyle={styles.btnTextStyle}
            onSubmit={submitPost}
          >
            <View style={styles.content}>
              <RateComponent rate={rate} setRate={setRate} />
            </View>
          </ProgressStep>
        </ProgressSteps>
      )}

      {/* <FullScreenModal openModal={openModal.photoSelectorModal}>
        <View style={styles.modalContainer}>
          <ImageBrowser
            max={100}
            headerCloseText={"Cancel"}
            headerDoneText={"Done"}
            callback={imageBrowserCallback}
          />
        </View>
      </FullScreenModal> */}
    </View>
  );
};

PostItem.navigationOptions = {
  headerTitle: "Post"
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: Dimensions.get("window").width
  },

  content: {
    alignSelf: "center",
    width: "90%"
  },
  nextButton: {
    padding: 7,
    width: Dimensions.get("window").width / 4 + 10,
    borderRadius: 5,
    backgroundColor: colors.theme,
    color: colors.white
  },
  prevButton: {
    padding: 7,
    width: Dimensions.get("window").width / 4 + 10,
    borderRadius: 5,
    backgroundColor: colors.theme
  },
  btnTextStyle: {
    textAlign: "center",
    color: colors.white,
    fontSize: 15
  },
  modalContainer: {
    flex: 1
  }
});

const mapStateToProps = state => {
  return {
    posts: state.posts,
    auth: state.auth
  };
};

export default connect(mapStateToProps)(PostItem);
