import React, { useState, useEffect } from 'react';
import { POPULAR_API, IMAGE_API } from '../../api';
import { useStateValue } from '../../context';
import Loader from '../Loader';

import './MainMovie.less';

function MainMovie() {
  const [movie, setMovie] = useState(null);
  const [state, dispatch] = useStateValue();
  const getRandom = (min, max) =>
    Math.floor((max - min + 1) * Math.random()) + min;

  useEffect(() => {
    fetch(POPULAR_API)
      .then((res) => res.json())
      .then((data) => {
        setMovie(data.results[getRandom(0, 19)]);
        dispatch({ type: 'SET_POPULAR', payload: data.results });
      });
  }, []);

  return (
    <div className="mainMovie">
      {movie ? (
        <>
          <div className="text">
            <h1>{movie.title}</h1>
            <p>{movie.overview}</p>
          </div>
          <img
            src={IMAGE_API(movie.backdrop_path, '1920_and_h800_multi_faces')}
            alt={movie.title}
          />
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
}

export default MainMovie;
