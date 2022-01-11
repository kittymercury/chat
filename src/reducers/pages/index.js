import { combineReducers } from 'redux';

import chats from './chats';
import login from './login';

export default combineReducers({ chats, login });
