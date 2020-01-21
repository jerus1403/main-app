import React, { useState, useReducer, useCallback, useEffect } from "react";
import { useDispatch, connect, getState } from "react-redux";
import {
  StyleSheet,
  Text,
  ScrollView,
  TextInput,
  RefreshControl,
  View,
  Image,
  Button,
  FlatList,
  ActivityIndicator,
  TouchableOpacity
} from "react-native";

const ImageSectionModule = ({ setIndex, setViewer, imageList }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          setIndex(0);
          setViewer(true);
        }}
      >
        <Image source={{ uri: imageList[0].url }} style={styles.thumbnail} />
      </TouchableOpacity>
      <View style={styles.listContainer}>
        <View style={styles.list}>
          {imageList.map((item, index) => {
            if (index != 0) {
              return (
                <TouchableOpacity
                  key={item.filename}
                  style={styles.listImgContainer}
                  onPress={() => {
                    setIndex(index);
                    setViewer(true);
                  }}
                >
                  <Image style={styles.listImage} source={{ uri: item.url }} />
                </TouchableOpacity>
              );
            }
          })}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  thumbnail: {
    width: "100%",
    height: 300
  },
  listContainer: {
    marginTop: 5,
    paddingBottom: 5,
    flex: 1,
    width: "100%"
  },
  list: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap"
  },
  listImgContainer: {
    marginLeft: 5
  },
  listImage: {
    height: 60,
    width: 60,
    borderRadius: 5
  }
});

export default ImageSectionModule;
