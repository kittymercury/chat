import * as Types from './types';

// import api from '../../api';

export const signUp = (payload) => {
  return { type: Types.SIGN_UP, payload }
}

export const backToLoginPage = () => {
  return { type: Types.BACK_TO_LOGIN_PAGE }
}
