import '../common';
import '../../sass/pensions.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import { createHistory } from 'history';
import { Router, useRouterHistory } from 'react-router';
import { Provider } from 'react-redux';

import initReact from '../common/init-react';
import route from './routes';
import createCommonStore from '../common/store';
import createLoginWidget from '../login/login-entry';
import reducer from './reducer';

const store = createCommonStore(reducer);
createLoginWidget(store);

const browserHistory = useRouterHistory(createHistory)({
  basename: '/pension/application/527EZ'
});

function init() {
  ReactDOM.render((
    <Provider store={store}>
      <Router history={browserHistory}>
        {route}
      </Router>
    </Provider>
  ), document.getElementById('react-root'));
}

// Start react.
initReact(init);
