import { combineReducers } from 'redux';

import chats from './chats';
import popup from './popup';

export default combineReducers({ chats, popup });
