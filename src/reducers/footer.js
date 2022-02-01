import * as Types from '../actions/types';
import initialState from './initialState';

export default (state = initialState.footer, action) => {
  switch (action.type) {
    case '@@router/LOCATION_CHANGE':
      const pathname = action.payload.pathname;
      const page = pathname.split('/')[1];

      if (([ 'authentication', 'registration', 'messages', 'profile' ]).includes(page)) {
        return { visible: false };
      } else {
        return { visible: true };
      }
  }

  return state;
}
