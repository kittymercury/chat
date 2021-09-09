import 'babel-polyfill';
import './styles.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';

import App from './components/app';
import Registration from './components/registration';
import Authentication from './components/authentication';
import Settings from './components/settings';
import PrivacyAndSecurity from './components/privacy-and-security';
import Contacts from './components/contacts';
import ContactInfo from './components/contact-info';
import Messages from './components/messages';
import Chats from './components/chats';
import Themes from './components/themes';

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <Route path="/registration" component={Registration} />
      <Route path="/authentication" component={Authentication} />
      <Route path="/settings" component={Settings} />
      <Route path="/contacts" component={Contacts} />
      <Route path="/contact-info/:userId" component={ContactInfo} />
      <Route path="/messages/:chatId" component={Messages} />
      <Route path="/chats" component={Chats} />
    </Route>
  </Router>
, document.getElementById('app'));
