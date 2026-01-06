import { fetchMovies } from "@/services";
import { useQuery } from "@tanstack/react-query";

export const useMovies = (params?: any) => {
  return useQuery({
    queryKey: ["movies", params],
    queryFn: ({ signal }) => fetchMovies(params, signal),
  });
};
