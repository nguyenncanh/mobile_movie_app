import { fetchMovieDetails, fetchMovies } from "@/services";
import { getTrendingMovies } from "@/services/appwrite";
import { useQuery } from "@tanstack/react-query";

export const useMovies = (params?: any) => {
  return useQuery<{ results: Movie[] }, Error>({
    queryKey: ["movies", params],
    queryFn: ({ signal }) => fetchMovies(params, signal),
  });
};

export const useMovieDetails = (movieId: number) => {
  return useQuery<MovieDetails, Error>({
    queryKey: ["movie_details", movieId],
    queryFn: ({ signal }) => fetchMovieDetails(movieId, signal),
  });
};

export const useTrendingMovies = () => {
  return useQuery<TrendingMovie[] | undefined, Error>({
    queryKey: ["trending_movies"],
    queryFn: () => getTrendingMovies(),
  });
};
