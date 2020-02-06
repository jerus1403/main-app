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
  Image,
  TouchableOpacity
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

import PostItemScreen from "./PostItemScreen";

const PostTabScreen = props => {
  const userId = props.state.attributes.userId;

  [imageList, setImgArray] = useState([]);
  [categoryList, setCategory] = useState([]);
  [title, setTitle] = useState(null);
  [description, setDescription] = useState(null);
  [latitude, setLatitude] = useState(null);
  [longitude, setLongitude] = useState(null);
  [city, setCity] = useState(null);
  [rate, setRate] = useState(null);

  return (
    <PostItemScreen
      userId={userId}
      imageList={imageList}
      setImgArray={setImgArray}
      categoryList={categoryList}
      setCategory={setCategory}
      title={title}
      setTitle={setTitle}
      description={description}
      setDescription={setDescription}
      latitude={latitude}
      setLatitude={setLatitude}
      longitude={longitude}
      setLongitude={setLongitude}
      city={city}
      setCity={setCity}
      rate={rate}
      setRate={setRate}
    />
  );
};

PostTabScreen.navigationOptions = ({ navigation }) => ({
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

const mapStateToProps = state => {
  return {
    state: state
  };
};

export default connect(mapStateToProps)(PostTabScreen);
