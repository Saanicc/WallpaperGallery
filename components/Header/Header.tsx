import React, { PropsWithChildren } from "react";
import { Platform, View } from "react-native";

const Header = ({ children }: PropsWithChildren) => {
  return (
    <View
      style={{
        width: "100%",
        height: 50,
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 16,
        top: Platform.OS === "android" ? 10 : 0,
      }}
    >
      {children}
    </View>
  );
};

export default Header;
