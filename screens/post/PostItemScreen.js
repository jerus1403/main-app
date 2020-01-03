import React, { useState, useReducer, useCallback, useEffect } from "react";
import {
  StyleSheet,
  Text,
  ScrollView,
  TextInput,
  View,
  Button,
  FlatList,
  Dimensions
} from "react-native";
import { useDispatch, connect, getState } from "react-redux";
import { ProgressSteps, ProgressStep } from "react-native-progress-steps";
import { ImageBrowser } from "expo-multiple-media-imagepicker";

import { colors } from "../../styleUtility/colors";
import { fonts } from "../../styleUtility/fonts";
import * as post from "../../store/actions/post";

import PhotoComponent from "../../components/PostItem/PhotoStep/PhotoComponent";
import DetailComponent from "../../components/PostItem/DetailStep/DetailComponent";
import LocationComponent from "../../components/PostItem/LocationStep/LocationComponent";
import RateComponent from "../../components/PostItem/RateStep/RateComponent";
import FullScreenModal from "../../components/UI/Modal";

const PostItem = props => {
  const dispatch = useDispatch();
  [imageList, setImgArray] = useState([]);
  [categoryList, setCategory] = useState([]);
  [title, setTitle] = useState(null);
  [description, setDescription] = useState(null);
  [latitude, setLatitude] = useState(null);
  [longitude, setLongitude] = useState(null);
  [city, setCity] = useState(null);
  [rate, setRate] = useState(null);

  [openModal, setModal] = useState({
    photoViewerModal: false,
    photoButtonsModal: false,
    photoSelectorModal: false
  });

  const toggleModal = modal => {
    setModal({ ...openModal, [modal]: !openModal[modal] });
  };

  const closeModal = modal => {
    setModal({ ...openModal, [modal]: false });
  };

  useEffect(() => {
    dispatch(post.addImages(imageList));
    dispatch(post.addCategories(categoryList));
    dispatch(post.addTitle(title));
    dispatch(post.addDescription(description));
    let location = {
      lat: latitude,
      long: longitude
    };
    dispatch(post.addLocation(location));
    dispatch(post.addRate(rate));
  }, [imageList, categoryList, title, description, latitude, longitude, rate]);
  // console.log(props.reducer, "Reducer");
  // console.log(latitude, "LAT");
  // console.log(longitude, "LONG");

  const checkObject = (obj, list) => {
    let found = list.some(el => el.id === obj.id);
    if (found) {
      return true;
    } else {
      return false;
    }
  };

  imageBrowserCallback = callback => {
    callback
      .then(photos => {
        if (photos.length === 0) {
          toggleModal("photoSelectorModal");
        } else if (photos.length > 0) {
          console.log(photos, "PHOTOS");
          const newArr = photos.map(({ uri, ...rest }) => ({
            url: uri,
            ...rest
          }));
          newArr.map(object => {
            if (!checkObject(object, imageList)) {
              setImgArray(oldArr => [...oldArr, object]);
            }
          });
          toggleModal("photoSelectorModal");
        }
      })
      .catch(e => console.log(e));
  };
  // console.log(openModal, "MODAL");
  console.log(props, "REDUCER");
  return (
    <View style={styles.container}>
      <ProgressSteps
        borderWidth={4}
        activeStepIconBorderColor={colors.theme}
        completedProgressBarColor={colors.theme}
        completedStepIconColor={colors.theme}
        activeLabelColor={colors.theme}
        activeStepNumColor={colors.theme}
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
        >
          <View style={styles.content}>
            <RateComponent rate={rate} setRate={setRate} />
          </View>
        </ProgressStep>
      </ProgressSteps>
      <FullScreenModal openModal={openModal.photoSelectorModal}>
        <View style={styles.modalContainer}>
          <ImageBrowser
            max={100}
            headerCloseText={"Cancel"}
            headerDoneText={"Done"}
            callback={imageBrowserCallback}
          />
        </View>
      </FullScreenModal>
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
    post: state.post,
    auth: state.auth
  };
};

export default connect(mapStateToProps)(PostItem);
