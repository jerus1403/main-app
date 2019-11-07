import React, { useEffect, useState, useCallback } from "react";
import {
  StyleSheet,
  Text,
  ScrollView,
  TextInput,
  View,
  Button,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import { connect, useDispatch, useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";

import * as authActions from "../../store/actions/auth";

import { colors } from "../../styleUtility/colors";
import IconImage from "../../assets/icon.png";

const Profile = props => {
  //REDUCER STATE
  const { attributes } = props.authState;

  const dispatch = useDispatch();
  [isLoading, setLoading] = useState(false);
  [name, setName] = useState();
  [birthdate, setBirthdate] = useState();
  [address, setAddress] = useState();
  [email, setEmail] = useState();

  const logUserOut = () => {
    dispatch(authActions.SignOutUser(props.navigation));
  };

  useEffect(() => {
    props.navigation.setParams({
      logOutButton: logUserOut
    });
    //Get User Attributes
    const getUserData = async () => {
      setLoading(true);
      await authActions.retrieveUserData(
        setLoading,
        setName,
        setEmail,
        setAddress,
        setBirthdate
      );
    };
    getUserData();
  }, []);
  return (
    <ScrollView style={styles.container}>
      {isLoading ? (
        <View style={styles.indicator}>
          <ActivityIndicator size='large' color={colors.theme} />
        </View>
      ) : (
        <View>
          <View style={styles.backgroundSection}>
            <Image source={IconImage} style={styles.profileImage} />
            <View style={styles.profileSection}>
              <Text style={styles.name}>
                {attributes.name === null && name ? name : attributes.name}
              </Text>
            </View>
          </View>
          <View style={styles.accountSettingSection}>
            <Text style={styles.userDetail}>User Detail</Text>
            <Text>
              Birthday:{" "}
              {attributes.birthdate === null && birthdate
                ? birthdate
                : attributes.birthdate}
            </Text>
            <Text>
              Address:{" "}
              {attributes.address === null && address
                ? address
                : attributes.address}
            </Text>
            <Text>Email: {email ? email : ""}</Text>
          </View>
        </View>
      )}
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
  indicator: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: "40%"
  },
  name: {
    fontSize: 20,
    fontWeight: "bold"
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
  userDetail: {
    fontSize: 20,
    fontWeight: "bold"
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
