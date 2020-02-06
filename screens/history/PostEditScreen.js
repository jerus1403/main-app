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
import PostItemScreen from "../post/PostItemScreen";

const PostEditScreen = props => {
  const postObject = props.navigation.getParam("postObject");

  const userId = props.state.attributes.userId;

  [imageList, setImgArray] = useState(postObject.imgPathList);
  [categoryList, setCategory] = useState(postObject.categoryList);
  [title, setTitle] = useState(postObject.title);
  [description, setDescription] = useState(
    postObject.description ? postObject.description : null
  );
  [latitude, setLatitude] = useState(postObject.latitude);
  [longitude, setLongitude] = useState(postObject.longitude);
  [city, setCity] = useState(postObject.city);
  [rate, setRate] = useState(postObject.rate);

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

const mapStateToProps = state => {
  return {
    state: state
  };
};

export default connect(mapStateToProps)(PostEditScreen);
