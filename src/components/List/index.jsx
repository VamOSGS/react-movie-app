/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react';
import { useStateValue } from '../../context';
import { TRENDING_API, IMAGE_API } from '../../api';

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
        <li key={key}>
          <img
            src={IMAGE_API(item.poster_path, 300)}
            alt={item.title}
          />
          <h3>
            {item.title} ({item.release_date.split('').slice(0, 4)})
          </h3>
          <p>{item.overview}</p>
        </li>
      ))}
    </ul>
  ) : (
    <h3>Loading...</h3>
  );
}

export default List;
