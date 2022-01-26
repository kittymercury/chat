import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

import pages from './pages';
import popup from './popup';
import header from './header';
import footer from './footer';
import search from './search';
import location from './location';
import currentUser from './currentUser';
import records from './records';
import settings from './settings';

export default combineReducers({
  pages,
  popup,
  header,
  footer,
  search,
  routing,
  location,
  currentUser,
  records,
  settings
});
