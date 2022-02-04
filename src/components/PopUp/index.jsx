/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect } from 'react';
import { useStateValue } from '../../context';
import { getMovie, IMAGE_API, MISSING_IMG } from '../../api';
import Loader from '../Loader';

import './PopUpStyles.less';

function PopUp() {
  const [store, dispatch] = useStateValue();
  const [state, setState] = useState(false);
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    fetch(getMovie(store.popupId))
      .then((d) => d.json())
      .then(setState);
  }, []);
  const handleClick = (e) => {
    if (e.target.classList[0] === 'popup') {
      document.body.style.overflow = 'auto';
      setState(false);
      dispatch({
        type: 'TOGGLE_POPUP',
        payload: { popup: false, popupId: null },
      });
    }
  };
  return (
    <div
      className={`popup ${!store.popup ? 'close' : ''}`}
      onClick={(e) => handleClick(e)}
    >
      <p className="closeText">click anywhere to close popup</p>
      {state ? (
        <div
          className="content"
          style={{
            backgroundImage: `url(${
              state.backdrop_path
                ? IMAGE_API(state.backdrop_path, '1920_and_h800_multi_faces')
                : ''
            }) `,
          }}
        >
          <div>
            {state.poster_path && (
              <img
                className="poster"
                src={IMAGE_API(state.poster_path, '600_and_h900_bestv2')}
                alt={state.title}
              />
            )}

            <div className="company">
              {state.production_companies[0] &&
                state.production_companies[0].logo_path && (
                  <img
                    src={IMAGE_API(state.production_companies[0].logo_path)}
                    alt={state.production_companies[0].name}
                  />
                )}
            </div>
            <div className="text">
              <h1>
                {state.title} <span>({state.original_language})</span>
                <span>{state.vote_average}</span>
              </h1>
              {state.genres && (
                <ul>
                  {state.genres.map((item, i) => (
                    <li key={i}>{item.name}</li>
                  ))}
                </ul>
              )}
              <p>{state.overview ? state.overview : 'Missing description'}</p>
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
