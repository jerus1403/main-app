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

import { ProgressSteps, ProgressStep } from "react-native-progress-steps";

import PhotoComponent from "../components/PostItem/PhotoStep/PhotoComponent";
import { colors } from "../styleUtility/colors";

const PostItem = props => {
  return (
    <ScrollView style={styles.container}>
      <ProgressSteps borderWidth={4}>
        <ProgressStep label='Photo' nextBtnStyle={styles.nextButton}>
          <PhotoComponent />
        </ProgressStep>
        <ProgressStep label='Detail'>
          <View style={styles.content}>
            <Text>This is the content within step 2!</Text>
          </View>
        </ProgressStep>
        <ProgressStep label='Location'>
          <View style={styles.content}>
            <Text>This is the content within step 3!</Text>
          </View>
        </ProgressStep>
        <ProgressStep label='Rate'>
          <View style={styles.content}>
            <Text>This is the content within step 4!</Text>
          </View>
        </ProgressStep>
      </ProgressSteps>
    </ScrollView>
  );
};

PostItem.navigationOptions = {
  headerTitle: "Post"
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  content: {
    height: "80%",
    alignItems: "center"
  },
  nextButton: {
    padding: 4
  }
});

export default PostItem;
