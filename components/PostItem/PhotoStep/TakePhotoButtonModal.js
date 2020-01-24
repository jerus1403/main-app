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
import { fonts } from "../../../styleUtility/fonts";

const TakePhotoButtonModal = ({
  openModal,
  takePhotoHandler,
  selectPhotoHandler,
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
          <TouchableOpacity style={styles.buttons} onPress={takePhotoHandler}>
            <Text style={[styles.btnText, fonts.subHeading]}>TAKE PHOTO</Text>
            {/* <Button title='Take Photo' onPress={takePhotoHandler} /> */}
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttons} onPress={selectPhotoHandler}>
            <Text style={[styles.btnText, fonts.subHeading]}>SELECT PHOTO</Text>
            {/* <Button title='Select Photo' onPress={selectPhotoHandler} /> */}
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.buttons, { backgroundColor: colors.fadedGrey }]}
            onPress={() => toggleModal("photoButtonsModal")}
          >
            <Text style={[styles.btnText, fonts.subHeading]}>CANCEL</Text>
            {/* <Button
              title='Cancel'
              onPress={() => toggleModal("photoButtonsModal")}
            /> */}
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
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    height: 250,
    width: "100%"
  },
  buttons: {
    backgroundColor: colors.darkGreen,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginBottom: 10,
    width: "90%",
    borderRadius: 5
  },
  btnText: {
    textAlign: "center",
    color: colors.white
  }
});

export default TakePhotoButtonModal;
