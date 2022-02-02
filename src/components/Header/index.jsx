import React from 'react';
import './HeaderStyles.less';
import Search from '../Search';

function Header() {
  return (
    <header className="header">
      <h1>Movieer</h1>
      <Search />
    </header>
  );
}

export default Header;
