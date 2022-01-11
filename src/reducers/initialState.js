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
      log_login: '',
      log_password: '',
      log_inputType: 'password'
    },

    messages: {},

    registration: {
      reg_name: '',
      reg_login: '',
      reg_password: '',
      reg_inputType: 'password'
    },

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
