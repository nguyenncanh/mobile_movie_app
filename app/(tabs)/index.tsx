import TabMainLayout from "@/components/layout/TabMainLayout";
import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import TrendingCard from "@/components/TrendingCard";
import { icons } from "@/constants/icons";
import { useMovies } from "@/hooks/useMovies";
import { useTrendingMovies } from "@/hooks/useTrendingMovies";
import { useRouter } from "expo-router";
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  Text,
  View,
} from "react-native";

export default function Index() {
  const router = useRouter();

  const {
    data: trendingMoviesData,
    isLoading: trendingMoviesLoading,
    error: trendingMoviesError,
  }: any = useTrendingMovies();

  const {
    data: moviesData,
    isLoading: moviesLoading,
    error: moviesError,
  }: any = useMovies({
    query: "",
  });

  return (
    <TabMainLayout>
      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}
      >
        <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />
        {moviesLoading || trendingMoviesLoading ? (
          <ActivityIndicator
            size="large"
            color={"#0000ff"}
            className="mt-10 self-center"
          />
        ) : moviesError || trendingMoviesError ? (
          <Text>
            Movies Error: {moviesError?.message || trendingMoviesError?.message}
          </Text>
        ) : (
          <View className="flex-1 mt-5">
            <SearchBar
              onPress={() => router.push("/search")}
              placeholder="Search for a movie"
            />
            {trendingMoviesData && (
              <View className="mt-10">
                <Text className="text-lg text-white font-bold">
                  Trending Movies
                </Text>
                <FlatList
                  className="mt-3"
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  ItemSeparatorComponent={() => <View className="w-4" />}
                  data={trendingMoviesData}
                  renderItem={({ item, index }) => (
                    <TrendingCard movie={item} index={index} />
                  )}
                  keyExtractor={(item) => item?.movie_id?.toString()}
                />
              </View>
            )}
            <View className="mt-10">
              <Text className="text-lg text-white font-bold">
                Latest Movies
              </Text>
              <FlatList
                data={moviesData?.results}
                renderItem={({ item }) => <MovieCard {...item} />}
                keyExtractor={(item) => item?.id?.toString()}
                numColumns={3}
                columnWrapperStyle={{
                  justifyContent: "flex-start",
                  gap: 16,
                  marginVertical: 12,
                }}
                contentContainerStyle={{ paddingBottom: 100 }}
                scrollEnabled={false}
              />
            </View>
          </View>
        )}
      </ScrollView>
    </TabMainLayout>
  );
}
