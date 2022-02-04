/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState, useEffect, useRef } from 'react';
import SearchIcon from './SearchIcon';
import { searchApi, IMAGE_API } from '../../api';
import { useStateValue } from '../../context';
import './SearchStyles.less';

function useOutsideAlerter(ref, handler) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        handler(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);
}
function OutsideAlerter(props) {
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, props.handler);

  return (
    <div className={props.name} ref={wrapperRef}>
      {props.children}
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
              {item.poster_path && (
                <img src={IMAGE_API(item.poster_path)} alt="" />
              )}
              <h3>{item.title}</h3>
            </li>
          ))}
        </ul>
      )}
    </OutsideAlerter>
  );
}

export default Search;
