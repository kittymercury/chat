import * as Types from '../actions/types';
import initialState from './initialState';

export default (state = initialState.header, action) => {
  switch (action.type) {
    case Types.OPEN_SEARCH:
      return { ...state, visible: false };
    case Types.CLOSE_SEARCH:
      return { ...state, visible: true };
  }

  return state;
}
