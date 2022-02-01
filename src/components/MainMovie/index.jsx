import React, { useState, useEffect } from 'react';
import { POPULAR_API, IMAGE_API } from '../../api';

function MainMovie() {
  const [movie, setMovie] = useState(null);
  const getRandom = (min, max) =>
    Math.floor((max - min + 1) * Math.random()) + min;

  useEffect(() => {
    fetch(POPULAR_API)
      .then((res) => res.json())
      .then((data) => {
        setMovie(data.results[getRandom(0, 20)]);
      });
  }, []);

  return (
    <div className="mainMovie">
      {movie ? (
        <>
          <h1>{movie.title}</h1>
          <p>{movie.overview}</p>
          <img
            src={IMAGE_API(movie.backdrop_path, '1920_and_h800_multi_faces')}
            alt={movie.title}
            width="1200px"
          />
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default MainMovie;