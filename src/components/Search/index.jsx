/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState, useEffect, useRef } from 'react';
import SearchIcon from './SearchIcon';
import { searchApi, IMAGE_API, MISSING_IMG } from '../../api';
import { useStateValue } from '../../context';
import './SearchStyles.less';

function useOutsideAlerter(ref, handler) {
  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        if (
          e.target.offsetParent &&
          e.target.offsetParent.classList[0] !== 'content'
        ) {
          if (e.target.offsetParent.classList[0] !== 'popup') {
            handler(false);
          }
        }
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);
}
function OutsideAlerter({ handler, name, children }) {
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, handler);

  return (
    <div className={name} ref={wrapperRef}>
      {children}
    </div>
  );
}

function Search() {
  const [focused, setFocus] = useState(false);
  const [text, setText] = useState('');
  const [search, setSearch] = useState([]);
  const [store, dispatch] = useStateValue();

  const handleFocus = (handler) => {
    setFocus(handler);
    if (!handler) {
      setText('');
      setSearch([]);
    }
  };
  const handleClick = (popupId) => {
    dispatch({ type: 'TOGGLE_POPUP', payload: { popup: true, popupId } });
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
    <OutsideAlerter
      handler={handleFocus}
      name={`search ${focused ? 'focused' : ''}`}
    >
      <SearchIcon stroke={focused ? 'red' : 'white'} />
      <input
        className={`${focused}`}
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
                handleClick(item.id);
              }}
            >
              <img
                src={
                  item.poster_path ? IMAGE_API(item.poster_path) : MISSING_IMG
                }
                alt={item.title}
              />

              <h3>{item.title}</h3>
            </li>
          ))}
        </ul>
      )}
    </OutsideAlerter>
  );
}

export default Search;
