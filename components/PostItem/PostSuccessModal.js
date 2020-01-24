// import React, { useState, useReducer, useCallback, useEffect } from "react";
// import {
//   StyleSheet,
//   Text,
//   ScrollView,
//   TextInput,
//   View,
//   Button,
//   FlatList,
//   Alert,
//   Dimensions,
//   ActivityIndicator,
//   Modal
// } from "react-native";
// import { useDispatch, connect, getState } from "react-redux";

// import { AFTER_POST_SUCCESS } from "../../store/types/types";

// const PostSuccessModal = ({...props, }) => {

//     // Set addPostStatus back to null after user close the post success modal
//   const setDefaultAddPostStatus = () => props.setDefaultStatusAction();
//     return (
//         <View style={styles.container}>
//              <Modal
//         animationType='slide'
//         transparent={false}
//         visible={openModal.postSuccessModal}
//       >
//         <View style={{ marginTop: 22 }}>
//           <Text> Posted Successfully!</Text>
//           <Button
//             title='Done'
//             onPress={() => {
//               setDefaultAddPostStatus();
//               closeModal("postSuccessModal");
//               props.navigation.navigate("HistoryTab");
//             }}
//           />
//         </View>
//       </Modal>
//         </View>
//     )
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         marginTop: 22
//     }
// })

// const mapDispatchToProps = dispatch => {
//     return {
//       setDefaultStatusAction: () => dispatch({ type: AFTER_POST_SUCCESS })
//     };
//   };

// export default connect(null,  mapDispatchToProps)(PostSuccessModal);
