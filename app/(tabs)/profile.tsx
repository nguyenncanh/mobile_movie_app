import { TabMainLayout } from "@/components";
import { Text, View } from "react-native";

const Profile = () => {
  return (
    <TabMainLayout>
      <View className="flex flex-1 items-center justify-center">
        <Text className="text-white">Profile</Text>
      </View>
    </TabMainLayout>
  );
};

export default Profile;
