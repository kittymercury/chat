import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

import pages from './pages';
import popup from './popup';
import header from './header';
import search from './search';
import location from './location';

export default combineReducers({
  pages,
  popup,
  header,
  search,
  routing,
  location
});
