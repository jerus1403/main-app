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
  ActivityIndicator,
  Modal,
  Image
} from "react-native";
import { useDispatch, connect, getState } from "react-redux";
import { ProgressSteps, ProgressStep } from "react-native-progress-steps";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import { ImageBrowser } from "expo-multiple-media-imagepicker";

import { AFTER_POST_SUCCESS } from "../../store/types/types";

import { colors } from "../../styleUtility/colors";
import { fonts } from "../../styleUtility/fonts";
import * as posts from "../../store/actions/posts";

import PhotoComponent from "../../components/PostItem/PhotoStep/PhotoComponent";
import DetailComponent from "../../components/PostItem/DetailStep/DetailComponent";
import LocationComponent from "../../components/PostItem/LocationStep/LocationComponent";
import RateComponent from "../../components/PostItem/RateStep/RateComponent";
import ButtonModule from "../../components/UI/ButtonModule";
import InfoSectionModule from "../../components/UI/InfoSectionModule";

const PostItem = props => {
  const dispatch = useDispatch();
  const userId = props.state.attributes.userId;

  [isLoading, setLoading] = useState(false);
  [imageList, setImgArray] = useState([]);
  [categoryList, setCategory] = useState([]);
  [title, setTitle] = useState();
  [description, setDescription] = useState();
  [latitude, setLatitude] = useState();
  [longitude, setLongitude] = useState();
  [city, setCity] = useState();
  [rate, setRate] = useState();
  [currentStep, setCurrentStep] = useState(0);
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
    if (props.state.posts.addPostStatus) {
      setModal({ ...openModal, postSuccessModal: true });
    }
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
      const imageName = image.uri.split("/").pop();
      const imageArray = imageName.split(".");
      const imageType = imageArray[imageArray.length - 1];
      const imageObj = {
        id: image.base64,
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
  // Set addPostStatus back to null after user close the post success modal
  const setDefaultAddPostStatus = () => props.setDefaultStatusAction();
  if (isLoading) {
    return <ActivityIndicator size='large' color={colors.theme} />;
  }

  return (
    <View style={styles.container}>
      <ProgressSteps
        borderWidth={4}
        activeStepIconBorderColor={colors.darkGreen}
        completedProgressBarColor={colors.darkGreen}
        completedStepIconColor={colors.darkGreen}
        activeLabelColor={colors.darkGreen}
        activeStepNumColor={colors.darkGreen}
        activeStep={currentStep}
      >
        <ProgressStep
          label='Photo'
          nextBtnStyle={styles.nextButton}
          nextBtnTextStyle={styles.btnTextStyle}
          nextBtnDisabled={imageList.length == 0 ? true : false}
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
          onSubmit={() => {
            submitPost();
            setCurrentStep(0);
          }}
        >
          <View style={styles.content}>
            <RateComponent rate={rate} setRate={setRate} />
          </View>
        </ProgressStep>
      </ProgressSteps>
      <Modal
        animationType='slide'
        transparent={false}
        visible={openModal.postSuccessModal}
      >
        <View style={styles.postSuccessModalContainer}>
          <View style={styles.successTextContainer}>
            <Text style={styles.postSuccessText}>
              Your post has been successfull added!
            </Text>
          </View>
          {props.state.posts.addPostStatus ? (
            <View style={styles.postSuccessInfo}>
              <Image
                source={{
                  uri: props.state.posts.addPostPayload[0].imgPathList[0].url
                }}
                style={styles.postSuccessImage}
              />
              <Text style={[fonts.subHeading, styles.postSuccessTitle]}>
                {props.state.posts.addPostPayload[0].title}
              </Text>
            </View>
          ) : null}
          <ButtonModule
            style={styles.buttons}
            onPress={() => {
              setDefaultAddPostStatus();
              closeModal("postSuccessModal");
            }}
          >
            <Text style={styles.btnTextStyle}>POST ANOTHER</Text>
          </ButtonModule>
          <ButtonModule
            style={styles.buttons}
            onPress={() => {
              setDefaultAddPostStatus();
              closeModal("postSuccessModal");
              props.navigation.navigate("HistoryTab");
            }}
          >
            <Text style={styles.btnTextStyle}>DONE</Text>
          </ButtonModule>
        </View>
      </Modal>
    </View>
  );
};

PostItem.navigationOptions = {
  headerTitle: "Post",
  headerStyle: {
    backgroundColor: colors.theme
  },
  headerTitleStyle: fonts.screenHeader
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
    backgroundColor: colors.darkGreen,
    color: colors.white
  },
  prevButton: {
    padding: 7,
    width: Dimensions.get("window").width / 4 + 10,
    borderRadius: 5,
    backgroundColor: colors.darkGreen
  },
  btnTextStyle: {
    textAlign: "center",
    color: colors.white,
    fontSize: 15
  },
  postSuccessModalContainer: {
    flex: 1
    // paddingTop: 22
    // justifyContent: "center",
    // alignItems: "center",
  },
  successTextContainer: {
    width: "100%",
    backgroundColor: colors.theme,
    height: 70,
    paddingTop: 30,
    paddingBottom: 6,
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.invisible
  },
  postSuccessText: {
    textAlign: "center",
    color: colors.white,
    fontSize: 16
  },
  postSuccessInfo: {
    marginBottom: 20,
    paddingVertical: 10
  },
  postSuccessImage: {
    alignSelf: "center",
    height: 200,
    width: "90%"
  },
  postSuccessTitle: {
    textAlign: "center",
    marginTop: 7,
    width: "90%"
  },
  buttons: {
    alignSelf: "center",
    width: "60%",
    marginTop: 10,
    backgroundColor: colors.darkGreen,
    paddingVertical: 15,
    borderRadius: 5
  }
});

const mapStateToProps = state => {
  return {
    state: state
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setDefaultStatusAction: () => dispatch({ type: AFTER_POST_SUCCESS })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostItem);
