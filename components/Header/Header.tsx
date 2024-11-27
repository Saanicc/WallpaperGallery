import React, { PropsWithChildren } from "react";
import { Platform, View } from "react-native";

const Header = ({ children }: PropsWithChildren) => {
  return (
    <View
      style={{
        width: "100%",
        height: 50,
        position: "absolute",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 16,
        ...Platform.select({
          ios: {
            top: 65,
          },
          android: {
            top: 45,
          },
        }),
      }}
    >
      {children}
    </View>
  );
};

export default Header;
