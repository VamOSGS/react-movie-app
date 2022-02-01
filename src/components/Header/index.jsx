import React from 'react';
import './HeaderStyles.less';

function Header() {
  return (
    <header className="header">
      <h1>Movieer</h1>
      <input type="text" placeholder="Search.." />
    </header>
  );
}

export default Header;
