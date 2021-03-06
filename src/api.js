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

export const getMovie = (id) => useApi(`movie/${id}`);
export const searchApi = (q) => `${useApi('search/movie')}&query=${q}`;
export const MISSING_IMG =
  'https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg';

export const IMAGE_API = (path, width = 200) =>
  `https://image.tmdb.org/t/p/w${width}${path}`;
