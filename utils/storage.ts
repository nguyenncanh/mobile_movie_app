import AsyncStorage from "@react-native-async-storage/async-storage";

export const storage = {
  //   getToken: () => AsyncStorage.getItem("accessToken"),
  getToken: () => process.env.EXPO_PUBLIC_API_KEY,
  setToken: (token: string) => AsyncStorage.setItem("accessToken", token),
  removeToken: () => AsyncStorage.removeItem("accessToken"),
};
