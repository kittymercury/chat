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

    messages: {
      inputMessage: '',
      messageWithFeatures: null,
      messageToEdit: null,
      messageToReply: null,
    },

    registration: {
      reg_name: '',
      reg_login: '',
      reg_password: '',
      reg_inputType: 'password'
    },

    settings: {
      isEditMode: false,
      isNavActive: false,
    },
  },

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
