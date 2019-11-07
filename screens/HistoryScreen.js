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

const History = props => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>History Screen</Text>
    </View>
  );
};

History.navigationOptions = {
  headerTitle: "History"
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

export default History;
