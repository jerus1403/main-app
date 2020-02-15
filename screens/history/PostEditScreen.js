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
import { ProgressSteps, ProgressStep } from "react-native-progress-steps";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";

import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../styleUtility/colors";
import { fonts } from "../../styleUtility/fonts";

import PhotoComponent from "../../components/PostItem/PhotoStep/PhotoComponent";
import DetailComponent from "../../components/PostItem/DetailStep/DetailComponent";
import LocationComponent from "../../components/PostItem/LocationStep/LocationComponent";
import RateComponent from "../../components/PostItem/RateStep/RateComponent";
import ImageViewerModal from "../../components/UI/ImageViewerModal";
import ButtonModule from "../../components/UI/ButtonModule";

const PostEditScreen = props => {
  const dispatch = useDispatch();
  const postObject = props.navigation.getParam("postObject");
  // console.log(postObject.imgPathList, "POST OBJECT");
  const postId = postObject.postId;
  const userId = props.state.attributes.userId;

  [imageList, setImgArray] = useState(postObject ? postObject.imgPathList : []);
  [categoryList, setCategory] = useState(postObject.categoryList);
  [title, setTitle] = useState(postObject.title);
  [description, setDescription] = useState(
    postObject.description ? postObject.description : null
  );
  [latitude, setLatitude] = useState(postObject.latitude);
  [longitude, setLongitude] = useState(postObject.longitude);
  [city, setCity] = useState(postObject.city);
  [rate, setRate] = useState(postObject.rate);

  // [isLoading, setLoading] = useState(false);

  // [currentStep, setCurrentStep] = useState(0);
  // [openModal, setModal] = useState({
  //   photoViewerModal: false,
  //   photoButtonsModal: false,
  //   postSuccessModal: false
  // });

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

  // [isImageOptionModalVisible, setImageOptionModal] = useState(false);
  // [photoId, setPhotoId] = useState();
  // [currentPhotoIndex, setPhotoIndex] = useState(null);

  // const openPhotoModal = (id, index) => {
  //   setImageOptionModal(true);
  //   setPhotoId(id);
  //   setPhotoIndex(index);
  // };

  // // Close Photo Option Modal
  // const closePhotoModal = () => {
  //   setImageOptionModal(false);
  // };

  // const toggleModal = modal => {
  //   setModal({ ...openModal, [modal]: !openModal[modal] });
  // };

  // const closeModal = modal => {
  //   setModal({ ...openModal, [modal]: false });
  // };

  // useEffect(() => {
  //   // if (props.state.posts.addPostStatus) {
  //   //   setModal({ ...openModal, postSuccessModal: true });
  //   // }
  // }, [
  //   imageList,
  //   categoryList,
  //   title,
  //   description,
  //   latitude,
  //   longitude,
  //   rate,
  //   city,
  //   openModal,
  //   toggleModal,
  //   isViewerVisible,
  //   setViewer,
  //   currentImgIndex
  // ]);

  // // Check if Image exists UTILITY FUNCTION ---------------------------------------------------------
  // const checkObject = (obj, list) => {
  //   let found = list.some(el => el.id === obj.id);
  //   if (found) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // };

  // //Ask Permission for Camera ---------------------------------------------------------
  // const cameraPermission = async () => {
  //   const result = await Permissions.askAsync(
  //     Permissions.CAMERA,
  //     Permissions.CAMERA_ROLL
  //   );
  //   if (result.status !== "granted") {
  //     alert("You need to grant the camera access first!");
  //     return false;
  //   }
  //   return true;
  // };

  // //Ask Permission for Gallery ---------------------------------------------------------
  // const galleryPermission = async () => {
  //   const result = await Permissions.askAsync(Permissions.CAMERA_ROLL);
  //   if (result.status !== "granted") {
  //     alert("You need to grant access to the gallery first!");
  //     return false;
  //   }
  //   return true;
  // };

  // //Take Photo Handler ---------------------------------------------------------
  // const takePhotoHandler = async () => {
  //   const hasCameraPermission = await cameraPermission();
  //   if (!hasCameraPermission) {
  //     return;
  //   }
  //   const cameraImage = await ImagePicker.launchCameraAsync({ base64: true });
  //   if (!cameraImage.cancelled) {
  //     const uniqueId = cameraImage.base64.slice(0, 50);
  //     const imageName = cameraImage.uri.split("/").pop();
  //     const imageArray = imageName.split(".");
  //     const imageType = imageArray[imageArray.length - 1];
  //     const imageObj = {
  //       id: uniqueId,
  //       base64: cameraImage.base64,
  //       type: imageType,
  //       url: cameraImage.uri,
  //       filename: imageName
  //     };
  //     setImgArray(oldArr => [...oldArr, imageObj]);
  //   }
  //   closeModal("photoButtonsModal");
  // };

  // // Select Photo from Gallery Handler ---------------------------------------------------------
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
  //     const uniqueId = image.base64.slice(0, 50);
  //     const imageName = image.uri.split("/").pop();
  //     const imageArray = imageName.split(".");
  //     const imageType = imageArray[imageArray.length - 1];
  //     const imageObj = {
  //       id: uniqueId,
  //       base64: image.base64,
  //       type: imageType,
  //       url: image.uri,
  //       filename: imageName
  //     };
  //     if (!checkObject(imageObj, imageList)) {
  //       closeModal("photoButtonsModal");
  //       setImgArray(oldArr => [...oldArr, imageObj]);
  //     } else {
  //       closeModal("photoButtonsModal");

  //       setTimeout(() => {
  //         Alert.alert("Photo added already. Please choose another photo.");
  //       }, 600);
  //     }
  //   }
  // };

  // // Method: Submit a post ---------------------------------------------------------
  // const submitPost = async () => {
  //   setLoading(true);
  //   await dispatch(
  //     posts.addPost(
  //       postId,
  //       userId,
  //       categoryList,
  //       title,
  //       description,
  //       imageList,
  //       latitude,
  //       longitude,
  //       city,
  //       rate
  //     )
  //   );

  //   setImgArray([]);
  //   setCategory([]);
  //   setTitle();
  //   setDescription();
  //   setLatitude();
  //   setLongitude();
  //   setCity();
  //   setRate();
  //   setLoading(false);
  // };
  // Set addPostStatus back to null after user close the post success modal
  // const setDefaultAddPostStatus = () => props.setDefaultStatusAction();

  // if (isLoading) {
  //   return <ActivityIndicator size='large' color={colors.theme} />;
  // }

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{ uri: imageList[0].url }}
        style={{ width: 50, height: 50 }}
      />
      {/* <ProgressSteps
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
              removePhoto={removePhoto}
              setCoveredPhoto={setCoveredPhoto}
              imageList={imageList}
              isViewerVisible={isViewerVisible}
              setViewer={setViewer}
              currentImgIndex={currentImgIndex}
              setIndex={setIndex}
              openPhotoModal={openPhotoModal}
              closePhotoModal={closePhotoModal}
              isImageOptionModalVisible={isImageOptionModalVisible}
              setImageOptionModal={setImageOptionModal}
              photoId={photoId}
              setPhotoId={setPhotoId}
              // setImgArray={setImgArray}
              toggleModal={toggleModal}
              openModal={openModal}
              closeModal={closeModal}
              takePhotoHandler={takePhotoHandler}
              selectPhotoHandler={selectPhotoHandler}
            />
            <ImageViewerModal
              isViewerVisible={isViewerVisible}
              imageList={imageList}
              setViewer={setViewer}
              currentImgIndex={currentImgIndex}
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
      </ProgressSteps> */}
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

const mapStateToProps = state => {
  return {
    state: state
  };
};

export default connect(mapStateToProps)(PostEditScreen);
