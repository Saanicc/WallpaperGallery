import About from "@/screens/About";
import { StatusBar } from "react-native";

export default function AboutScreen() {
  return (
    <>
      <StatusBar backgroundColor={"#000"} />
      <About />
    </>
  );
}
