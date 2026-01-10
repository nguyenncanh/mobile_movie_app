import { images } from "@/constants/images";
import MarkedView from "@react-native-masked-view/masked-view";
import { Link } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";

const TrendingCard = ({
  movie: { movie_id, title, poster_url },
  index,
}: TrendingCardProps) => {
  return (
    <Link href={`/movies/${movie_id}`} asChild>
      <TouchableOpacity className="w-32 relative gap-x-5">
        <Image
          source={{
            uri: poster_url || "https://placehold.co/600x400/1a1a1a/FFFFFF.png",
          }}
          className="w-32 h-48 rounded-lg"
          resizeMode="cover"
        />
        <View className="absolute bottom-9 -left-3.5 px-2 py-1 rounded-full">
          <MarkedView
            maskElement={
              <Text className="font-extrabold text-white text-6xl italic">
                {index + 1}
              </Text>
            }
          >
            <Image
              source={images.rankingGradient}
              resizeMode="cover"
              className="size-14"
            />
          </MarkedView>
        </View>
        <Text className="text-white text-sm font-bold mt-2" numberOfLines={1}>
          {title}
        </Text>
      </TouchableOpacity>
    </Link>
  );
};

export default TrendingCard;
