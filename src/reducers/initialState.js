export default {
  currentUser: '',

  settings: {
    theme: 'dark',
    selectedMessages: [],
    isSelectMode: false,
    isStatusVisible: true,
  },

  records: {
    chats: [],
    users: [],
    messages: [],

    themes: [
      {
        name: 'dark',
        mainBackground: '#1e1f25', // --content-bg
        mainTextColor: 'white',
        footerIconColor: '#a0a0a0',
        activeFooterIconColor: '#00d1b2',
        inputTextColor: 'black', // differs according to page
        inputBackground: 'white', // the same as ^
        iconInputColor: 'gray', // not really :) check it locally
        inputReplyBackground: '#111218', // the same as ^
        wrapperBackground: '#0000003d',
        listItemBackground: '#0000003d',
        myMessageBackground: '#383942', // check it out in messages/styles.scss
        otherMessageBackground: '#292a32',
        navbarDropdownMenuBackground: '#252730',
        navbarDropdownMenuBoxShadow: '-4px 2px 10px #08090c',
        navbarDropdownItemBoxShadow: '0px 1px 4px rgba(0, 0, 0, 0.46)',
        // navbarDropdownItemBoxShadow: '0px 1px 4px #00000075',
        buttonsBottomSelectedMessages: '#0c0d13', // footer, sendMessage etc.
        dropdownTriggerSettings: '#0000003d',
        activeDropdownTriggerSettings: '#004a3f',
        onlineCircleColor: '#6cad6c',
        offlineCircleColor: ' #ce5e5e',
        grayTextColor: '#808080',
        messageOptionsBackground: '#2a2c3e',
        modalMainBackground: '#2d2d36',
        modalMainButtonBackground: '#00d1b2',
        modalMainFooterBorderTop: '1px solid #595966',
        containerMessagesBackground: '#141519',
        inputButtonBackground: '#00c4a7',
        buttonBackground: '#18917f',
      },
      {
        name: 'purple',
        mainBackground: '#331b3d', // --content-bg
        mainTextColor: 'white',
        footerIconColor: '#8b6d89',
        activeFooterIconColor: '#44af46',
        inputTextColor: 'black', // differs according to page
        inputBackground: 'white', // the same as ^
        iconInputColor: 'gray', // not really :) check it locally
        inputReplyBackground: '#111218',
        wrapperBackground: '#180918',
        listItemBackground: '#632b4c',
        myMessageBackground: '#5a3668', // check it out in messages/styles.scss
        otherMessageBackground: '#653776',
        navbarDropdownMenuBackground: '#502d5e',
        navbarDropdownMenuBoxShadow: '-1px 1px 5px 0px #4c3535',
        navbarDropdownItemBoxShadow: '0px 1px 4px #4c3535',
        dropdownTriggerSettings: '#180918',
        activeDropdownTriggerSettings: '#521f67',
        onlineCircleColor: 'green',
        offlineCircleColor: 'red',
        buttonsBottomSelectedMessages: 'purple', // choose new
        grayTextColor: '#d5d5d5',
        messageOptionsBackground: '#2a2c3e',
        modalMainBackground: '#2d2d36',
        modalMainButtonBackground: '#00d1b2',
        modalMainFooterBorderTop: '1px solid #595966',
        containerMessagesBackground: '#141519',
        inputButtonBackground: '#f23333',
      },
      {
        name: 'light',
        mainBackground: '#b9b398', // --content-bg
        mainTextColor: 'black',
        footerIconColor: 'white',
        activeFooterIconColor: '#877739',
        inputTextColor: 'black', // differs according to page
        inputBackground: 'white', // the same as ^
        iconInputColor: 'gray', // not really :) check it locally
        inputReplyBackground: '#111218',
        wrapperBackground: '#9b957c',
        listItemBackground: '#e2e2e2',
        myMessageBackground: '#a59b71', // check it out in messages/styles.scss
        otherMessageBackground: '#a59f86',
        navbarDropdownMenuBackground: '#968d64',
        navbarDropdownMenuBoxShadow: '-1px 1px 5px 0px #7e713b',
        navbarDropdownItemBoxShadow: '0px 1px 4px #74693b',
        dropdownTriggerSettings: '#9b957c',
        activeDropdownTriggerSettings: '#91844a',
        onlineCircleColor: '#87dd95',
        offlineCircleColor: '#d79b9b',
        buttonsBottomSelectedMessages: 'purple', // choose new
        grayTextColor: '#4a3d3d',
        messageOptionsBackground: '#a59f86',
        modalMainBackground: '#2d2d36',
        modalMainButtonBackground: '#00d1b2',
        modalMainFooterBorderTop: '1px solid #595966',
        containerMessagesBackground: '#141519',
        inputButtonBackground: '#f23333',
      },
    ],
  },

  location: {},

  foundMessage: null,
  typing: {},

  popup: {
    visible: false,
    message: '',
    type: '',
  },

  search: {
    visible: false,
    value: ''
  },

  header: {
    title: '',
    subtitle: '',
    visible: true,
    buttons: {
      left: [],
      right: []
    },
    avatar: null,
    isForwardMode: false
  },

  footer: {
    visible: true,
  },

  pages: {
    chats: {},

    contacts: {
      foundUser: null,
    },

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
