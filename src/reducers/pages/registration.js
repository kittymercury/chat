import * as CommonTypes from '../../actions/types';
import * as RegistrationTypes from '../../actions/registration/types';
import initialState from '../initialState';

import * as Constants from '../../constants';

export default (state = initialState.pages.registration, action) => {
  switch (action.type) {
    case CommonTypes.CHANGE_INPUT_VALUE:
      if (action.payload.page === 'registration') {
        if (action.payload.type === 'login') {
          if (action.payload.value === '' || Constants.ALLOWED_SYMBOLS.test(action.payload.value)) {
            return { ...state, login: action.payload.value };
          }
        }
        if ([ 'name', 'password' ].includes(action.payload.type)) {
          return { ...state, [action.payload.type]: action.payload.value };
        }
      }
    case CommonTypes.CHANGE_PASSWORD_VISIBILITY:
      return { ...state, isPasswordVisible: action.payload };
    case RegistrationTypes.BACK_TO_LOGIN_PAGE:
      return { ...state, inputType: 'password', login: '', password: '', name: '' };
  }

  return state;
}
