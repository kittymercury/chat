export default {
  currentUser: '',

  theme: 'default',
  isStatusVisible: true,

  records: {
    chats: [],
    users: [],
    messages: [],
  },

  location: {},

  foundMessage: null,
  messageToForward: null,
  selectedMessages: [],
  isSelectMode: false,
  typing: {},

  popup: {
    visible: false,
    message: '',
    type: ''
  },

  search: {
    visible: false,
    value: ''
  },

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
      user: null
    },

    profile: {
      name: '',
      login: '',
      avatar: null,
      isAvatarMenuVisible: false,
      helpMessage: {
        color: '',
        message: ''
      }
    },

    login: {
      login: '',
      password: '',
      isPasswordVisible: false
    },

    messages: {
      inputValue: '',
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
      privacyAndSecurity: {
        currentPassword: '',
        newPassword: '',
        repeatNewPassword: '',
        isPasswordVisible: false
      }
    },
  }
}
