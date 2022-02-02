import React, { useState } from 'react';
import SearchIcon from './SearchIcon';
import './SerachStyles.less';

function Search() {
  const [focused, setFocus] = useState(false);
  const [text, setText] = useState('');
  const handleFocus = (handler) => {
    setFocus(handler);
    if (!handler) setText('');
  };
  const handleText = (handler) => {
    setText(handler.target.value);
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
    </div>
  );
}

export default Search;
