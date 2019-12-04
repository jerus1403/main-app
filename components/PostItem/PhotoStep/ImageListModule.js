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

const ImageListModule = ({ imageArray, selectPhotoHandler }) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={imageArray.slice(1)}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              key={item.uri}
              style={styles.imageContainer}
              onPress={() => alert("hello")}
            >
              <Image style={styles.postImage} source={{ uri: item.uri }} />
            </TouchableOpacity>
          );
        }}
        keyExtractor={item => item.uri}
        horizontal={true}
      />
      <View style={styles.addButton}>
        <Button title='ADD' color={colors.white} onPress={selectPhotoHandler} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
    flex: 1,
    width: "90%",
    alignSelf: "center"
  },
  list: {
    flex: 1
  },
  imageContainer: {
    marginRight: 10
  },
  postImage: {
    height: 60,
    width: 60
  },
  addButton: {
    alignSelf: "center",
    marginTop: 10,
    width: 80,
    height: "auto",
    backgroundColor: colors.theme
  }
});

export default ImageListModule;
