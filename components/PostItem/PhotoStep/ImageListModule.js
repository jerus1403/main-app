import React, { useEffect, useState, useCallback } from "react";
import {
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
  TouchableOpacity
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { colors, shadow } from "../../../styleUtility/colors";
import ImageOptionModal from "./ImageOptionModal";

const ImageListModule = ({
  imageList,
  selectPhotoHandler,
  removePhoto,
  setCoveredPhoto
}) => {
  [isModalVisible, setModal] = useState(false);
  [photoId, setPhotoId] = useState();
  [currentPhotoIndex, setPhotoIndex] = useState();

  const openModal = (id, index) => {
    setModal(true);
    setPhotoId(id);
    setPhotoIndex(index);
  };

  const closeModal = () => {
    setModal(false);
  };

  // useEffect(() => {
  //   console.log(imageList, "IMAGE LIST");
  // }, [imageList]);

  return (
    <View style={styles.container}>
      <View style={styles.list}>
        {imageList.map((item, index) => {
          if (index != 0) {
            return (
              <TouchableOpacity
                key={item.data}
                style={[styles.imageContainer, shadow.shadow_one]}
                onPress={() => openModal(item.data, index)}
              >
                <Image style={styles.postImage} source={{ uri: item.uri }} />
              </TouchableOpacity>
            );
          }
        })}
        {imageList.length < 5 ? (
          <TouchableOpacity
            style={[styles.addButton, shadow.shadow_one]}
            onPress={selectPhotoHandler}
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
      <ImageOptionModal
        isModalVisible={isModalVisible}
        photoId={photoId}
        currentPhotoIndex={currentPhotoIndex}
        closeModal={closeModal}
        removePhoto={removePhoto}
        setCoveredPhoto={setCoveredPhoto}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
    paddingBottom: 10,
    flex: 1,
    width: "90%",
    alignSelf: "center"
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
    alignItems: "center",
    flexDirection: "row",
    width: 60,
    height: 60
  },
  icon: {
    alignSelf: "center"
  }
});

export default ImageListModule;
