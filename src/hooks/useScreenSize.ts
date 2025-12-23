import { Dimensions } from "react-native";

export const useScreenSize = () => {
  const {
    width: _screenWitdh,
    height: _screenHeight,
    scale,
  } = Dimensions.get("screen");

  return {
    width: _screenWitdh,
    height: _screenHeight,
    actualWidthInPixels: _screenWitdh * scale,
    actualHeightInPixels: _screenHeight * scale,
  };
};
