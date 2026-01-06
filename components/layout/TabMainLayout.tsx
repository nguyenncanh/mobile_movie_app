import { images } from "@/constants/images";
import { Image, View } from "react-native";

interface Props {
  children: React.ReactNode;
}

export default function TabMainLayout({ children }: Props) {
  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute w-full z-0" />
      {children}
    </View>
  );
}
