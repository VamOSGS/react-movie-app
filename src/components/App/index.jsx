import React, { useEffect } from 'react';
import { StateProvider } from '../../context';
import './AppStyles.less';

import List from '../List';

function App() {
  const initState = {};

  return (
    <StateProvider initialState={initState}>
      <div>
        <h1>APP</h1>
        <List />
      </div>
    </StateProvider>
  );
}

export default App;
