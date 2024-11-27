import { PixabayImageOrder } from "@/api/pixabay/types";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
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
    borderRadius.value = !visible
      ? withTiming(0, { duration: 100 })
      : withTiming(30, { duration: 100 });
    setVisible(!visible);
  };

  const handleDropdownItemPress = (item: PixabayImageOrder) => {
    toggleDropdown();
    onDropdownSelect(item);
  };

  const renderDropdown = () => {
    if (visible) {
      return (
        <Animated.View
          style={{
            width: "100%",
            overflow: "hidden",
            alignItems: "center",
            backgroundColor: "#00000025",
            borderBottomLeftRadius: 30,
            borderBottomRightRadius: 30,
          }}
        >
          {filterItems.map((item) => (
            <TouchableOpacity
              key={item}
              style={{
                width: "100%",
                alignItems: "center",
                paddingVertical: 8,
              }}
              onPress={() => handleDropdownItemPress(item)}
            >
              <ThemedText type="defaultSemiBold">{item}</ThemedText>
            </TouchableOpacity>
          ))}
        </Animated.View>
      );
    }
  };

  const stylez = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotate: withTiming(visible ? "180deg" : "0deg", { duration: 150 }),
        },
      ],
    };
  });

  return (
    <Animated.View
      style={{ position: "absolute", top: 60, alignItems: "center" }}
    >
      <Animated.View
        style={{
          backgroundColor: "#00000025",
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          borderBottomLeftRadius: borderRadius,
          borderBottomRightRadius: borderRadius,
        }}
      >
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 5,
            paddingHorizontal: 24,
            paddingVertical: 2,
          }}
          onPress={toggleDropdown}
        >
          <ThemedText style={{ marginVertical: 12 }} type="title">
            {label}
          </ThemedText>
          <Animated.View style={stylez}>
            <Ionicons name="chevron-down" size={30} color="#fff" />
          </Animated.View>
        </TouchableOpacity>
      </Animated.View>
      {renderDropdown()}
    </Animated.View>
  );
};

export default Dropdown;

const styles = StyleSheet.create({});
