import * as Types from '../../actions/types';
import initialState from '../initialState';

export default (state = initialState.pages.settings.privacyAndSecurity, action) => {
  switch (action.type) {
    case Types.CHANGE_INPUT_VALUE:
      if (action.payload.page === 'settings') {
        if ([ 'currentPassword', 'newPassword', 'repeatNewPassword' ].includes(action.payload.type)) {
          return { ...state, [action.payload.type]: action.payload.value };
        }
      }
    case Types.CHANGE_PASSWORD_VISIBILITY:
      return { ...state, isPasswordVisible: action.payload };
    // case Types.UPDATE_CURRENT_USER:
    //   return { ...state, currentPassword: '', newPassword: '', repeatNewPassword: '' };
    case Types.CONFIRM_NEW_PASSWORD:
      return { ...state, currentPassword: '', newPassword: '', repeatNewPassword: '' };
    case Types.OPEN_POPUP:
      // return { ...state, currentPassword: '', newPassword: '', repeatNewPassword: '' };
  }

  return state;
}
