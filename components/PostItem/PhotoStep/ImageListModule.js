import React, { useEffect, useState, useCallback } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  ScrollView,
  Image,
  TextInput,
  View,
  Button,
  FlatList,
  KeyboardAvoidingView,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
  TouchableHighlight,
  Platform,
  Dimensions
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { colors, shadow } from "../../../styleUtility/colors";
import ImageOptionModal from "./ImageOptionModal";
import TakePhotoButtonModal from "./TakePhotoButtonModal";

const ImageListModule = ({
  imageList,
  selectPhotoHandler,
  takePhotoHandler,
  removePhoto,
  setCoveredPhoto,
  setViewer,
  setIndex,
  openModal,
  toggleModal
}) => {
  [isImageOptionModalVisible, setImageOptionModal] = useState(false);
  [photoId, setPhotoId] = useState();
  [currentPhotoIndex, setPhotoIndex] = useState();

  // Open Option Modal when an image was pressed
  const openPhotoModal = (id, index, type) => {
    if (type === "imageOption" && id && index) {
      setImageOptionModal(true);
      setPhotoId(id);
      setPhotoIndex(index);
    }
  };

  // Close Photo Option Modal
  const closeModal = type => {
    if (type === "imageOption") {
      setImageOptionModal(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.list}>
        {imageList.map((item, index) => {
          if (index != 0) {
            return (
              <TouchableOpacity
                key={item.id}
                style={[styles.imageContainer, shadow.shadow_one]}
                onPress={() => {
                  setIndex(index);
                  openPhotoModal(item.id, index, "imageOption");
                }}
              >
                <Image style={styles.postImage} source={{ uri: item.url }} />
              </TouchableOpacity>
            );
          }
        })}
        {imageList.length < 6 ? (
          <TouchableOpacity
            style={[styles.addButton, shadow.shadow_one]}
            onPress={() => toggleModal("photoButtonsModal")}
          >
            <Ionicons
              name='ios-add'
              size={30}
              color='rgba(0,0,0, .4)'
              style={styles.icon}
            />
          </TouchableOpacity>
        ) : null}
      </View>
      <TakePhotoButtonModal
        openModal={openModal}
        selectPhotoHandler={selectPhotoHandler}
        takePhotoHandler={takePhotoHandler}
        toggleModal={toggleModal}
      />
      <ImageOptionModal
        isImageOptionModalVisible={isImageOptionModalVisible}
        photoId={photoId}
        currentPhotoIndex={currentPhotoIndex}
        closeModal={closeModal}
        removePhoto={removePhoto}
        setCoveredPhoto={setCoveredPhoto}
        setViewer={setViewer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
    paddingBottom: 10,
    flex: 1,
    width: "100%"
  },
  list: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap"
  },
  imageContainer: {
    marginRight: 7,
    marginBottom: 10
  },
  postImage: {
    height: 60,
    width: 60,
    borderRadius: 5
  },
  addButton: {
    justifyContent: "center",
    flexDirection: "row",
    width: 60,
    height: 60
  },
  icon: {
    alignSelf: "center"
  }
});

export default ImageListModule;
