import React, {
  useState,
  useReducer,
  useCallback,
  useEffect,
  useRef
} from "react";

import {
  StyleSheet,
  Platform,
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
  Picker,
  Dimensions,
  Modal
} from "react-native";

const FullScreenModal = props => {
  return (
    <Modal
      //   style={styles.container}
      animationType='slide'
      visible={props.openModal}
    >
      {props.children}
    </Modal>
  );
};

// const styles = StyleSheet.create({
//   container: {
//     flex: 1
//   }
// });

export default FullScreenModal;
