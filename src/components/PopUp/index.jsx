/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect } from 'react';
import { useStateValue } from '../../context';
import { getMovie, IMAGE_API } from '../../api';
import Loader from '../Loader';

import './PopUpStyles.less';

function PopUp() {
  const [store, dispatch] = useStateValue();
  const [state, setState] = useState(false);
  useEffect(() => {
    fetch(getMovie(store.popupId))
      .then((d) => d.json())
      .then(setState);
  }, []);
  const handleClick = (e) => {
    if (e.target.classList[0] == 'popup') {
      setState(false);
      dispatch({ type: 'TOGGLE_POPUP', payload: false });
    }
  };
  return (
    <div
      role="popup"
      className={`popup ${!store.popup ? 'close' : ''}`}
      onClick={(e) => handleClick(e)}
    >
      <p className="closeText">click everywhere to close popup</p>
      {state ? (
        <div
          className="content"
          style={{
            background: `url(${IMAGE_API(
              state.backdrop_path,
              '1920_and_h800_multi_faces',
            )})`,
          }}
        >
          <div>
            <img src={IMAGE_API(state.poster_path, 300)} alt="" />
            <div className="company">
              <img
                src={IMAGE_API(state.production_companies[0].logo_path)}
                alt=""
              />
            </div>
            <div className='text'>
              <h1>
                {state.title} <span>({state.original_language})</span>
                <span>{state.vote_average}</span>
              </h1>
              <ul>
                {state.genres.map((item, i) => (
                  <li key={i}>{item.name}</li>
                ))}
              </ul>
              <p>{state.overview}</p>
            </div>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
}

export default PopUp;
