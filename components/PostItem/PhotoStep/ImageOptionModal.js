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
  Dimensions
} from "react-native";
import { colors } from "../../../styleUtility/colors";

const ImageOptionModal = ({
  isImageOptionModalVisible,
  closeModal,
  photoId,
  currentPhotoIndex,
  removePhoto,
  setCoveredPhoto,
  setViewer
}) => {
  return (
    <View style={styles.container}>
      <Modal
        animationType='slide'
        transparent={true}
        visible={isImageOptionModalVisible}
      >
        <TouchableHighlight
          style={styles.background}
          onPress={() => closeModal()}
          underlayColor={"transparent"}
        >
          <View />
        </TouchableHighlight>
        <View style={styles.modalInsideView}>
          <TouchableOpacity style={styles.buttons}>
            <Button
              title='View'
              onPress={() => {
                setViewer(true);
                closeModal();
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttons}>
            <Button
              title='Set as Cover'
              onPress={() => {
                setCoveredPhoto(currentPhotoIndex);
                closeModal();
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttons}>
            <Button
              title='Delete'
              color={colors.theme}
              onPress={() => {
                removePhoto(photoId);
                closeModal();
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttons}>
            <Button title='Cancel' onPress={() => closeModal()} />
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: Platform.OS == "ios" ? 20 : 0,
    width: Dimensions.get("window").width
  },
  modalInsideView: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    height: 250,
    width: "100%"
  },
  buttons: {
    backgroundColor: colors.lightWhite,
    paddingHorizontal: 10,
    marginBottom: 10,
    width: "90%",
    borderRadius: 5
  }
});

export default ImageOptionModal;
