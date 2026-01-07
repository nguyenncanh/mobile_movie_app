import { fetchMovieDetails } from "@/services";
import { useQuery } from "@tanstack/react-query";

export const useMovieDetails = (movieId: number) => {
  return useQuery<MovieDetails, Error>({
    queryKey: ["movie_details", movieId],
    queryFn: ({ signal }) => fetchMovieDetails(movieId, signal),
  });
};
