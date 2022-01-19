import * as Types from '../../actions/types';
import initialState from '../initialState';

export default (state = initialState.pages.profile, action) => {
  switch (action.type) {
    case Types.CHANGE_INPUT_VALUE:
    console.log(action.payload);
      if (action.payload.page === 'profile') {
        if (action.payload.type === 'name') {
          return { ...state, name: action.payload.value }
        }
        if (action.payload.type === 'avatar') {
          return { ...state, avatar: action.payload.value }
        }
        // if (action.payload.type === 'login') {
        //   if (action.payload.value === '' || Constants.ALLOWED_SYMBOLS.test(action.payload.value)) {
        //     return { ...state, login: action.payload.value };
        //   }
        // }
      };
    case Types.CHANGE_HELP_MESSAGE:
      return {
        ...state,
        helpMessage: {
          color: action.payload.color,
          message: action.payload.message
        }
      };
    case Types.OPEN_AVATAR_MENU:
      return { ...state, isAvatarMenuVisible: true };
    case Types.CLOSE_AVATAR_MENU:
    case Types.UPDATE_CURRENT_USER:
      return { ...state, isAvatarMenuVisible: false };
    // case Types.UPDATE_CURRENT_USER:
    //   return { ...state, isAvatarMenuVisible: false };
  }

  return state;
}
