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
  Dimensions
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import * as posts from "../../store/actions/posts";
import { colors } from "../../styleUtility/colors";
import { fonts } from "../../styleUtility/fonts";
import ImageViewerModal from "../../components/UI/ImageViewerModal";
import ImageSectionModule from "../../components/UI/ImageSectionModule";
import InfoSectionModule from "../../components/UI/InfoSectionModule";
import MapSectionModule from "../../components/UI/MapSectionModule";
import ButtonModule from "../../components/UI/ButtonModule";

const EditPost = props => {
  const dispatch = useDispatch();
  [isViewerVisible, setViewer] = useState(false);
  [currentImgIndex, setIndex] = useState();
  const postObject = props.navigation.getParam("postObject");
  console.log(postObject, "SINGLE POST");

  const deletePost = async () => {
    await dispatch(posts.deletePost(postObject));
    props.navigation.navigate("HistoryTab");
  };
  return (
    <ScrollView style={styles.container}>
      <ImageSectionModule
        setIndex={setIndex}
        setViewer={setViewer}
        imageList={postObject.imgPathList}
      />
      <InfoSectionModule
        title={postObject.title}
        description={postObject.description ? postObject.description : null}
        rate={postObject.rate}
        categoryList={postObject.categoryList}
      />
      <MapSectionModule
        latitude={postObject.latitude}
        longitude={postObject.longitude}
        city={postObject.city}
      />
      <View style={styles.buttonContainer}>
        <ButtonModule style={styles.editButton}>
          <Text style={[fonts.text, styles.editButtonText]}>EDIT</Text>
        </ButtonModule>
        <ButtonModule style={styles.deleteButton} onPress={deletePost}>
          <Text style={[fonts.text, styles.deleteButtonText]}>DELETE</Text>
        </ButtonModule>
      </View>
      <ImageViewerModal
        isViewerVisible={isViewerVisible}
        imageList={postObject.imgPathList}
        setViewer={setViewer}
        currentImgIndex={currentImgIndex}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  buttonContainer: {
    width: Dimensions.get("window").width - 10,
    flexDirection: "row",
    paddingHorizontal: 5,
    paddingVertical: 15,
    justifyContent: "center",
    alignSelf: "center",
    borderTopWidth: 1,
    borderColor: colors.invisible
  },
  editButton: {
    alignSelf: "center",
    width: "50%",
    marginHorizontal: 5,
    backgroundColor: colors.mainGreen,
    paddingVertical: 15,
    borderRadius: 5
  },
  editButtonText: { color: colors.white, textAlign: "center" },
  deleteButton: {
    alignSelf: "center",
    width: "50%",
    marginHorizontal: 5,
    backgroundColor: "red",
    paddingVertical: 15,
    borderRadius: 5
  },
  deleteButtonText: { color: colors.white, textAlign: "center" }
});

EditPost.navigationOptions = ({ navigation }) => ({
  headerTitle: navigation.getParam("postObject").title,
  headerLeft: () => {
    return (
      <TouchableOpacity onPress={() => navigation.navigate("History")}>
        <Ionicons name='ios-arrow-back' size={20} color={colors.white}>
          {" "}
          Back
        </Ionicons>
      </TouchableOpacity>
    );
  },
  headerStyle: {
    backgroundColor: colors.theme,
    color: colors.white
  },
  headerTintColor: colors.white
});

export default EditPost;
