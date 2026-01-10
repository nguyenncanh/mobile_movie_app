import { Loading } from "@/components";
import { icons } from "@/constants/icons";
import { useMovieDetails } from "@/hooks";
import { UseQueryResult } from "@tanstack/react-query";
import { useLocalSearchParams, useRouter } from "expo-router";
import { FC, memo, ReactNode } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

const MovieInfo: FC<{ label: string; children: string | ReactNode }> = memo(
  function MovieInfo({ label, children }) {
    return (
      <View className="mt-6">
        <Text className="mb-1 text-light-200 font-light text-sm">{label}</Text>
        {children || (
          <Text className="text-white font-light text-sm leading-6">N/A</Text>
        )}
      </View>
    );
  }
);

const MovieDetails = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const {
    data: movie,
    isLoading: loading,
  }: // error,
  UseQueryResult<MovieDetails, Error> = useMovieDetails(+id);

  return (
    <View className="bg-primary flex-1 relative">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 80 }}
      >
        {loading ? (
          <Loading />
        ) : (
          <View>
            <Image
              source={{
                uri: `${process.env.EXPO_PUBLIC_TMDB_IMAGE_URL}${movie?.poster_path}`,
              }}
              className="w-full h-[550px]"
              resizeMode="stretch"
            />
            <View className="px-5 pb-10">
              <View className="flex-col items-start justify-center mt-5">
                <Text className="text-white font-bold text-xl">
                  {movie?.title}
                </Text>
              </View>
              <View className="flex-row items-center mt-2 gap-x-2">
                <Text className="text-light-200 font-normal text-sm">
                  {movie?.original_title}
                </Text>
                <View className="rounded-full size-0.5 bg-light-200" />
                <Text className="text-light-200 font-normal text-sm">
                  {movie?.release_date?.split("-")?.at(0)}
                </Text>
                <View className="rounded-full size-0.5 bg-light-200" />
                <Text className="text-light-200 font-normal text-sm">
                  {movie?.runtime}m
                </Text>
              </View>
              <View className="flex-row items-center">
                <View className="flex-row items-center mt-6 py-1.5 px-3 bg-dark-100 rounded gap-x-1">
                  <Image source={icons.star} className="size-3" />
                  <View className="flex-row items-center">
                    <Text className="text-light-200 font-semibold text-xs">
                      {Math.round(movie?.vote_average ?? 0)}/10
                    </Text>
                    <Text className="text-light-200 font-normal text-xs ml-1">
                      ({Math.round(movie?.vote_count ?? 0) / 1000}K votes)
                    </Text>
                  </View>
                </View>
              </View>
              <MovieInfo label="Overview">
                <Text className="text-white font-light text-sm leading-6">
                  {movie?.overview}
                </Text>
              </MovieInfo>
              <View className="flex-row items-start gap-x-10">
                <MovieInfo label="Release date">
                  <Text className="text-light-100 font-semibold text-sm">
                    {movie?.release_date} (Worldwide)
                  </Text>
                </MovieInfo>
                <MovieInfo label="Status">
                  <Text className="text-light-100 font-semibold text-sm">
                    {movie?.status}
                  </Text>
                </MovieInfo>
              </View>
              <MovieInfo label="Genres">
                <View className="flex-row items-center justify-start gap-2 flex-wrap">
                  {movie?.genres?.map((item, index) => (
                    <View
                      key={index}
                      className="flex-row items-center py-1.5 px-3 bg-dark-100 rounded gap-x-1"
                    >
                      <Text className="text-light-100 font-semibold text-sm">
                        {item?.name}
                      </Text>
                    </View>
                  ))}
                </View>
              </MovieInfo>
              <MovieInfo label="Countries">
                <View className="flex-row items-center justify-start gap-2 flex-wrap">
                  {movie?.production_countries?.map((item, index) => (
                    <View
                      key={index}
                      className="flex-row items-center justify-start gap-2"
                    >
                      <Text className="text-light-100 font-semibold text-sm">
                        {item?.name}
                      </Text>
                      {index !== movie?.production_countries?.length - 1 && (
                        <View className="rounded-full size-0.5 bg-light-200" />
                      )}
                    </View>
                  ))}
                </View>
              </MovieInfo>
              <View className="flex-row items-start gap-x-10">
                <MovieInfo label="Budget">
                  <Text className="text-light-100 font-semibold text-sm">
                    ${(movie?.budget ?? 0) / 1000000} Million
                  </Text>
                </MovieInfo>
                <MovieInfo label="Revenue">
                  <Text className="text-light-100 font-semibold text-sm">
                    ${(movie?.revenue ?? 0) / 1000000} Million
                  </Text>
                </MovieInfo>
              </View>
              <MovieInfo label="Production Companies">
                <View className="flex-row items-center justify-start gap-2 flex-wrap">
                  {movie?.production_companies?.map((item, index) => (
                    <View
                      key={index}
                      className="flex-row items-center justify-start gap-2"
                    >
                      <Text className="text-light-100 font-semibold text-sm">
                        {item?.name}
                      </Text>
                      {index !== movie?.production_companies?.length - 1 && (
                        <View className="rounded-full size-0.5 bg-light-200" />
                      )}
                    </View>
                  ))}
                </View>
              </MovieInfo>
            </View>
          </View>
        )}
      </ScrollView>
      <TouchableOpacity
        className="absolute left-4 top-16 bg-light-100 opacity-80 rounded-full h-[40px] px-4 flex flex-row items-center justify-center gap-x-2"
        onPress={() => router.back()}
      >
        <Image
          source={icons.arrow}
          tintColor={"#151312"}
          className="size-5 transform rotate-180"
        />
        <Text>Back</Text>
      </TouchableOpacity>
      <TouchableOpacity
        className="absolute right-4 top-16 bg-light-100 opacity-80 rounded-full h-[40px] px-4 flex flex-row items-center justify-center gap-x-2"
        onPress={() => router.back()}
      >
        <Image source={icons.save} tintColor={"#151312"} className="size-5" />
      </TouchableOpacity>
    </View>
  );
};

export default MovieDetails;
