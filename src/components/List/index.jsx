/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react';
import { useStateValue } from '../../context';
import { TRENDING_API  } from '../../api';
import MovieCard from '../MovieCard';

function List() {
  const [list, setList] = useState([]);
  const [state, dispatch] = useStateValue();
  useEffect(() => {
    fetch(TRENDING_API)
      .then((r) => r.json())
      .then((data) => {
        setList(data.results);
        dispatch({ type: 'SET_MOVIES', payload: data.results });
      });
  }, []);
  return list.length ? (
    <ul>
      {list.map((item, key) => (
        <MovieCard
          key={key}
          title={item.title}
          date={item.release_date}
          imgPath={item.poster_path}
          bio={item.overview}
        />
      ))}
    </ul>
  ) : (
    <h3>Loading...</h3>
  );
}

export default List;
