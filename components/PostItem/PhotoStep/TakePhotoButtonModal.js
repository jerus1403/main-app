import React, { useCallback } from "react";
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

const TakePhotoButtonModal = ({
  openModal,
  //   isPhotoButtonModalVisible,
  //   closeModal,
  takePhotoHandler,
  //   toggleButtonModal,
  toggleModal
}) => {
  return (
    <View style={styles.container}>
      <Modal
        animationType='slide'
        transparent={true}
        visible={openModal.photoButtonsModal}
      >
        <TouchableHighlight
          style={styles.background}
          onPress={() => toggleModal("photoButtonsModal")}
          underlayColor={"transparent"}
        >
          <View />
        </TouchableHighlight>
        <View style={styles.modalInsideView}>
          <TouchableOpacity style={styles.buttons}>
            <Button title='Take Photo' onPress={takePhotoHandler} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttons}>
            <Button
              title='Select Photo'
              onPress={
                // selectPhotoHandler
                () => {
                  toggleModal("photoButtonsModal");
                  setTimeout(() => {
                    toggleModal("photoSelectorModal");
                  }, 100);
                }
              }
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttons}>
            <Button
              title='Cancel'
              onPress={() => toggleModal("photoButtonsModal")}
            />
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

export default TakePhotoButtonModal;
