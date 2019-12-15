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

import { colors } from "../styleUtility/colors";
import { fonts } from "../styleUtility/fonts";
import * as post from "../store/actions/post";

import PhotoComponent from "../components/PostItem/PhotoStep/PhotoComponent";
import DetailComponent from "../components/PostItem/DetailStep/DetailComponent";
import LocationComponent from "../components/PostItem/LocationStep/LocationComponent";

const PostItem = props => {
  const dispatch = useDispatch();
  [imageList, setImgArray] = useState([]);
  [categoryList, setCategory] = useState([]);
  [title, setTitle] = useState(null);
  [description, setDescription] = useState(null);
  [latitude, setLatitude] = useState(null);
  [longitude, setLongitude] = useState(null);

  useEffect(() => {
    dispatch(post.addImages(imageList));
    dispatch(post.addCategories(categoryList));
    dispatch(post.addTitle(title));
    dispatch(post.addDescription(description));
  }, [imageList, categoryList, title, description, latitude, longitude]);
  console.log(props.reducer, "Reducer");
  console.log(latitude, "LAT");
  console.log(longitude, "LONG");
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
          // nextBtnDisabled={imageList.length == 0 ? true : false}
        >
          <View style={styles.content}>
            <PhotoComponent imageList={imageList} setImgArray={setImgArray} />
          </View>
        </ProgressStep>
        <ProgressStep
          label='Detail'
          nextBtnStyle={styles.nextButton}
          nextBtnTextStyle={styles.btnTextStyle}
          previousBtnStyle={styles.prevButton}
          previousBtnTextStyle={styles.btnTextStyle}
          // nextBtnDisabled={
          //   categoryList.length == 0 || title == null ? true : false
          // }
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
        >
          <View style={styles.content}>
            <LocationComponent
              setLatitude={setLatitude}
              setLongitude={setLongitude}
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
            <Text>This is the content within step 4!</Text>
          </View>
        </ProgressStep>
      </ProgressSteps>
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
  }
});

const mapStateToProps = state => {
  return {
    reducer: state.post
  };
};

export default connect(mapStateToProps)(PostItem);
