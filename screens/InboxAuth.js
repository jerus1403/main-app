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

const InboxAuth = props => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>This is Inbox after Auth</Text>
      <Text style={styles.title}>Hello</Text>
    </View>
  );
};

InboxAuth.navigationOptions = {
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

export default InboxAuth;
