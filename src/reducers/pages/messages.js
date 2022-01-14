import * as Types from '../../actions/messages/types';
import initialState from '../initialState';

export default (state = initialState.pages.messages, action) => {
  switch (action.type) {
    case Types.ON_MESSAGE: // behavior depends on mode (select or not)
      if (state.messageWithFeatures === action.payload) {
        return { ...state, messageWithFeatures: null }
      } else {
        return { ...state, messageWithFeatures: action.payload }
      }; // continue for select mode
    case Types.REPLY:
      return { ...state, messageToReply: action.payload, messageWithFeatures: null };
    case Types.CANCEL_REPLYING:
      return { ...state, messageToReply: null, inputMessage: '' };
    case Types.FORWARD:
      return { ...state, messageWithFeatures: null }; // add actions for global state
    case Types.EDIT_MESSAGE:
      return {
        ...state,
        messageWithFeatures: null,
        messageToEdit: action.payload.message,
        inputMessage: action.payload.content
      };
    case Types.CHANGE_INPUT_MESSAGES:
      return { ...state, inputMessage: action.payload.value };
  }

  return state;
}

export const onMessage = (id) => {
  return { type: Types.ON_MESSAGE, payload: id }
}

export const reply = (message) => {
  return { type: Types.REPLY, payload: message }
}

export const cancelReplying = (message) => {
  return { type: Types.REPLY, payload: message }
}

export const forward = (message) => {
  return { type: Types.FORWARD, payload: message }
}

export const editMessage = (message) => {
  return { type: Types.EDIT_MESSAGE, payload: message }
}

export const changeInputMessages = (value) => {
  return { type: Types.CHANGE_INPUT_MESSAGES, payload: value }
}
