/* eslint-disable no-undef */
/* eslint-disable implicit-arrow-linebreak */
// eslint-disable-next-line no-undef

const useApi = (options) =>
  `https://api.themoviedb.org/3/${options}?api_key=${ENV_API_KEY}`;

export const TRENDING_API = useApi('trending/movie/week');
export const POPULAR_API = useApi('movie/popular');
export const TOP_RATED_API = useApi('movie/top_rated');
export const UPCOMING_API = useApi('movie/upcoming');
export const NOW_PLAYING_API = useApi('movie/now_playing');

export const IMAGE_API = (path, width = 200) =>
  `https://image.tmdb.org/t/p/w${width}${path}`;
