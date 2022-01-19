import * as MessagesTypes from '../actions/messages/types';
import * as RecordsTypes from '../actions/records/types';
import * as CommonTypes from '../actions/types';
import initialState from './initialState';

export default (state = initialState.messageToForward, action) => {
  switch (action.type) {
    case MessagesTypes.FORWARD:
      return action.payload;
    case RecordsTypes.UPDATE_RECORDS:
    case CommonTypes.CANCEL_FORWARD_MESSAGE:
      return { messageToForward: null };
  }

  return state;
}
