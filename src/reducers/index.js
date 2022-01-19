import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

import pages from './pages';
import popup from './popup';
import header from './header';
import search from './search';
import location from './location';
import currentUser from './currentUser';
import records from './records';
import messageToForward from './messageToForward';
import selectedMessages from './selectedMessages';
import isStatusVisible from './isStatusVisible';
import isSelectMode from './isSelectMode';

export default combineReducers({
  pages,
  popup,
  header,
  search,
  routing,
  location,
  currentUser,
  records,
  messageToForward,
  selectedMessages,
  isStatusVisible,
  isSelectMode
});
