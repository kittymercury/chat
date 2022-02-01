import * as CommonTypes from '../actions/types';
import * as RecordsTypes from '../actions/records/types';
import initialState from './initialState';

export default (state = initialState.popup, action) => {
  switch (action.type) {
    case CommonTypes.OPEN_POPUP:
      return {
        ...state,
        visible: true,
        message: action.payload.message,
        type: action.payload.type,
        callback: action.payload.callback
      };
    case CommonTypes.CLOSE_POPUP:
      return { ...state, visible: false, message: '', type: '' };
    case CommonTypes.UPDATE_CURRENT_USER:
    case CommonTypes.GET_USER_DATA:
    case RecordsTypes.CREATE_RECORDS:
    case RecordsTypes.UPDATE_RECORDS:
      if (action.payload.error) {
        return {
          ...state,
          visible: true,
          message: action.payload.error.description,
        };
      }
  }

  return state;
}
