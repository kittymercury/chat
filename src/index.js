import 'babel-polyfill';
import './styles.scss';
import './sizes.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import { Provider } from 'react-redux';

import App from './components/app';
import Registration from './components/registration';
import Login from './components/login';
import Settings from './containers/settings';
import PrivacyAndSecurity from './components/privacyAndSecurity';
import Contacts from './components/contacts';
import ContactInfo from './components/contactInfo';
import Messages from './components/messages';
import Chats from './components/chats';
import Themes from './components/themes';

import store from './store/redux';
import BlobStore from './store/blob'

window.blobStore = new BlobStore();

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <Route path="/registration" component={Registration} />
        <Route path="/authentication" component={Login} />
        <Route path="/settings" component={Settings} />
        <Route path="/contacts" component={Contacts} />
        <Route path="/contact-info/:userId" component={ContactInfo} />
        <Route path="/messages/:chatId" component={Messages} />
        <Route path="/chats" component={Chats} />
      </Route>
    </Router>
  </Provider>
, document.getElementById('app'));
