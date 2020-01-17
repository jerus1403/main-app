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
  TouchableOpacity
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../styleUtility/colors";
import ImageViewerModal from "../../components/UI/ImageViewerModal";
import ImageSectionModule from "../../components/UI/ImageSectionModule";

const EditPost = props => {
  [isViewerVisible, setViewer] = useState(false);
  [currentImgIndex, setIndex] = useState();
  const postObject = props.navigation.getParam("postObject");
  console.log(postObject, "EDIT POST");
  return (
    <ScrollView style={styles.container}>
      <ImageSectionModule
        setIndex={setIndex}
        setViewer={setViewer}
        imageList={postObject.imgPathList}
      />
      <View>
        <Text>{postObject.title}</Text>
        {postObject.description ? <Text>{postObject.description}</Text> : null}
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
  }
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
