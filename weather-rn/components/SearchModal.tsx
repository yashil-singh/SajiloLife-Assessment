import { X } from "lucide-react-native";
import React, { PropsWithChildren } from "react";
import { Modal, TouchableOpacity, View } from "react-native";

type SearchModalProps = PropsWithChildren<{
  isVisible: boolean;
  onClose: () => void;
}>;

const SearchModal = ({ isVisible, onClose, children }: SearchModalProps) => {
  return (
    <Modal animationType="slide" transparent={true} visible={isVisible}>
      <View
        className="relative h-[50%] w-full bg-background p-4"
        style={{
          backgroundColor: "#ffffff",
          marginTop: "auto",
          height: "50%",
        }}
      >
        <TouchableOpacity
          onPress={onClose}
          className="absolute right-4 top-4"
          style={{ top: 14, right: 14 }}
        >
          <X color="black" />
        </TouchableOpacity>
        <View style={{ marginTop: 32 }}>{children}</View>
      </View>
    </Modal>
  );
};

export default SearchModal;
