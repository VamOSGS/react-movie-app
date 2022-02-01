import React from 'react';
import { StateProvider } from '../../context';

import './AppStyles.less';

import List from '../List';
import Header from '../Header';
import MainMovie from '../MainMovie';
import Menu from '../Menu';

function App() {
  const initState = {};

  return (
    <StateProvider initialState={initState}>
      <div>
        <Header />
        <MainMovie />
        <Menu />
        <List />
      </div>
    </StateProvider>
  );
}

export default App;
