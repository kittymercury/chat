import { combineReducers } from 'redux';

import chats from './chats';
import login from './login';
import registration from './registration';
import settings from './settings';
import messages from './messages';

export default combineReducers({
  chats,
  login,
  registration,
  settings,
  messages
});
