/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState } from 'react';
import SearchIcon from './SearchIcon';
import { searchApi, IMAGE_API } from '../../api';
import './SearchStyles.less';

function Search() {
  const [focused, setFocus] = useState(false);
  const [text, setText] = useState('');
  const [search, setSearch] = useState([]);
  const handleFocus = (handler) => {
    setFocus(handler);
    if (!handler) {
      setText('');
      setSearch([]);
    }
  };
  const handleClick = (movieid) => {
    console.log(movieid);
  };
  const handleText = (handler) => {
    const query = handler.target.value;
    setText(query);
    if (query.length >= 3) {
      fetch(searchApi(query))
        .then((d) => d.json())
        .then((data) => {
          setSearch(data.results);
        });
    } else if (query.length === 0) setSearch([]);
  };
  return (
    <div className={`search ${focused ? 'focused' : ''}`}>
      <SearchIcon stroke={focused ? 'red' : 'white'} />
      <input
        onBlur={() => handleFocus(false)}
        onFocus={() => handleFocus(true)}
        onChange={(e) => handleText(e)}
        value={text}
        type="text"
      />
      {search.length !== 0 && (
        <ul className="results">
          {search.map((item, k) => (
            <li
              key={k}
              onClick={() => {
                handleClick(item.movieid);
                console.log(item.movieid);
              }}
            >
              {item.poster_path && (
                <img src={IMAGE_API(item.poster_path)} alt="" />
              )}
              <h3>{item.title}</h3>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Search;
