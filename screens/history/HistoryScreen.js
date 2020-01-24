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
  ActivityIndicator
} from "react-native";

import { colors } from "../../styleUtility/colors";
import * as posts from "../../store/actions/posts";
import PostTile from "../../components/History/PostTile";

const History = props => {
  const dispatch = useDispatch();
  [refreshing, setRefreshing] = useState(false);
  const userPosts = props.state.posts.loadedUserPosts;
  const getUserPostStatus = props.state.posts.getUserPostStatus;
  const getUserPostError = props.state.posts.getUserPostError;
  const userId = props.state.attributes.userId;

  useEffect(() => {
    getUserPost();
  }, [dispatch, getUserPost]);

  const getUserPost = useCallback(async () => {
    setRefreshing(true);
    await dispatch(posts.getUserPost(userId));
    setRefreshing(false);
  }, [dispatch, setRefreshing]);

  const renderUserPosts = () => {
    return userPosts.map(item => {
      return (
        <PostTile
          key={item.postId}
          postId={item.postId}
          imgPathList={item.imgPathList}
          categoryList={item.categoryList}
          title={item.title}
          rate={item.rate}
          postObject={item}
          navigation={props.navigation}
        />
      );
    });
  };

  const onRefresh = () => {
    setRefreshing(true);
    getUserPost();
    setRefreshing(false);
  };

  if (refreshing) {
    return <ActivityIndicator size='large' color={colors.theme} />;
  }
  if (getUserPostStatus == true && userPosts.length == 0) {
    return (
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.theme}
          />
        }
      >
        <Text style={styles.title}>You don't have any post yet</Text>
        <Button
          title='Add Post'
          onPress={() => props.navigation.navigate("Post")}
        />
      </ScrollView>
    );
  }
  if (getUserPostStatus == false && getUserPostError) {
    return (
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.theme}
          />
        }
      >
        <Text style={styles.title}>
          Something went wrong. Cannot fetch data. Please check your internet
          network!
        </Text>
      </ScrollView>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor={colors.theme}
        />
      }
    >
      {renderUserPosts()}
    </ScrollView>
  );
};

History.navigationOptions = {
  headerTitle: "Manage Post",
  headerStyle: {
    backgroundColor: colors.theme
  },
  headerTintColor: colors.white
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    textAlign: "center"
  },
  container: {}
});

const mapStateToProps = state => {
  return {
    state: state
  };
};

export default connect(mapStateToProps)(History);
