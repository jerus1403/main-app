import React from "react";
import {
  StyleSheet,
  Text,
  ScrollView,
  TextInput,
  View,
  Button,
  FlatList
} from "react-native";

const PostItem = props => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Post Item</Text>
    </View>
  );
};

PostItem.navigationOptions = {
  headerTitle: "Post"
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    textAlign: "center"
  },
  container: {
    paddingTop: 50
  }
});

export default PostItem;
