import * as Types from '../../actions/types';
import initialState from '../initialState';

export default (state = initialState.pages.contactInfo, action) => {
  switch (action.type) {
    case Types.GET_USER_DATA:
      if (action.payload.users) {
        return { user: action.payload.users[0] };
      }
  }

  return state;
}
