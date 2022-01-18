import * as CommonTypes from '../actions/types';
import * as RecordsTypes from '../actions/records/types';
import initialState from './initialState';

export default (state = initialState.records, action) => {
  switch (action.type) {
    case CommonTypes.INIT:
      return {
        users: action.payload.users,
        chats: action.payload.chats,
        messages: action.payload.messages,
      };
    case RecordsTypes.CREATE_RECORDS:
    case RecordsTypes.UPDATE_RECORDS:
    case RecordsTypes.DELETE_RECORDS:
      return { ...state, [action.payload.model]: action.payload.records };
  }

  return state;
}
