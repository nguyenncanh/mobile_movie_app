import { icons } from "@/constants/icons";
import { useMovieDetails } from "@/hooks/useMovieDetails";
import { UseQueryResult } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { ActivityIndicator, Image, ScrollView, Text, View } from "react-native";

const MovieDetails = () => {
  const { id } = useLocalSearchParams();

  const {
    data: movie,
    isLoading: loading,
    error,
  }: UseQueryResult<MovieDetails, Error> = useMovieDetails(+id);

  console.log(`${process.env.EXPO_PUBLIC_API_URL}${movie?.poster_path}`);

  return (
    <View className="bg-primary flex-1">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 80 }}
      >
        {loading ? (
          <ActivityIndicator
            size="large"
            color={"#0000ff"}
            className="mt-10 self-center"
          />
        ) : (
          <View>
            <Image
              source={{
                uri: `${process.env.EXPO_PUBLIC_TMDB_IMAGE_URL}${movie?.poster_path}`,
              }}
              className="w-full h-[550px]"
              resizeMode="stretch"
            />
            <View className="flex-col items-start justify-center mt-5 px-5">
              <Text className="text-white font-bold text-xl">
                {movie?.title}
              </Text>
            </View>
            <View className="flex-row items-center mt-2 px-5 gap-x-2">
              <Text className="text-light-200 font-normal text-sm">
                {movie?.original_title}
              </Text>
              <View className="rounded-full size-0.5 bg-light-200" />
              <Text className="text-light-200 font-normal text-sm">
                {movie?.release_date?.split("-")?.at(0)}
              </Text>
            </View>
            <View className="flex-row items-center mt-2 px-5 gap-x-2">
              <View className="flex-row items-center py-1.5 px-3 bg-dark-100 rounded gap-x-1">
                <Image source={icons.star} className="size-3" />
                <View className="flex-row items-center">
                  <Text className="text-light-200 font-semibold text-xs">
                    {!movie?.vote_average
                      ? 0
                      : Math.round(movie?.vote_average * 10) / 10}
                  </Text>
                  <Text className="text-light-200 font-normal text-xs">
                    /10 (
                    {!movie?.vote_count
                      ? 0
                      : Math.round(movie?.vote_count / 1000)}
                    K)
                  </Text>
                </View>
              </View>
              <View className="flex-row items-center py-2 px-3 bg-dark-100 rounded gap-x-1">
                <Image source={icons.arrow} className="size-4 bg-light-300" />
              </View>
            </View>
            <View className="mt-6 px-5">
              <Text className="mb-1 text-light-200 font-light text-sm">
                Overview
              </Text>
              <Text className="text-white font-light text-sm leading-6">
                {movie?.overview}
              </Text>
            </View>
            <View className="flex-row items-start mt-8 px-5 gap-x-10">
              <View>
                <Text className="mb-1 text-light-200 font-light text-sm">
                  Release date
                </Text>
                <Text className="text-light-100 font-semibold text-sm">
                  {movie?.release_date} (Worldwide)
                </Text>
              </View>
              <View>
                <Text className="mb-1 text-light-200 font-light text-sm">
                  Status
                </Text>
                <Text className="text-light-100 font-semibold text-sm">
                  {movie?.status}
                </Text>
              </View>
            </View>
            <View className="mt-6 px-5">
              <Text className="mb-1 text-light-200 font-light text-sm">
                Genres
              </Text>
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
            </View>
            <View className="mt-6 px-5">
              <Text className="mb-1 text-light-200 font-light text-sm">
                Countries
              </Text>
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
            </View>
            <View className="flex-row items-start mt-8 px-5 gap-x-10">
              <View>
                <Text className="mb-1 text-light-200 font-light text-sm">
                  Budget
                </Text>
                <Text className="text-light-100 font-semibold text-sm">
                  {movie?.budget &&
                    `$${Math.round(movie?.budget / 1000000)} Million`}
                </Text>
              </View>
              <View>
                <Text className="mb-1 text-light-200 font-light text-sm">
                  Revenue
                </Text>
                <Text className="text-light-100 font-semibold text-sm">
                  {movie?.budget &&
                    `$${Math.round(movie?.revenue / 1000000)} Million`}
                </Text>
              </View>
            </View>
            <View className="mt-6 px-5">
              <Text className="mb-1 text-light-200 font-light text-sm">
                Production Companies
              </Text>
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
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default MovieDetails;
