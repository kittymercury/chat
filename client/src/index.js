import 'babel-polyfill';
import './styles.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux'
import { Provider } from 'react-redux';

// containers
import App from './containers/app';
import Login from './containers/login';
import Registration from './containers/registration';
import Chats from './containers/chats';
import Contacts from './containers/contacts';
import Messages from './containers/messages';
import ContactInfo from './containers/contactInfo';
import Settings from './containers/settings';
import Profile from './containers/profile';

// components
import Themes from './components/themes';

import store from './store/redux';
import BlobStore from './store/blob'

const history = syncHistoryWithStore(browserHistory, store);
window.blobStore = new BlobStore();

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <Route path="/registration" component={Registration} />
        <Route path="/authentication" component={Login} />
        <Route path="/settings" component={Settings} />
        <Route path="/contacts" component={Contacts} />
        <Route path="/contact-info/:userId" component={ContactInfo} />
        <Route path="/profile" component={Profile} />
        <Route path="/messages/:chatId" component={Messages} />
        <Route path="/chats" component={Chats} />
      </Route>
    </Router>
  </Provider>
, document.getElementById('app'));
