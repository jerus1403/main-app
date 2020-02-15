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
  setModal,
  setIndex,
  openModal,
  toggleModal,
  openPhotoModal,
  closeModal,
  isImageOptionModalVisible,
  photoId,
  currentPhotoIndex
}) => {
  // [isImageOptionModalVisible, setImageOptionModal] = useState(false);
  // [photoId, setPhotoId] = useState();
  // [currentPhotoIndex, setPhotoIndex] = useState(null);

  // Open Option Modal when an image was pressed
  // const openPhotoModal = (id, index) => {
  //   setImageOptionModal(true);
  //   setPhotoId(id);
  //   setPhotoIndex(index);
  // };

  // // Close Photo Option Modal
  // const closeModal = () => {
  //   setImageOptionModal(false);
  // };
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
                  openPhotoModal("imageOptionModal", item.id, index);
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
    flex: 1,
    width: "100%"
  },
  list: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap"
  },
  imageContainer: {
    marginRight: 7
    // marginBottom: 10
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
