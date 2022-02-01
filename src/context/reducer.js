export default (state, action) => {
  switch (action.type) {
    case 'SET_TRENDING':
      return {
        ...state,
        trending: action.payload,
      };
    case 'SET_NOW_PLAYING':
      return {
        ...state,
        nowPlaying: action.payload,
      };
    case 'SET_TOP_RATED':
      return {
        ...state,
        topRated: action.payload,
      };
    case 'SET_UPCOMING':
      return {
        ...state,
        upcoming: action.payload,
      };
    case 'SET_ACTIVE':
      return {
        ...state,
        active: action.payload,
      };
    default:
      return state;
  }
};
