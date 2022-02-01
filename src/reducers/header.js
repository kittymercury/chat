import * as CommonTypes from '../actions/types';
import * as MessagesTypes from '../actions/messages/types';
import * as LoginTypes from '../actions/login/types';
import * as RegistrationTypes from '../actions/registration/types';
import initialState from './initialState';

export default (state = initialState.header, action) => {
  switch (action.type) {
    case LoginTypes.LOGIN:
    case RegistrationTypes.SIGN_UP:
      return { ...state, visible: true };

    case MessagesTypes.TURN_ON_SELECT_MODE:
      return {
        ...state,
        buttons: { left: [{ name: 'turn-off-select-mode'}], right: [{ name: 'number-of-selected-messages' }] }
      };
    case CommonTypes.OPEN_SEARCH:
      return { ...state, visible: false };
    case CommonTypes.CLOSE_SEARCH:
      return { ...state, visible: true };
    case MessagesTypes.TURN_OFF_SELECT_MODE:
      return {
        ...state,
        isForwardMode: false,
        // visible: true,
        buttons: { left: [{ name: 'back' }], right: [{ name: 'messages' }] }
      };
    case CommonTypes.GET_USER_DATA:
      if (action.payload.users) {
        const user = action.payload.users[0];
        return {
          ...state,
          title: user.name,
          subtitle: user.status,
          avatar: user.avatar
        };
      }
    case CommonTypes.EDIT_PROFILE:
      return {
        ...state,
        title: '',
        subtitle: '',
        buttons: { left: [{ name: 'cancel-settings '}], right: [{ name: 'save-settings' }] }
      };
    case MessagesTypes.FORWARD:
      return {
        ...state,
        isForwardMode: true,
      }
    case MessagesTypes.CANCEL_FORWARD:
        return {
          ...state,
          isForwardMode: false
        }
    case '@@router/LOCATION_CHANGE':
      const pathname = action.payload.pathname;

      if (([ '/authentication', '/registration' ]).includes(pathname)) {
        return { ...state, visible: false };
      }

      if (pathname === '/chats') {
        if (state.isForwardMode) {
          return {
            ...state,
            title: '',
            subtitle: '',
            buttons: {
              left: [{ name: 'cancel-forward'}],
              right: [{ name: 'number-of-messages-to-forward' }]
            }
          }
        } else {
          return {
            ...state,
            title: 'Chats',
            subtitle: '',
            buttons: { left: [{ name: 'invisible' }], right: [{ name: 'search' }] }
          }
        }
      }

      if (pathname === '/profile') {
        return {
          ...state,
          title: '',
          subtitle: '',
          buttons: { left: [{ name: 'cancel-profile' }], right: [{ name: 'save-profile' }] }
        }
      }

      if (pathname === '/contacts') {
        return {
          ...state,
          title: 'Contacts',
          subtitle: '',
          buttons: { left: [{ name: 'invisible' }], right: [{ name: 'search' }] }
        }
      }

      if (pathname === '/settings') {
        return {
          ...state,
          title: 'Settings',
          subtitle: '',
          buttons: { left: [{ name: 'invisible' }], right: [{ name: 'settings' }] }
        }
      }

      const page = pathname.split('/')[1];

      if (page === 'messages') {
        if (state.isForwardMode) {
          return {
            ...state,
            buttons: {
              left: [{ name: 'turn-off-select-mode'}],
              right: [{ name: 'number-of-selected-messages' }]
            }
          }
        }
        return {
          ...state,
          buttons: { left: [{ name: 'back' }], right: [{ name: 'messages' }] }
        };
      }

      if (page === 'contact-info') {
        return {
          ...state,
          buttons: { left: [{ name: 'back' }], right: [{ name: 'invisible' }] }
        };
      }
  }

  return state;
}
