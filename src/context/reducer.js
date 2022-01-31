export default (state, action) => {
  switch (action.type) {
    case 'SET_MOVIES':
      return {
        ...state,
        movies: action.payload,
      };
    default:
      return state;
  }
};
