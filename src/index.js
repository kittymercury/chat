import 'babel-polyfill';
import './styles.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, browserHistory } from 'react-router'

import App from './components/app';
import Chats from './components/chats';
import Registration from './components/registration';
import Authentication from './components/authentication';

class AppTemporary extends React.Component {
  render() {
    return (
      <div>
        App

        {this.props.children}
      </div>
    )
  }
}

class ChatsTemporary extends React.Component {
  render() {
    return (
      <div>
        Chats
      </div>
    )
  }
}

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      Header
      <Route path="/chats" component={ChatsTemporary} />
      Footer

      <Route path="/registration" component={Registration} />
      <Route path="/authentication" component={Authentication} />
    </Route>
  </Router>
, document.getElementById('app'));
