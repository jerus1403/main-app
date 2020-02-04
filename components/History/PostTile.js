import React from "react";
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

import { colors } from "../../styleUtility/colors";
import { fonts } from "../../styleUtility/fonts";

const PostTile = ({
  navigation,
  postId,
  imgPathList,
  title,
  rate,
  postObject
}) => {
  return (
    <TouchableOpacity
      style={styles.container}
      key={postId}
      onPress={() =>
        navigation.navigate("PostViewScreen", {
          postId: postId,
          postObject: postObject
        })
      }
    >
      <Image style={styles.coveredImg} source={{ uri: imgPathList[0].url }} />
      <View style={styles.infoContainer}>
        <Text style={fonts.subHeading}>
          {title.length > 25 ? title.slice(0, 25) + "..." : title}
        </Text>
        <Text style={fonts.text}>Rate: ${rate}/hr</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    padding: 5,
    borderBottomWidth: 1,
    borderBottomColor: colors.invisible
  },
  coveredImg: {
    height: 80,
    width: 80,
    borderRadius: 5
  },
  infoContainer: {
    flexDirection: "column",
    paddingHorizontal: 5
  },
  title: {}
});

export default PostTile;
