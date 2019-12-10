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
import { useDispatch, connect } from "react-redux";
import { ProgressSteps, ProgressStep } from "react-native-progress-steps";

import { colors } from "../styleUtility/colors";
import * as post from "../store/actions/post";

import PhotoComponent from "../components/PostItem/PhotoStep/PhotoComponent";
import DetailComponent from "../components/PostItem/DetailStep/DetailComponent";

const PostItem = props => {
  const dispatch = useDispatch();
  [imageList, setImgArray] = useState([]);

  useEffect(() => {
    dispatch(post.addImages(imageList));
  }, [imageList]);

  return (
    <View style={styles.container}>
      <ProgressSteps borderWidth={4}>
        <ProgressStep
          label='Photo'
          nextBtnStyle={styles.nextButton}
          nextBtnTextStyle={styles.btnTextStyle}
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
        >
          <View style={styles.content}>
            <DetailComponent />
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
            <Text>This is the content within step 3!</Text>
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
    padding: 5,
    width: 80,
    backgroundColor: colors.theme,
    color: colors.white
  },
  prevButton: {
    padding: 5,
    width: 80,
    backgroundColor: colors.theme
  },
  btnTextStyle: {
    textAlign: "center",
    color: colors.white
  }
});

export default PostItem;
