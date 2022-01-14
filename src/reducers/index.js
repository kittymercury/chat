import { combineReducers } from 'redux';

import pages from './pages';
import popup from './popup';
import header from './header';
import search from './search';

export default combineReducers({
  pages,
  popup,
  header,
  search
});
