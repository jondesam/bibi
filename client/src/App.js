import React, { Fragment, useEffect } from 'react';
import Navbar from './components/layout/Navbar';

import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Routes from './components/routing/Routes';

// Redux
import { Provider } from 'react-redux';
import store from './store';
// import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';
import { loadUser } from './actions/auth';

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
        <body>
          <Fragment>
            <Navbar />
            <Switch>
              <Route component={Routes}></Route>
            </Switch>
            <footer className='footer'>
              <p className='bg-light p text-footer xxsmall'>
                {' '}
                All rights reserved. | Contact : godaiys@hotmail.com{' '}
              </p>
            </footer>
          </Fragment>
        </body>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
