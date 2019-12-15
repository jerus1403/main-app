import React, {
  useState,
  useReducer,
  useCallback,
  useEffect,
  useRef
} from "react";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import { useDispatch, connect } from "react-redux";
import {
  StyleSheet,
  Text,
  ScrollView,
  Image,
  TextInput,
  View,
  Button,
  FlatList,
  KeyboardAvoidingView,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
  Picker,
  Dimensions
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import MultiSelect from "react-native-multiple-select";

import { colors } from "../../../styleUtility/colors";
import { fonts } from "../../../styleUtility/fonts";

const DetailComponent = ({
  categoryList,
  setCategory,
  title,
  setTitle,
  description,
  setDescription,
  reducer
}) => {
  const data = [
    {
      name: "Accounting"
    },
    {
      name: "Automotive"
    },
    {
      name: "Businness & Finance"
    },
    {
      name: "Construction"
    },
    {
      name: "IT & Tech"
    },
    {
      name: "Graphic & Design"
    },
    {
      name: "Videography"
    }
  ];
  //Remove photo method from List
  const removeTag = deleteItem => {
    let newList = categoryList.filter(el => el !== deleteItem);
    setCategory([...newList]);
  };
  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={fonts.label}>Categories</Text>
        <MultiSelect
          hideTags
          items={data}
          uniqueKey='name'
          displayKey='name'
          onSelectedItemsChange={item => {
            setCategory(item);
          }}
          selectedItems={categoryList}
          hideSubmitButton={true}
          hideDropdown={true}
        />
        {categoryList.length > 0 ? (
          <View style={styles.tagList}>
            {categoryList.map((tag, index) => {
              return (
                <View key={index} style={styles.tagContainer}>
                  <Text style={styles.tagText}>{tag}</Text>
                  <TouchableOpacity onPress={() => removeTag(tag)}>
                    <Ionicons
                      name='ios-close-circle-outline'
                      size={20}
                      color={colors.white}
                    />
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
        ) : null}
      </View>
      <View style={styles.section}>
        <Text style={fonts.label}>Title</Text>
        <TextInput
          style={styles.inputBox}
          onChangeText={text => setTitle(text)}
          value={title}
        />
      </View>
      <View style={styles.section}>
        <Text style={fonts.label}>Description (Optional)</Text>
        <TextInput
          style={[styles.inputBox, { height: 160 }]}
          onChangeText={text => setDescription(text)}
          value={description}
          multiline={true}
          numberOfLines={5}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%"
  },
  section: {
    marginBottom: 15
  },
  sectionLabel: {
    fontSize: 17,
    fontWeight: "600"
  },
  tagList: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%"
  },
  tagContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
    marginRight: 5,
    marginBottom: 5,
    borderRadius: 15,
    backgroundColor: colors.mainGreen
  },
  tagText: {
    color: colors.white,
    marginRight: 5
  },
  inputBox: {
    height: 40,
    width: "100%",
    paddingHorizontal: 5,
    borderColor: colors.lightGray,
    borderWidth: 1
  }
});

const mapStateToProps = state => {
  return {
    reducer: state.post
  };
};

export default connect(mapStateToProps)(DetailComponent);
