import React, { useState, useReducer, useCallback, useEffect } from "react";
import { useDispatch, connect, getState } from "react-redux";
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

const InfoSectionModule = ({ title, description, categoryList, rate }) => {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.label}>What we do: </Text>
        <Text style={[fonts.heading, styles.titleText]}>{title}</Text>
      </View>

      <View style={styles.rateContainer}>
        <Text style={styles.label}>Rate: </Text>
        <Text style={[fonts.subHeading, styles.rateText]}>${rate}</Text>
        <Text>/hour</Text>
      </View>
      <Text style={styles.label}>Industries: </Text>
      <View style={styles.categoryContainer}>
        {categoryList.map(el => (
          <View key={el} style={styles.categoryBox}>
            <Text style={[fonts.text, styles.categoryText]}>{el}</Text>
          </View>
        ))}
      </View>

      {description ? (
        <View style={styles.descriptionContainer}>
          <Text style={styles.label}>Detail: </Text>
          <Text style={[fonts.text, styles.descriptionText]}>
            {description}
          </Text>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 5,
    paddingVertical: 5
  },
  label: {
    color: colors.fadedGrey
  },
  titleContainer: {
    marginBottom: 5
  },
  titleText: {
    //  color: colors.mainGreen
  },
  categoryContainer: {
    marginBottom: 2,
    flexDirection: "row",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.invisible,
    paddingVertical: 10
  },
  categoryBox: {
    backgroundColor: colors.tomato,
    borderRadius: 20,
    height: 30,
    paddingHorizontal: 5,
    justifyContent: "center",
    marginRight: 5
  },
  categoryText: {
    color: colors.white
  },
  rateContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10
  },
  rateText: {
    fontWeight: "bold"
  },
  descriptionContainer: {
    width: "100%",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.invisible,
    paddingVertical: 5
  },
  descriptionText: {
    color: colors.mainText
  }
});

export default InfoSectionModule;
