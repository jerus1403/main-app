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

const Inbox = props => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inbox</Text>
    </View>
  );
};

Inbox.navigationOptions = {
  headerTitle: "Inbox"
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

export default Inbox;
