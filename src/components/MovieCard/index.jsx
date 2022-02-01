/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import { IMAGE_API } from '../../api';
import './MovieCardStyles.less';

function MovieCard({ date, title, bio, imgPath }) {
  return (
    <li className="movieCard">
      <img src={IMAGE_API(imgPath, 300)} alt={title} />
      <h3>
        {title}({date.split('').slice(0, 4)})
      </h3>
      <p>{bio}</p>
    </li>
  );
}

export default MovieCard;
