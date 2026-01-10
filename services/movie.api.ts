import { get } from "./axiosClient";

export const fetchMovies = (
  params?: any,
  signal?: AbortSignal
): Promise<{ results: Movie[] }> => {
  const endpoint = params?.query
    ? "/search/movie"
    : "/discover/movie?sort_by=popularity.desc";

  return get(endpoint, {
    params,
    signal,
  });
};

export const fetchMovieDetails = (
  movieId?: number,
  signal?: AbortSignal
): Promise<MovieDetails> => {
  return get(`/movie/${movieId}`, {
    signal,
  });
};
