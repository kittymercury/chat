export default {
  currentUser: '',

  records: {
    chats: [],
    users: [],
    messages: [],
  },

  location: {},

  header: {
    title: '',
    subtitle: '',
    visible: false,
    buttons: {
      left: [],
      right: []
    }
  },

  pages: {
    chats: {},

    contacts: {},

    contactInfo: {
      user: {}
    },

    profile: {
      name: '',
      login: '',
      avatar: ''
    },

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
