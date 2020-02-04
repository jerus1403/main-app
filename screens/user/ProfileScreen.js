import React, { useEffect, useState, useCallback } from "react";
import { ADD_PROFILE_API, GET_PROFILE_IMG_API } from "react-native-dotenv";
import {
  StyleSheet,
  Text,
  ScrollView,
  TextInput,
  View,
  Button,
  FlatList,
  Image,
  ImageBackground,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import { connect, useDispatch, useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";

import { LOG_OUT } from "../../store/types/types";

import * as authActions from "../../store/actions/auth";
import * as profilePictureAction from "../../store/actions/profile";
import Avatar from "../../assets/avatar.png";

import { colors } from "../../styleUtility/colors";
import { fonts } from "../../styleUtility/fonts";

const Profile = props => {
  //REDUCER STATE
  const { attributes } = props.state;
  const userId = attributes.userId;
  const dispatch = useDispatch();
  [isLoading, setLoading] = useState(false);
  [name, setName] = useState();
  [birthdate, setBirthdate] = useState();
  [address, setAddress] = useState();
  [email, setEmail] = useState();
  [profileImage, setProfileImage] = useState();

  const logUserOut = () => {
    dispatch(authActions.SignOutUser(props.navigation));
    props.setDefaultAttributesAction();
  };

  useEffect(() => {
    props.navigation.setParams({
      logOutButton: logUserOut
    });
    getUserAttributes();
  }, [getUserAttributes]);

  const getUserAttributes = useCallback(async () => {
    setLoading(true);
    await dispatch(profilePictureAction.getProfilePicture(userId));
    await authActions.retrieveUserData(
      setName,
      setEmail,
      setAddress,
      setBirthdate
    );
    setLoading(false);
  }, [setLoading, dispatch]);

  if (isLoading) {
    return (
      <View style={styles.indicator}>
        <ActivityIndicator size='large' color={colors.theme} />
      </View>
    );
  } else {
    return (
      <ScrollView style={styles.container}>
        <View>
          <ImageBackground style={styles.backgroundSection}>
            <View style={styles.userImageContainer}>
              <View style={styles.userImageFrame}>
                {attributes.getProfileImgStatus ||
                attributes.postProfileImageStatus ? (
                  <Image
                    source={{
                      uri: attributes.profileImage
                        ? attributes.profileImage.url
                        : attributes.getProfileImgStatus
                        ? attributes.getProfileImgSuccess.url
                        : ""
                    }}
                    style={styles.userImage}
                  />
                ) : (
                  <Image source={Avatar} style={styles.userImage} />
                )}
              </View>
              <Text style={styles.name}>
                {attributes.name ? attributes.name : name ? name : ""}
              </Text>
            </View>
          </ImageBackground>
          <View style={styles.accountSettingSection}>
            <View style={styles.listItem}>
              <Text style={styles.label}>Birthday</Text>
              <Text>
                {attributes.birthdate
                  ? attributes.birthdate
                  : birthdate
                  ? birthdate
                  : ""}
              </Text>
            </View>
            <View style={styles.listItem}>
              <Text style={styles.label}>Address</Text>
              <Text>
                {attributes.address
                  ? attributes.address
                  : address
                  ? address
                  : ""}
              </Text>
            </View>
            <View style={styles.listItem}>
              <Text style={styles.label}>Email</Text>
              <Text>
                {attributes.email ? attributes.email : email ? email : ""}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
};

Profile.navigationOptions = ({ navigation }) => ({
  headerTitle: "Profile",
  headerStyle: {
    backgroundColor: colors.theme
  },
  headerTitleStyle: fonts.screenHeader,
  headerRight: () => {
    const { params = {} } = navigation.state;
    return (
      <TouchableOpacity
        style={fonts.screenBtnContainer}
        onPress={params.logOutButton}
      >
        <Text style={fonts.screenBtnText}>Log Out</Text>
      </TouchableOpacity>
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
  }
});

const styles = StyleSheet.create({
  indicator: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: "40%"
  },
  container: {
    flex: 1
  },
  backgroundSection: {
    height: 150,
    backgroundColor: colors.theme
  },
  userImageContainer: {
    alignSelf: "center",
    position: "absolute",
    top: 50
  },
  userImageFrame: {
    alignSelf: "center",
    padding: 5,
    backgroundColor: colors.white,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.lightBlack,
    height: 160,
    width: 160
  },
  userImage: {
    height: "100%",
    width: "100%",
    borderRadius: 10
  },
  name: {
    marginTop: 5,
    alignSelf: "center",
    fontSize: 20,
    fontWeight: "bold"
  },
  userDetailText: {
    fontSize: 16
  },
  accountSettingSection: {
    position: "relative",
    top: 110,
    minHeight: 100,
    justifyContent: "space-between",
    paddingHorizontal: 20
  },
  listItem: {
    borderBottomWidth: 1,
    borderBottomColor: colors.lightBlack,
    paddingVertical: 10
  },
  label: {
    color: colors.theme,
    fontWeight: "bold"
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
    state: state
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setDefaultAttributesAction: () => dispatch({ type: LOG_OUT })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
