import { combineReducers } from 'redux';

import chats from './chats';
import login from './login';
import registration from './registration';

export default combineReducers({ chats, login, registration });
