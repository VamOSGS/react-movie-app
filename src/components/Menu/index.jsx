/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import { useStateValue } from '../../context';
import './MenuStyles.less';

function Menu() {
  const [active, setActive] = useState(0);
  const [state, dispatch] = useStateValue();
  const menu = ['Trending', 'Now Playing', 'Top Rated', 'Upcoming'];

  const handleClick = (k) => {
    setActive(k);
    dispatch({ type: 'SET_ACTIVE', payload: menu[k] });
  };
  return (
    <ul className="menu">
      {menu.map((item, key) => (
        <li
          onClick={() => handleClick(key)}
          key={key}
          className={active === key ? 'active' : null}
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

export default Menu;
