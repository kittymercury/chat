export default {
  chats: [],
  users: [],
  messages: [],

  header: {
    visible: true,
  },

  pages: {
    chats: {},

    contacts: {},
    contactInfo: {},

    login: {
      login: '',
      password: '',
    },

    messages: {},
    registration: {},
    settings: {},
  },

  settings: {
    isEditMode: false,
  },

  privacyAndSecurity: {},

  popup: {
    visible: false,
    message: '',
    type: ''
  },

  search: {
    visible: false,
    value: ''
  }
}

// this.state = {
//   currentUser: currentUser,
//
//   users: [],
//   chats: [],
//   messages: [],
//
//   typing: {},
//   messageToForward: null,
//   foundMessage: null,
//   selectedMessages: [],
//
//   theme: theme,
//   popUp: null,
//
//   isSelectMode: false,
//   isStatusVisible: true,
//   isMsgMenuActive: false,
//   isSearch: false,
// };
