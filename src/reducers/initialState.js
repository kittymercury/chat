export default {
  chats: [],
  users: [],
  messages: [],

  location: '',

  header: {
    title: '',
    visible: false
  },

  pages: {
    chats: {},

    contacts: {},

    contactInfo: {},

    login: {
      login: '',
      password: '',
      isPasswordVisible: false
    },

    messages: {
      inputMessage: '',
      messageWithFeatures: null,
      messageToEdit: null,
      messageToReply: null,
    },

    registration: {
      name: '',
      login: '',
      password: '',
      isPasswordVisible: false
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
