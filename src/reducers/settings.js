import * as CommonTypes from '../actions/types';
import * as RecordsTypes from '../actions/records/types';
import * as MessagesTypes from '../actions/messages/types';
import initialState from './initialState';

export default (state = initialState.settings, action) => {
  switch (action.type) {
    case CommonTypes.CHANGE_THEME:
      return { ...state, theme: action.payload };
    // case RecordsTypes.DELETE_RECORDS:
    // case RecordsTypes.UPDATE_RECORDS:
      // return { ...state, selectedMessages: [], isSelectMode: false };
    case MessagesTypes.TURN_ON_SELECT_MODE:
      return { ...state, isSelectMode: true };
    case MessagesTypes.TURN_OFF_SELECT_MODE:
      return { ...state, isSelectMode: false, selectedMessages: [] };
    case MessagesTypes.SELECT_MESSAGE:
      if (state.selectedMessages.includes(action.payload)) {
        const filteredSelectedMessages = state.selectedMessages.filter((id) => id !== action.payload);
        return { ...state, selectedMessages: filteredSelectedMessages };
      }
      return { ...state, selectedMessages: [ ...state.selectedMessages, action.payload ] }
  }

  return state;
}
