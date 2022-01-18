import * as Types from './types';

import api from '../../api';

export const goToRegistrationPage = (payload) => {
  return { type: Types.GO_TO_REGISTRATION_PAGE, payload };
}

export const onLogin = (payload) => {
  console.log({onlogin: payload});
  return { type: Types.LOGIN, payload }
}
