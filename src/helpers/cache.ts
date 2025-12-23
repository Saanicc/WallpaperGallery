import AsyncStorage from "@react-native-async-storage/async-storage";

export default class Cache {
  static storeData = async <T>(data: T, key: string) => {
    try {
      const jsonValue = JSON.stringify(data);
      await AsyncStorage.setItem(`@${key}`, jsonValue);
    } catch (e) {
      console.log(e);
    }
  };

  static getData = async <T>(key: string) => {
    try {
      const jsonValue = await AsyncStorage.getItem(`@${key}`);
      const data = jsonValue !== null ? JSON.parse(jsonValue) : null;

      return data as T;
    } catch (e) {
      console.log(e);
    }
  };
}
