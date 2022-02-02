import React, { useEffect, useState } from 'react';
import './HeaderStyles.less';
import Search from '../Search';
function Header() {
  const [scrolled, setScroll] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    };
    window.removeEventListener('scroll', handleScroll);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return (
    <header className={`header ${scrolled}`}>
      <h1>Movieer</h1>
      <Search />
    </header>
  );
}

export default Header;
