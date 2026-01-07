import { getTrendingMovies } from "@/services/appwrite";
import { useQuery } from "@tanstack/react-query";

export const useTrendingMovies = () => {
  return useQuery({
    queryKey: ["trending_movies"],
    queryFn: () => getTrendingMovies(),
  });
};
