import { get } from "./axiosClient";

export const fetchMovies = (params?: any, signal?: AbortSignal) => {
  const endpoint = params?.query
    ? "/search/movie"
    : "/discover/movie?sort_by=popularity.desc";

  return get(endpoint, {
    params,
    signal,
  });
};
