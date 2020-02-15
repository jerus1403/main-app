import React, { useEffect } from "react";
import {
  Modal,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
  Alert,
  StyleSheet,
  Button,
  Platform,
  Dimensions,
  CameraRoll
} from "react-native";
import ImageViewer from "react-native-image-zoom-viewer";

import { colors } from "../../styleUtility/colors";

const ImageViewerModal = ({
  imageList,
  isModalOpen,
  closeModal,
  currentImgIndex
}) => {
  useEffect(() => {
    console.log(imageList, "VIEWER LIST");
    console.log(currentImgIndex, "VIEWER INDEX");
  }, [imageList, isModalOpen, currentImgIndex]);
  return (
    <View style={styles.container}>
      <Modal visible={isModalOpen} transparent={true}>
        <ImageViewer
          imageUrls={imageList}
          onSwipeDown={() => closeModal("photoViewerModal")}
          enableSwipeDown={true}
          index={currentImgIndex}
        />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent"
  }
});

export default ImageViewerModal;
