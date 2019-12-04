import React from "react";
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

import { colors } from "../../../styleUtility/colors";

const ThumbnailModule = ({ image }) => {
  return (
    <View style={styles.thumbnailContainter}>
      <Image source={{ uri: image.uri }} style={styles.thumbnailImage} />
    </View>
  );
};

const styles = StyleSheet.create({
  thumbnailContainter: {
    flex: 1,
    marginVertical: 10
  },
  thumbnailImage: {
    alignSelf: "center",
    height: 170,
    width: "90%"
  }
});

export default ThumbnailModule;
