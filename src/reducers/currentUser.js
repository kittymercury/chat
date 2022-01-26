import * as LoginTypes from '../actions/login/types';
import * as CommonTypes from '../actions/types';
import initialState from './initialState';

export default (state = initialState.currentUser, action) => {
  switch (action.type) {
    case LoginTypes.LOGIN:
      return action.payload;
    case CommonTypes.UPDATE_CURRENT_USER:
      if (!action.payload.error) {
        return { ...state, ...action.payload.user };
      }
    case CommonTypes.LOG_OUT:
      return null;
  }

  return state;
}
