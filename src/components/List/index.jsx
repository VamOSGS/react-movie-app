/* eslint-disable no-fallthrough */
/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react';
import { useStateValue } from '../../context';
import {
  TRENDING_API,
  UPCOMING_API,
  TOP_RATED_API,
  NOW_PLAYING_API,
} from '../../api';
import Loader from '../Loader';
import MovieCard from '../MovieCard';

import './ListStyles.less';

function List() {
  const [list, setList] = useState([]);
  const [state, dispatch] = useStateValue();
  useEffect(() => {
    if (!list.length) {
      fetch(TRENDING_API)
        .then((r) => r.json())
        .then((data) => {
          setList(data.results);
          dispatch({ type: 'SET_TRENDING', payload: data.results });
        });
    }
    switch (state.active) {
      case 'Trending': {
        setList(state.trending);
        break;
      }
      case 'Upcoming': {
        if (!state.upcoming.length) {
          fetch(UPCOMING_API)
            .then((r) => r.json())
            .then((data) => {
              setList(data.results);
              dispatch({ type: 'SET_UPCOMING', payload: data.results });
            });
        }
        setList(state.upcoming);
        break;
      }
      case 'Now Playing': {
        if (!state.nowPlaying.length) {
          fetch(NOW_PLAYING_API)
            .then((r) => r.json())
            .then((data) => {
              setList(data.results);
              dispatch({ type: 'SET_NOW_PLAYING', payload: data.results });
            });
        }
        setList(state.nowPlaying);
        break;
      }
      case 'Top Rated': {
        if (!state.topRated.length) {
          fetch(TOP_RATED_API)
            .then((r) => r.json())
            .then((data) => {
              setList(data.results);
              dispatch({ type: 'SET_TOP_RATED', payload: data.results });
            });
        }
        setList(state.topRated);
        break;
      }
      default:
        break;
    }
  }, [state.active]);

  return (
    <div className="list">
      {list.length ? (
        <ul>
          {list.map((item, key) => (
            <MovieCard
              key={key}
              title={item.title}
              date={item.release_date}
              imgPath={item.poster_path}
              bio={item.overview}
              rating={item.vote_average}
              lang={item.original_language}
              id={item.id}
            />
          ))}
        </ul>
      ) : (
        <Loader />
      )}
    </div>
  );
}

export default List;
