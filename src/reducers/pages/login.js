import * as CommonTypes from '../../actions/types';
import * as LoginTypes from '../../actions/login/types';
import initialState from '../initialState';

export default (state = initialState.pages.login, action) => {
  switch (action.type) {
    case CommonTypes.CHANGE_INPUT_VALUE:
      if ([ 'log_login', 'log_password' ].includes(action.payload.type)) {
        return { ...state, [action.payload.type]: action.payload.value };
      };
    case CommonTypes.CHANGE_PASSWORD_VISIBILITY:
      return { ...state, log_inputType: action.payload.log_inputType };
    case LoginTypes.LOGIN:
      return { ...state, log_login: '', log_password: '', log_inputType: 'password' };
    case LoginTypes.GO_TO_REGISTRATION_PAGE:
      return { ...state, log_login: '', log_password: '', log_inputType: 'password' };
  }

  return state;
}
