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
import { GetUserData } from "../../utils/utils";
import * as posts from "../../store/actions/posts";
import PostTile from "../../components/History/PostTile";

const History = props => {
  const dispatch = useDispatch();
  [userId, setUserId] = useState();
  [postArr, setUserPosts] = useState([]);
  [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    let unmounted = false;
    const getUserID = async () => {
      const result = await GetUserData();
      const transformedResult = JSON.parse(result);
      if (!unmounted) {
        setUserId(transformedResult.userData.accessToken.payload.username);
      }
    };
    getUserID();

    dispatch(posts.getUserPost(userId));
    // setUserPosts(props.posts.loadedUserPosts);
    return () => {
      unmounted = true;
    };
  }, [userId, dispatch, postArr]);

  const renderUserPosts = () => {
    return props.posts.loadedUserPosts.map(item => {
      return (
        <PostTile
          key={item.postId}
          postId={item.postId}
          imageUri={item.imgPathList[0].url}
          title={item.title}
          rate={item.rate}
          navigation={props.navigation}
        />
      );
    });
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    dispatch(posts.getUserPost(userId));
    // setUserPosts(props.posts.loadedUserPosts);
    setRefreshing(false);
  }, [refreshing]);

  let userPosts = props.posts;

  if (userPosts.getUserPostPending) {
    return <ActivityIndicator size='large' color={colors.theme} />;
  } else if (!userPosts.getUserPostPending && !userPosts.getUserPostStatus) {
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
  } else if (
    userPosts.getUserPostStatus &&
    userPosts.loadedUserPosts.length == 0
  ) {
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
  } else {
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
  }

  // return (
  //   <ScrollView
  //     style={styles.container}
  //     refreshControl={
  //       <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
  //     }
  //   >
  //     {userPosts.getUserPostPending ? (
  //       <ActivityIndicator size='large' color={colors.theme} />
  //     ) : !userPosts.getUserPostPending && !userPosts.getUserPostStatus ? (
  //       <Text style={styles.title}>
  //         Something went wrong. Cannot fetch data. Please check your internet
  //         network!
  //       </Text>
  //     ) : !userPosts.getUserPostPending &&
  //       userPosts.getUserPostStatus &&
  //       userPosts.loadedUserPosts.length == 0 ? (
  //       <View>
  //         <Text style={styles.title}>You don't have any post yet</Text>
  //         <Button
  //           title='Add Post'
  //           onPress={() => props.navigation.navigate("Post")}
  //         />
  //       </View>
  //     ) : (
  //       <View style={styles.title}>{renderUserPosts()}</View>
  //     )}
  //   </ScrollView>
  // );
};

History.navigationOptions = {
  headerTitle: "Manage Post",
  headerStyle: {
    backgroundColor: colors.theme
  }
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
    posts: state.posts
  };
};

export default connect(mapStateToProps)(History);
