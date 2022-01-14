import * as Types from '../actions/types';
import initialState from './initialState';

export default (state = initialState.header, action) => {
  switch (action.type) {
    case Types.OPEN_SEARCH:
      return { ...state, visible: false };
    case Types.CLOSE_SEARCH:
      return { ...state, visible: true };
    case Types.CHANGE_HEADER_VISIBILITY:
      if (action.payload.page.includes('messages')) return { ...state, visible: true };
      if (action.payload.page === 'settings') {
        return { ...state, visible: false };
      }
      if (action.payload.page === 'authentication') return { ...state, visible: false };
      if (action.payload.page === 'registration') return { ...state, visible: false };
      if (action.payload.page.includes('contact-info')) return { ...state, visible: false };
  }

  return state;
}
