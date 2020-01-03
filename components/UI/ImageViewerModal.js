import React from "react";
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
  isViewerVisible,
  setViewer,
  currentImgIndex
}) => {
  return (
    <View style={styles.container}>
      <Modal visible={isViewerVisible} transparent={true}>
        <ImageViewer
          imageUrls={imageList}
          onSwipeDown={() => setViewer(false)}
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
