/* eslint-disable no-undef */
/* eslint-disable implicit-arrow-linebreak */
// eslint-disable-next-line no-undef

const useApi = (options) =>
  `https://api.themoviedb.org/3/${options}?api_key=${ENV_API_KEY}`;

export const TRENDING_API = useApi('trending/movie/week');

export const POPULAR_API = useApi('movie/popular');

export const IMAGE_API = (path, width = 200) =>
  `https://image.tmdb.org/t/p/w${width}${path}`;
