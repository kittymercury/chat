import * as Types from '../actions/types';
import initialState from './initialState';

const TITLE_BY_PATHNAME = {
  '/chats': 'Chats',
  '/contacts': 'Contacts',
  '/settings': 'Settings'
};

export default (state = initialState.header, action) => {
  switch (action.type) {
    case Types.OPEN_SEARCH:
      return { ...state, visible: false };
    case Types.CLOSE_SEARCH:
      return { ...state, visible: true };
    case '@@router/LOCATION_CHANGE':
      if (([ '/login', '/registration' ]).includes(action.payload.pathname)) {
        return { ...state, visible: false };
      }
      if (action.payload.pathname.includes('messages')) {
        return { ...state, visible: false };
      }

      return { ...state, title: TITLE_BY_PATHNAME[action.payload.pathname] }
  }

  return state;
}
