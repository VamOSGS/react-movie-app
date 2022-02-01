/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import { IMAGE_API } from '../../api';
import './MovieCardStyles.less';

function MovieCard({ date, title, bio, imgPath, lang, rating }) {
  return (
    <li className="movieCard">
      <img src={IMAGE_API(imgPath, 400)} alt={title} />
      <div>
        <span className='year'>{date.split('').slice(0, 4)}</span>
        <h3>
          {title} <span>({lang})</span>
        </h3>
        <p>Rating: {rating}</p>
      </div>
    </li>
  );
}

export default MovieCard;
