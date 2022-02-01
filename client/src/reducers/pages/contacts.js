import * as Types from '../../actions/types';
import initialState from '../initialState';

export default (state = initialState.pages.contacts, action) => {
  switch (action.type) {
    case Types.SEARCH_USERS:
      if (action.payload.users) {
        return { foundUser: action.payload.users[0] };
      }
    case Types.CLOSE_SEARCH:
      return { foundUser: null };
  }

  return state;
}
