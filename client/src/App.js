import React, { Fragment, useEffect } from 'react';
import Navbar from './components/layout/Navbar';

import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Routes from './components/routing/Routes';

// Redux
import { Provider } from 'react-redux';
import store from './store';
import setAuthToken from './utils/setAuthToken';
import { loadUser } from './reduxActions/auth';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Fragment>
          <Navbar />
          <Switch>
            <Route component={Routes}></Route>
          </Switch>
        </Fragment>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
