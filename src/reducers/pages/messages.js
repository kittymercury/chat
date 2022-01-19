import * as MessagesTypes from '../../actions/messages/types';
import * as RecordsTypes from '../../actions/records/types';
import * as CommonTypes from '../../actions/types';
import initialState from '../initialState';

export default (state = initialState.pages.messages, action) => {
  switch (action.type) {
    case MessagesTypes.CLICK_MESSAGE: // behavior depends on mode (select or not)
      if (state.messageWithFeatures === action.payload) {
        return { ...state, messageWithFeatures: null }
      } else {
        return { ...state, messageWithFeatures: action.payload }
      }; // continue for select mode
    case MessagesTypes.REPLY:
      return { ...state, messageToReply: action.payload, messageWithFeatures: null };
    case MessagesTypes.CANCEL_REPLYING:
      return { ...state, messageToReply: null, inputValue: '' };
    case MessagesTypes.FORWARD:
      return { ...state, messageWithFeatures: null }; // add actions for global state
    case MessagesTypes.EDIT_MESSAGE:
      return {
        ...state,
        messageWithFeatures: null,
        messageToEdit: action.payload.message,
        inputValue: action.payload.content
      };
    case CommonTypes.CHANGE_INPUT_VALUE:
      if (action.payload.page === 'messages') {
        return { ...state, [action.payload.type]: action.payload.value };
      }
    case RecordsTypes.DELETE_RECORDS:
      return { ...state, isSelectMode: false, messageWithFeatures: null };
  }

  return state;
}
