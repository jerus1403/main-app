import React from "react";

import { Modal } from "react-native";

const FullScreenModal = props => {
  return (
    <Modal animationType='slide' visible={props.openModal}>
      {props.children}
    </Modal>
  );
};

export default FullScreenModal;
