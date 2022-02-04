/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import { IMAGE_API } from '../../api';
import { useStateValue } from '../../context';

import './MovieCardStyles.less';

function MovieCard({ date, title, bio, imgPath, lang, rating, id }) {
  const [store, dispatch] = useStateValue();

  const handleClick = () => {
    dispatch({ type: 'TOGGLE_POPUP', payload: { popup: true, popupId: id } });
  };
  return (
    <li className="movieCard">
      <img onClick={handleClick} src={IMAGE_API(imgPath, 400)} alt={title} />
      <div onClick={handleClick}>
        <span className="year">{date.split('').slice(0, 4)}</span>
        <h3>
          {title} <span>({lang})</span>
        </h3>
        <p>Rating: {rating}</p>
      </div>
    </li>
  );
}

export default MovieCard;
