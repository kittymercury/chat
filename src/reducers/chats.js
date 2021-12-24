import * as Types from '../actions/chats/types';
import initialState from './initialState';

export default (state = initialState.chats, action) => {
  switch (action.type) {
    case Types.OPEN_CHAT:
      return browserHistory.push(`/messages/${payload.id}`);
    case Types.DELETE_CHAT:
      return state.filter((item) => item.id !== action.payload.id);
  }

  return state;
}
