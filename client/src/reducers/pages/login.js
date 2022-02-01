import * as CommonTypes from '../../actions/types';
import * as LoginTypes from '../../actions/login/types';
import initialState from '../initialState';

export default (state = initialState.pages.login, action) => {
  switch (action.type) {
    case CommonTypes.CHANGE_INPUT_VALUE:
      if (action.payload.page === 'login') {
        if ([ 'login', 'password' ].includes(action.payload.type)) {
          return { ...state, [action.payload.type]: action.payload.value };
        }
      }
    case CommonTypes.CHANGE_PASSWORD_VISIBILITY:
      return { ...state, isPasswordVisible: action.payload };
    case LoginTypes.LOGIN:
      return { ...state, login: '', password: '' };
    case LoginTypes.GO_TO_REGISTRATION_PAGE:
      return { ...state, login: '', password: '' };
  }

  return state;
}
