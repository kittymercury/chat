import 'babel-polyfill';
import './styles.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, browserHistory } from 'react-router'

import App from './components/app';
import Chats from './components/chats';
import Registration from './components/registration';
import Authentication from './components/authentication';

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <Route path="/registration" component={Registration} />
      <Route path="/authentication" component={Authentication} />
    </Route>
  </Router>
, document.getElementById('app'));
