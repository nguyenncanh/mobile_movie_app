import {
  Loading,
  MovieCard,
  SearchBar,
  TabMainLayout,
  TrendingCard,
} from "@/components";
import { icons } from "@/constants/icons";
import { useMovies, useTrendingMovies } from "@/hooks";
import { UseQueryResult } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { FlatList, Image, ScrollView, Text, View } from "react-native";

export default function Index() {
  const router = useRouter();

  const {
    data: trendingMoviesData,
    isLoading: trendingMoviesLoading,
    error: trendingMoviesError,
  }: UseQueryResult<TrendingMovie[] | undefined, Error> = useTrendingMovies();

  const {
    data: moviesData,
    isLoading: moviesLoading,
    error: moviesError,
  }: UseQueryResult<{ results: Movie[] }, Error> = useMovies({
    query: "",
  });

  return (
    <TabMainLayout>
      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ minHeight: "100%" }}
      >
        <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />
        {moviesLoading || trendingMoviesLoading ? (
          <Loading />
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
                // contentContainerStyle={{ paddingBottom: 100 }}
                scrollEnabled={false}
              />
            </View>
          </View>
        )}
      </ScrollView>
    </TabMainLayout>
  );
}
