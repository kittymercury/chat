import * as Types from '../actions/types';
import initialState from './initialState';

export default (state = initialState.header, action) => {
  switch (action.type) {
    case Types.OPEN_SEARCH:
      return { ...state, visible: false };
    case Types.CLOSE_SEARCH:
      return { ...state, visible: true };
    case '@@router/LOCATION_CHANGE':
      const pathname = action.payload.pathname;

      if (([ '/login', '/registration' ]).includes(pathname)) {
        return { ...state, visible: false };
      }

      if (pathname.includes('messages')) {
        const id = pathname.split('/')[2];
        const user = { id, status: 'offline', name: 'username' };

        return {
          visible: true,
          title: user.name,
          subtitle: user.status,
          buttons: { left: [{ name: 'back' }], right: [{ name: 'messages' }] }
        };
      }

      if (pathname.includes('contact-info')) {
        const id = pathname.split('/')[2];
        const user = { id, status: 'offline', name: 'username' };

        return {
          visible: true,
          title: user.name,
          subtitle: user.status,
          buttons: { left: [{ name: 'back' }], right: [{ name: 'invisible' }] }
        };
      }

      if (pathname === '/profile') {
        return {
          visible: true,
          title: '',
          subtitle: '',
          buttons: { left: [{ name: 'cancel-profile' }], right: [{ name: 'save-profile' }] }
        }
      }

      if (pathname === '/contacts') {
        return {
          visible: true,
          title: 'Contacts',
          subtitle: '',
          buttons: { left: [], right: [{ name: 'search' }] }
        }
      }

      if (pathname === '/chats') {
        return {
          visible: true,
          title: 'Chats',
          subtitle: '',
          buttons: { left: [], right: [{ name: 'search' }] }
        }
      }

      if (pathname === '/settings') {
        return {
          visible: true,
          title: 'Settings',
          subtitle: '',
          buttons: { left: [{ name: 'invisible' }], right: [{ name: 'settings' }] }
        }
      }
    case Types.EDIT_PROFILE:
      return {
        visible: true,
        title: '',
        subtitle: '',
        buttons: { left: [{ name: 'cancel-settings '}], right: [{ name: 'save-settings' }] }
      };
  }

  return state;
}
