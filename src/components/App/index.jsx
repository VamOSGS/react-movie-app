import React from 'react';
import { StateProvider } from '../../context';

import './AppStyles.less';

import List from '../List';
import Header from '../Header';
import MainMovie from '../MainMovie';
import Menu from '../Menu';
import Footer from '../Footer';

function App() {
  const initState = {
    trending: [],
    upcoming: [],
    nowPlaying: [],
    topRated: [],
    active: 'Trending',
  };

  return (
    <StateProvider initialState={initState}>
      <div>
        <Header />
        <MainMovie />
        <Menu />
        <List />
        <Footer />
      </div>
    </StateProvider>
  );
}

export default App;
