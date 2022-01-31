import * as MessagesTypes from '../../actions/messages/types';
import * as RecordsTypes from '../../actions/records/types';
import * as CommonTypes from '../../actions/types';
import initialState from '../initialState';

export default (state = initialState.pages.messages, action) => {
  switch (action.type) {
    case MessagesTypes.TURN_ON_SELECT_MODE:
      return { ...state, messageWithFeatures: null }
    case MessagesTypes.CLICK_MESSAGE: // behavior depends on mode (select or not)
      if (state.messageWithFeatures === action.payload.id) {
        return { ...state, messageWithFeatures: null }
      } else {
        return {
          ...state,
          messageWithFeatures: action.payload.id,
          optionsPosition: action.payload.optionsPosition
        }
      }; // continue for select mode
    case MessagesTypes.REPLY:
      return { ...state, messageToReply: action.payload, messageWithFeatures: null };
    case MessagesTypes.FORWARD:
      return { ...state, messageWithFeatures: null };
    case MessagesTypes.CANCEL_REPLYING:
      return { ...state, messageToReply: null, inputValue: '' };
    case MessagesTypes.EDIT_MESSAGE:
      return {
        ...state,
        messageWithFeatures: null,
        messageToEdit: action.payload.message,
        inputValue: action.payload.content
      };
    case CommonTypes.CHANGE_INPUT_VALUE:
      if (action.payload.page === 'messages') {
        return { ...state, inputValue: action.payload.value };
      }
    case RecordsTypes.DELETE_RECORDS:
      return {
        ...state,
        isSelectMode: false,
        messageWithFeatures: null,
      };
    case RecordsTypes.UPDATE_RECORDS:
      return {
        ...state,
        messageWithFeatures: null,
        messageToEdit: null,
        inputValue: ''
      };
    case RecordsTypes.CREATE_RECORDS:
      return {
        ...state,
        messageWithFeatures: null,
        messageToReply: null,
        inputValue: ''
      };
  }

  return state;
}
