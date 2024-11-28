import { PixabayImageOrder } from "@/api/pixabay/types";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import OutsidePressHandler from "react-native-outside-press";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { ThemedText } from "../ThemedText/ThemedText";
import { DropdownProps } from "./Dropdown.config";

const Dropdown = ({ label, filterItems, onDropdownSelect }: DropdownProps) => {
  const [visible, setVisible] = useState<boolean>(false);

  const borderRadius = useSharedValue(30);

  const toggleDropdown = () => {
    setVisible(!visible);
  };

  useEffect(() => {
    borderRadius.value = visible
      ? withTiming(0, { duration: 100 })
      : withTiming(30, { duration: 100 });
  }, [visible]);

  const handleDropdownItemPress = (item: PixabayImageOrder) => {
    toggleDropdown();
    onDropdownSelect(item);
  };

  const renderDropdown = () => {
    if (visible) {
      return (
        <View style={styles.dropdownItemsWrapper}>
          {filterItems.map((item) => (
            <TouchableOpacity
              key={item}
              style={styles.dropdownItem}
              onPress={() => handleDropdownItemPress(item)}
            >
              <ThemedText type="defaultSemiBold">{item}</ThemedText>
            </TouchableOpacity>
          ))}
        </View>
      );
    }
  };

  const rotateStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotate: withTiming(visible ? "180deg" : "0deg", { duration: 150 }),
        },
      ],
    };
  });

  return (
    <OutsidePressHandler
      onOutsidePress={() => setVisible(false)}
      style={styles.wrapper}
    >
      <Animated.View
        style={{
          backgroundColor: "#00000020",
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          borderBottomLeftRadius: borderRadius,
          borderBottomRightRadius: borderRadius,
        }}
      >
        <TouchableOpacity style={styles.dropdown} onPress={toggleDropdown}>
          <ThemedText type="subtitle">{label}</ThemedText>
          <Animated.View style={rotateStyle}>
            <Ionicons name="chevron-down" size={30} color="#fff" />
          </Animated.View>
        </TouchableOpacity>
      </Animated.View>
      {renderDropdown()}
    </OutsidePressHandler>
  );
};

export default Dropdown;

const styles = StyleSheet.create({
  wrapper: {
    height: "100%",
    zIndex: 2,
  },
  dropdown: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    height: "100%",
    paddingHorizontal: 18,
  },
  dropdownItemsWrapper: {
    width: "100%",
    backgroundColor: "#00000020",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  dropdownItem: {
    width: "100%",
    alignItems: "center",
    paddingVertical: 8,
  },
});
