import * as CommonTypes from '../../actions/types';
import * as LoginTypes from '../../actions/login/types';
import initialState from '../initialState';

export default (state = initialState.pages.login, action) => {
  switch (action.type) {
    case CommonTypes.CHANGE_INPUT_VALUE:
      if ([ 'login', 'password' ].includes(action.payload.type)) {
        return { ...state, [action.payload.type]: action.payload.value };
      };
    case LoginTypes.LOGIN:
      return { ...state, login: '', password: '' };
  }

  return state;
}
