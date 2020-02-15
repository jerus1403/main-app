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
import { Ionicons } from "@expo/vector-icons";

import * as posts from "../../store/actions/posts";
import { colors } from "../../styleUtility/colors";
import { fonts } from "../../styleUtility/fonts";
import ImageViewerModal from "../../components/UI/ImageViewerModal";
import ImageSectionModule from "../../components/UI/ImageSectionModule";
import InfoSectionModule from "../../components/UI/InfoSectionModule";
import MapSectionModule from "../../components/UI/MapSectionModule";
import ButtonModule from "../../components/UI/ButtonModule";
// import DeleteWarningModal from "../../components/UI/Modal";

const PostViewScreen = props => {
  const dispatch = useDispatch();
  [isViewerVisible, setViewer] = useState(false);
  [currentImgIndex, setIndex] = useState();
  [isDelete, setDelete] = useState(false);
  const postObject = props.navigation.getParam("postObject");

  const deletePost = async () => {
    setDelete(false);
    await dispatch(posts.deletePost(postObject));
    props.navigation.navigate("HistoryScreen");
  };

  const closeModal = () => {
    setViewer(false);
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
        <ButtonModule
          style={styles.editButton}
          onPress={() => {
            props.navigation.navigate("Post", { postObject });
          }}
        >
          <Text style={[fonts.text, styles.editButtonText]}>EDIT</Text>
        </ButtonModule>
        <ButtonModule
          style={styles.deleteButton}
          onPress={() => setDelete(true)}
        >
          <Text style={[fonts.text, styles.deleteButtonText]}>DELETE</Text>
        </ButtonModule>
      </View>
      <View style={styles.background}>
        <Modal visible={isDelete} transparent={true} animationType='fade'>
          <TouchableHighlight
            style={styles.background}
            onPress={() => setDelete(false)}
            underlayColor={"rgba(0,0,0,0.5)"}
          >
            <View />
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.midModalSection}
            underlayColor={"rgba(0,0,0,0.5)"}
          >
            <View style={styles.deleteModalContent}>
              <View style={styles.deleteTextContainer}>
                <Text style={styles.deleteText}>
                  Are you sure you want to delete this post?
                </Text>
              </View>
              <View style={styles.deleteButtonsContainer}>
                <ButtonModule
                  style={styles.editButton}
                  onPress={() => setDelete(false)}
                >
                  <Text style={[fonts.text, styles.deleteButtonText]}>
                    CANCEL
                  </Text>
                </ButtonModule>
                <ButtonModule style={styles.deleteButton} onPress={deletePost}>
                  <Text style={[fonts.text, styles.deleteButtonText]}>
                    DELETE
                  </Text>
                </ButtonModule>
              </View>
            </View>
          </TouchableHighlight>

          <TouchableHighlight
            style={styles.bottomBackground}
            onPress={() => setDelete(false)}
            underlayColor={"rgba(0,0,0,0.5)"}
          >
            <View />
          </TouchableHighlight>
        </Modal>
      </View>
      <ImageViewerModal
        isModalOpen={isViewerVisible}
        imageList={postObject.imgPathList}
        closeModal={closeModal}
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
    backgroundColor: colors.darkGreen,
    paddingVertical: 15,
    borderRadius: 5
  },
  editButtonText: { color: colors.white, textAlign: "center" },
  deleteButton: {
    alignSelf: "center",
    width: "50%",
    marginHorizontal: 5,
    backgroundColor: colors.delete,
    paddingVertical: 15,
    borderRadius: 5
  },
  deleteButtonText: { color: colors.white, textAlign: "center" },

  background: {
    flex: 1 / 3,
    backgroundColor: "rgba(0,0,0,0.5)"
  },
  midModalSection: {
    flex: 1 / 3,
    backgroundColor: "rgba(0,0,0,0.5)",
    width: "100%"
  },
  bottomBackground: {
    backgroundColor: "rgba(0,0,0,0.5)",
    flex: 1 / 3
  },

  deleteModalContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: colors.white,
    height: "100%",
    width: "90%",
    borderRadius: 10,
    paddingHorizontal: 20
  },
  deleteTextContainer: {
    marginBottom: 20
  },
  deleteText: {
    fontSize: 17,
    fontWeight: "600",
    textAlign: "center"
  },
  deleteButtonsContainer: {
    flexDirection: "row"
  },
  backButton: {
    paddingHorizontal: 15
  }
});

PostViewScreen.navigationOptions = ({ navigation }) => ({
  headerTitle: navigation.getParam("postObject").title,
  headerLeft: () => {
    return (
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate("HistoryScreen")}
      >
        <Ionicons
          name='ios-arrow-back'
          size={25}
          color={colors.white}
        ></Ionicons>
      </TouchableOpacity>
    );
  },
  headerStyle: {
    backgroundColor: colors.theme
  },
  headerTitleStyle: fonts.screenHeader
});

export default PostViewScreen;
