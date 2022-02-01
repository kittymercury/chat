import * as Types from '../actions/types';
import initialState from './initialState';

export default (state = initialState.search, action) => {
  switch (action.type) {
    case '@@router/LOCATION_CHANGE':
      const page = action.payload.pathname;
      if (page.includes('contacts')) {
        return { ...state, placeholder: `Enter user's login` }
      } else {
        return { ...state, placeholder: 'Enter username or message text'}
      }
    case Types.OPEN_SEARCH:
      return { ...state, visible: true }; // mention 'type' prop according to page
    case Types.CLOSE_SEARCH:
      return { ...state, visible: false, value: '' };
    case Types.CHANGE_SEARCH_VALUE:
      return { ...state,  value: action.payload };
  }

  return state;
}
