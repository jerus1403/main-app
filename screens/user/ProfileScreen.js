import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  ScrollView,
  TextInput,
  View,
  Button,
  FlatList,
  Image,
  TouchableOpacity
} from "react-native";
import { connect, useDispatch } from "react-redux";
import { Ionicons } from "@expo/vector-icons";

import * as authActions from "../../store/actions/auth";

import { colors } from "../../styleUtility/colors";
import IconImage from "../../assets/icon.png";

const Profile = props => {
  const dispatch = useDispatch();
  const logUserOut = () => {
    dispatch(authActions.SignOutUser(props.navigation));
  };
  useEffect(() => {
    props.navigation.setParams({
      logOutButton: logUserOut
    });
  }, []);
  return (
    <ScrollView style={styles.container}>
      <View style={styles.backgroundSection}>
        <Image source={IconImage} style={styles.profileImage} />
        <View style={styles.profileSection}>
          <Text style={styles.title}>Name</Text>
        </View>
      </View>
      <View style={styles.accountSettingSection}>
        <Text>Name: John Do</Text>
        <Text>Birthday: 10/20/1982</Text>
        <Text>Address: 1000 Broadcast blvd. Plano NJ 92313</Text>
        <Text>Email: test@test.com</Text>
      </View>
    </ScrollView>
  );
};

Profile.navigationOptions = ({ navigation }) => ({
  headerTitle: "Profile",
  headerRight: () => {
    const { params = {} } = navigation.state;
    return (
      <Button
        title='Log Out'
        onPress={params.logOutButton}
        color={colors.white}
      />
    );
  },
  headerLeft: () => {
    return (
      <TouchableOpacity
        style={styles.settingButton}
        onPress={() => navigation.navigate("Settings")}
      >
        <Ionicons
          name='ios-settings'
          size={30}
          color={colors.white}
          style={styles.icon}
        />
      </TouchableOpacity>
    );
  },
  headerStyle: {
    backgroundColor: colors.theme,
    color: colors.white
  }
});

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    textAlign: "center"
  },
  container: {
    flex: 1
  },
  backgroundSection: {
    flexDirection: "row",
    padding: 20,
    height: "auto",
    backgroundColor: colors.easyGreen
  },
  profileSection: {
    flexDirection: "column",
    justifyContent: "center",
    padding: 20
  },
  profileImage: {
    alignSelf: "center",
    height: 180,
    width: 180,
    borderRadius: 180 / 2
  },
  accountSettingSection: {
    minHeight: 100,
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: colors.lightWhite
  },
  settingButton: {
    marginHorizontal: 20
  },
  icon: {
    alignSelf: "center"
  }
});

const mapStateToProps = state => {
  return {
    authState: state
  };
};

export default connect(mapStateToProps)(Profile);
