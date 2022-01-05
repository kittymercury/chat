import { combineReducers } from 'redux';

import chats from './chats';
import popup from './popup';
import contacts from './contacts';

export default combineReducers({ chats, popup });
