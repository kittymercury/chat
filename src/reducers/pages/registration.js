import * as CommonTypes from '../../actions/types';
import * as RegistrationTypes from '../../actions/registration/types';
import initialState from '../initialState';

import * as Constants from '../../constants';

export default (state = initialState.pages.registration, action) => {
  switch (action.type) {
    case CommonTypes.CHANGE_INPUT_VALUE:
      if (action.payload.type === 'reg_login') {
        if (action.payload.value === '' || Constants.ALLOWED_SYMBOLS.test(action.payload.value)) {
          return { ...state, reg_login: action.payload.value };
        }
      };
      if ([ 'reg_name', 'reg_password' ].includes(action.payload.type)) {
        return { ...state, [action.payload.type]: action.payload.value };
      };
    case CommonTypes.CHANGE_PASSWORD_VISIBILITY:
      return { ...state, reg_inputType: action.payload.reg_inputType };
    case RegistrationTypes.BACK_TO_LOGIN_PAGE:
      return { ...state, reg_inputType: 'password', reg_login: '', reg_password: '', reg_name: '' };
  }

  return state;
}
