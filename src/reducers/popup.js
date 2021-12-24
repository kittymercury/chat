import * as Types from '../actions/popup/types';
import initialState from './initialState';

export default (state = initialState.popup, action) => {
  switch (action.type) {
    case Types.OPEN_POPUP:
      return {
        ...state,
        visible: true,
        message: action.payload.message,
        type: action.payload.type,
        callback: action.payload.callback
      };
    case Types.CLOSE_POPUP:
      return { ...state, visible: false };
  }

  return state;
}
