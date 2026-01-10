import { Loading, MovieCard, SearchBar, TabMainLayout } from "@/components";
import { icons } from "@/constants/icons";
import { useDebounce, useMovies } from "@/hooks";
import { useState } from "react";
import { FlatList, Image, Text, View } from "react-native";

const Saved = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const { data, isLoading, error }: any = useMovies({
    query: debouncedSearchQuery,
  });

  return (
    <TabMainLayout>
      <FlatList
        data={data?.results}
        renderItem={({ item }) => <MovieCard {...item} />}
        keyExtractor={(item) => item?.id?.toString()}
        numColumns={3}
        className="px-5"
        columnWrapperStyle={{
          justifyContent: "flex-start",
          gap: 16,
          marginVertical: 12,
        }}
        ListHeaderComponent={
          <>
            <View className="w-full flex-row justify-center mt-20 mb-5">
              <Image source={icons.logo} className="w-12 h-10" />
            </View>
            <View className="my-5">
              <SearchBar
                placeholder="Search saved movies..."
                value={searchQuery}
                onChangeText={(text: string) => setSearchQuery(text)}
              />
            </View>
            {isLoading && <Loading />}
            {error && (
              <Text className="text-red-500 px-5 my-3">
                Error: {error?.message}
              </Text>
            )}
            {!isLoading &&
              !error &&
              searchQuery?.trim() &&
              data?.results?.length > 0 && (
                <Text className="text-xl text-white font-bold">
                  Search Results for{" "}
                  <Text className="text-accent">{searchQuery}</Text>
                </Text>
              )}
          </>
        }
        ListEmptyComponent={
          !isLoading && !error ? (
            <View className="flex-1 flex-row justify-center mt-10 px-5">
              <Text className="text-light-300">
                {searchQuery?.trim() ? "No movies found" : "Search for a movie"}
              </Text>
            </View>
          ) : null
        }
      />
    </TabMainLayout>
  );
};

export default Saved;
