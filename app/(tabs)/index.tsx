import TabMainLayout from "@/components/layout/TabMainLayout";
import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import { icons } from "@/constants/icons";
import { useMovies } from "@/hooks/useMovies";
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

  const { data, isLoading, error }: any = useMovies({
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
        {isLoading ? (
          <ActivityIndicator
            size="large"
            color={"#0000ff"}
            className="mt-10 self-center"
          />
        ) : error ? (
          <Text>Error: {error?.message}</Text>
        ) : (
          <View className="flex-1 mt-5">
            <SearchBar
              onPress={() => router.push("/search")}
              placeholder="Search for a movie"
            />
            <>
              <Text className="text-lg text-white font-bold mt-5 mb-1">
                Latest Movies
              </Text>
              <FlatList
                data={data?.results}
                renderItem={({ item }) => <MovieCard {...item} />}
                keyExtractor={(item) => item?.id?.toString()}
                numColumns={3}
                columnWrapperStyle={{
                  justifyContent: "flex-start",
                  gap: 16,
                  marginVertical: 10,
                }}
                contentContainerStyle={{ paddingBottom: 100 }}
                scrollEnabled={false}
              />
            </>
          </View>
        )}
      </ScrollView>
    </TabMainLayout>
  );
}
