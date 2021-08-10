import React from 'react';
import lodash from 'lodash';

import api from './api';

import Authentication from './authentication';
import Registration from './registration';
import Header from './header';
import Footer from './footer';
import Contacts from './contacts';
import ContactInfo from './contact-info';
import Chats from './chats';
import Messages from './messages';
import Settings from './settings';
import SettingsThemes from './settings-themes';
import SettingsEdit from './settings-edit';
import PrivacyAndSecurity from './privacy-and-security';
import PopUp from './pop-up';

import cornersImg from './tg-imgs/corners.jpeg';
import jesseImg from './tg-imgs/jesse.jpg';
import walterImg from './tg-imgs/walter.jpeg';
import freddieImg from './tg-imgs/freddie.jpeg';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
    const currentPage = currentUser.id ? 'Contacts' : 'Authentication';

    this.state = {
      currentUser: currentUser.id,
      currentPage: 'Registration',
      currentChat: '',
      userProfile: '',
      theme: 'aqua',

      isStatusVisible: true,
      isEditMessages: false,
      isSearch: false,
      popUp: null,
      messageToForward: null,
      foundMessage: null,

      // users: [
      //   { id: 1, name: 'Cut Corners', status: 'online', avatar: 'corners.jpeg', login: 'cutcorners', password: '1' },
      //   { id: 2, name: 'Jesse Pinkman', status: 'online', avatar: 'jesse.jpg', login: 'mrdriscoll' },
      //   { id: 3, name: 'Walter White', status: 'offline' ,avatar: 'walter.jpeg', login: 'thedanger' },
      //   { id: 6, name: 'Olga Tkachuk', status: 'offline', avatar: '', login: 'cherry' },
      //   { id: 7, name: 'Mercury', status: 'online', avatar: 'freddie.jpeg', login: 'mercury', password: '2' },
      // ],
      // chats: [
      //   { id: 1, participants: [ 7, 1 ] },
      //   { id: 2, participants: [ 7, 6 ] },
      //   { id: 3, participants: [ 7, 3 ] },
      //   { id: 4, participants: [ 1, 3 ] },
      // ],
      // messages: [
      //   { id: 1, userId: 1, chatId: 1, time: +new Date('2020', '7', '25', '1', '1'), content: 'I love you <3', edited: '' },
      //   { id: 2, userId: 7, chatId: 1, time: +new Date('2020', '6', '25', '1', '2'), content: 'I love you too <3', edited: '' },
      //   { id: 3, userId: 6, chatId: 2, time: +new Date('2020', '7', '25', '1', '3'), content: 'Віта, в тебе є черешні?', edited: '' },
      //   { id: 4, userId: 7, chatId: 2, time: +new Date('2020', '7', '25', '1', '4'), content: 'нажаль уже немає', edited: '' },
      //   { id: 5, userId: 3, chatId: 3, time: +new Date('2020', '7', '25', '1', '5'), content: 'I know that you are the one who knocks and always make', edited: '' },
      //   { id: 6, userId: 7, chatId: 3, time: +new Date('2020', '7', '25', '1', '6'), content: 'You are goddamn right', edited: '' },
      //   { id: 7, userId: 7, chatId: 3, time: +new Date('2020', '7', '25', '1', '7'), content: 'You', edited: '' },
      //   { id: 8, userId: 7, chatId: 3, time: +new Date('2020', '7', '25', '1', '8'), content: 'are', edited: '' },
      //   { id: 9, userId: 7, chatId: 3, time: +new Date('2020', '7', '25', '1', '9'), content: 'goddamn', edited: '' },
      //   { id: 10, userId: 7, chatId: 3, time: +new Date('2020', '7', '25', '1', '10'), content: 'right', edited: '' },
      //   { id: 11, userId: 7, chatId: 3, time: +new Date('2020', '7', '25', '1', '11'), content: 'wooooow', edited: '' },
      //   { id: 12, userId: 7, chatId: 3, time: +new Date('2020', '7', '25', '1', '12'), content: 'w a a aw', edited: '' },
      //   { id: 13, userId: 7, chatId: 3, time: +new Date('2020', '7', '25', '1', '13'), content: 'We already know that emojis are these tiny colorful icons. While this may give you the impression that they are images in the traditional sense, they aren\'t. They are more like the letters, numbers, punctuation marks, and weird symbols that we tend to bucket as text', edited: '' },
      //   {id: 14, userId: 1, chatId: 4, time: +new Date('2020', '7', '25', '1', '14'), content: 'lol', edited: '' },
      //   {id: 15, userId: 3, chatId: 4, time: +new Date('2020', '7', '25', '1', '15'), content: 'lol lol', edited: '' },
      // ]

      users: [],
      chats: [],
      messages: [],
    };
  }

  componentDidMount = async () => {
    if (['Authentication', 'Registration'].includes(this.state.currentPage)) return;

    const data = await api('get_users');
    this.setState({ users: data.users });
  }

  changePage = (page) => {
    this.setState({ currentPage: page, isSearch: false });
  }

  changeState = (state) => {
    this.setState(state);
  }

  clickBack = () => {
    const { currentPage } = this.state;

    switch (currentPage) {
      case 'Privacy and security':
      case 'Edit profile':
      case 'Themes':
        this.changePage('Settings');
        break;
      case 'Contact info':
        this.changePage('Contacts');
        break;
      case 'Registration':
        this.changePage('Authentication');
        break;
    }
  }

  // handlers for Header

  handleClickEditMessages = (condition) => {
    this.setState({ isEditMessages: condition });
  }

  handleClickSearch = (condition) => {
    this.setState({ isSearch: condition });
  }

  handleCancelForwarding = () => {
    this.setState({ messageToForward: null });
  }

  // ---------------------------------------

  // handlers for Contacts

  handleClickContact = (user) => {
    const { currentChat, chats, users, currentUser } = this.state;

    const isChatExist = chats.find((chat) => {
      if (chat.participants.includes(user.id) && chat.participants.includes(currentUser)) {
        return true;
      } else {
        return false;
      }
    })

    if (isChatExist) return;

    const newChat = {
      id: +new Date(),
      name: user.name,
      participants: [ currentUser, user.id ]
    }
    const newChats = chats.concat(newChat);

    this.changePage('Messages');
    this.setState({ currentChat: newChat, chats: newChats });
  }

  handleClickOpenContactInfo = (user) => {
    this.changePage('Contact info');
    this.setState({ userProfile: user });
  }

  // -----------------------------------------

  // handlers for Chats

  handleClickChat = (chat) => {
    const { messageToForward, messages, isEditMessages } = this.state;

    this.setState({ currentChat: chat });

    if (messageToForward) {
      const message = {
        id: +new Date(),
        userId: this.state.currentUser,
        chatId: chat.id,
        time: +new Date(),
        forward: messageToForward
      };
      const newMessages = messages.concat(message);
      this.setState({ messages: newMessages, messageToForward: null, isEditMessages: false });
      this.changePage('Messages');
    } else {
      this.changePage('Messages');
    }
  }

  handleClickDeleteChat = (chat) => {
    const { chats } = this.state;
    const filteredChats = chats.filter((c) => c !== chat);

    this.setState({ chats: filteredChats });
  }


  // ----------------------------------------------------


  //  Themes

  handleClickTheme = (theme) => {
    this.setState({ theme });
  }

  // Authentication

  // handleClickLogIn = (state) => {
  //   const { users } = this.state;
  //
  //   const currentUser = users.find((user) => {
  //     if ((user.login === state.login) && (user.password === state.password)) {
  //       return true;
  //     } else {
  //       return false;
  //     }
  //   });
  //   if (currentUser) {
  //     this.changePage('Chats');
  //     this.setState({
  //       currentUser: currentUser.id,
  //     });
  //   } else {
  //     this.handleOpenPopUp({
  //       message: 'No users with such data!'
  //     });
  //     this.setState({ currentPage: 'Authentication' });
  //   }
  // }

  handleClickLogIn = async (state) => {
    const data = await api('login', {
      password: state.password,
      login: state.login
    });

    if (data.error) {
      this.handleOpenPopUp({
        message: data.error.description,
      });
    }

    if (data.user) {
      const usersData = await api('get_users');

      this.changePage('Chats');
      this.setState({
        users: usersData.users,
        currentUser: data.user.id,
      });

      localStorage.setItem('user', JSON.stringify(data.user));
    }
  }

  // -----------------------------------

  // Registration

  handleSubmitUser = (user) => {
    const { currentUser, users } = this.state;

    const newUsers = users.map((u) => {
      if (u.id === currentUser) {
        return { ...u, ...user };
      } else {
        return u;
      }
    });

    this.setState({ users: newUsers });
  }

  handleClickSignUp = async (state) => {
    const { users } = this.state;
    const data = await api('sign_up', {
      name: state.name,
      login: state.login,
      password: state.password
    });

    if (data.user) {
      const usersData = await api('get_users');

      this.changePage('Chats');
      this.setState({ currentUser: data.user.id, users: usersData.users });
      localStorage.setItem('user', JSON.stringify(data.user));
    }

    if (data.error) {
      this.handleOpenPopUp({
        message: data.error.description
      });
    }


    // const isName = newUser.name && newUser.name.trim();
    // const isLogin = newUser.login && newUser.login.trim();
    // const isPassword = newUser.password && newUser.password.trim();
    // const isLoginExist = users.find((user) => user.login === state.login);
    // const isLoginShort = newUser.login.length < 3;
    //
    // if (isName && isLogin && isPassword) {
    //   if (!isLoginExist) {
    //     if (!isLoginShort) {
    //       const newUsers = users.concat(newUser);
    //
    //       this.changePage('Chats');
    //       this.setState({ currentUser: newUser.id, users: newUsers });
    //     } else {
    //       this.handleOpenPopUp({
    //         message: 'Login cannot be shorter than 4 symbols!'
    //       });
    //     }
    //   } else {
    //     this.handleOpenPopUp({
    //       message: 'Oops, this name is already taken'
    //     });
    //   }
    // } else {
    //   this.handleOpenPopUp({
    //     message: 'Inputs with * cannot be empty!'
    //   });
    // }
  }

  // -------------------------------------------------------

  // Contact Info

  handleClickOpenChat = () => {
    const { chats, userProfile } = this.state;
    console.log({chats});
    const chat = chats.find((chat) => chat.participants.includes(userProfile.id));

    if (chat) {
      this.setState({ currentChat: chat });
      this.changePage('Messages');
    } else {
      const { currentUser } = this.state;
      const newChat = {
        id: +new Date(),
        name: userProfile.name,
        participants: [ currentUser, userProfile.id ]
      }

      const newChats = chats.concat(newChat);
      this.setState({ currentChat: newChat, chats: newChats });
      this.changePage('Messages');
    }
  };

  // Privacy and security

  handleChangeInputCheckbox = (condition) => {
    this.setState({ isStatusVisible: condition });
  }

  handleConfirmDeleteAccount = () => {
    const { users, currentUser } = this.state;
    const newUsers = users.filter((user) => user.id !== currentUser);
    this.changePage('Authentication');
    this.setState({ users: newUsers, currentUser: '' });
  }

  // -------------------------------------

  // Pop-up

  handleClickClosePopup = () => {
    this.setState({ isPopUpVisible: false });
  }

  handleOpenPopUp = (popUp) => {
    this.setState({ popUp });
  }

  handleClosePopUp = () => {
    this.setState({ popUp: null });
  }

  // ----------------------------

  // Settings (sign out)

  handleClickSignOut = () => {
    this.handleOpenPopUp({
      message: 'Do you want to sign out?',
      onConfirm: this.handleClickConfirmSignOut,
      onClose: this.handleClosePopUp
    });
  }

  handleClickConfirmSignOut = () => {
    localStorage.removeItem('user');
    this.changePage('Authentication');
    this.setState({ currentUser: null });
  }

  // --------------------------------

  renderHeader = () => {
    const {
      currentUser,
      currentPage,
      currentChat,
      isEditMessages,
      isSearch,
      messageToForward,
      users,
      chats,
    } = this.state;

    return (
      <Header
        currentPage={currentPage}
        onClickCreateChat={() => this.changePage('Contacts')}
        onClickEditMessages={this.handleClickEditMessages}
        onClickSearch={this.handleClickSearch}
        onClickSignOut={this.handleClickSignOut}
        onClickButtonBack={this.clickBack}
        isEditMessages={isEditMessages}
        isSearch={isSearch}
        users={users}
        currentChat={currentChat}
        chats={chats}
        currentUser={currentUser}
        messageToForward={messageToForward}
        onClickCancelForwarding={this.handleCancelForwarding}
      />
    )
  }

  renderPopUp = () => {
    const { popUp } = this.state;

    if (popUp) {
      return (
        <PopUp
          message={popUp.message}
          type={popUp.type}
          onClose={popUp.onClose || this.handleClosePopUp}
          onConfirm={popUp.onConfirm}
        />
      )
    }
  }

  renderFooter = () => {
    const { currentPage } = this.state;

    if (![ 'Authentication', 'Registration' ].includes(currentPage)) {
      return <Footer onButtonClick={(page) => this.changePage(page)} />
    }
  }

  render() {
    const {
      currentUser,
      currentPage,
      currentChat,
      userProfile,
      theme,
      isEditMessages,
      isSearch,
      isStatusVisible,
      popUp,
      messageToForward,
      users,
      chats,
      messages,
      foundMessage
    } = this.state;

    const user = users.find((user) => user.id === currentUser);

    return (
      <div className={`chat theme ${theme}`}>
        {/* {this.renderHeader()} */}
        {this.renderPopUp()}

        {React.Children.map(this.props.children, (child) => {
          return React.cloneElement(child, {
            // Authentication
            onClickLogIn: this.handleClickLogIn,
            // Registration
            onClickSignUp: this.handleClickSignUp,
            // Contact
            onClickUserName: this.handleClickContact,
            onClickAvatar: this.handleClickOpenContactInfo,
            users: users,
            isStatusVisible: isStatusVisible,
            currentUser: currentUser,
            // ...
          });
        })}

        {/* {(currentPage === 'Contacts') && (
          <Contacts
            onClickUserName={this.handleClickContact}
            onClickAvatar={this.handleClickOpenContactInfo}
            users={users}
            isStatusVisible={isStatusVisible}
            currentUser={currentUser}
          />
        )}

        {(currentPage === 'Contact info') && (
          <ContactInfo
            user={userProfile}
            onClickOpenChat={this.handleClickOpenChat}
            isStatusVisible={isStatusVisible}
          />
        )}

        {(currentPage === 'Chats') && (
          <Chats
            currentUser={currentUser}
            currentChat={currentChat}
            onClick={this.handleClickChat}
            onDelete={this.handleClickDeleteChat}
            isSearch={isSearch}
            isStatusVisible={isStatusVisible}
            users={users}
            chats={chats}
            messages={lodash.sortBy(messages, ['time'])}
            changeState={this.changeState}
            changePage={() => this.changePage('Messages')}
          />
        )}

        {(currentPage === 'Settings') && (
          <Settings
            user={user}
            isStatusVisible={isStatusVisible}
            onClickEditProfile={() => this.changePage('Edit profile')}
            onClickThemes={() => this.changePage('Themes')}
            onClickPrivacyAndSecurity={() => this.changePage('Privacy and security')}
          />
        )}

        {(currentPage === 'Messages') && (
          <Messages
            users={users}
            messages={messages}
            currentChat={currentChat}
            currentUser={currentUser}
            isEditMessages={isEditMessages}
            isSearch={isSearch}
            isStatusVisible={isStatusVisible}
            changePage={this.changePage}
            changeState={this.changeState}
            foundMessage={foundMessage}
          />
        )}

        {(currentPage === 'Themes') && (
          <SettingsThemes onClick={this.handleClickTheme} />
        )}

        {(currentPage === 'Edit profile') && (
          <SettingsEdit
            user={user}
            onSubmitUser={this.handleSubmitUser}
          />
        )}

        {(currentPage === 'Privacy and security') && (
          <PrivacyAndSecurity
            onClickSubmit={() => this.changePage('Settings')}
            onChangeStatus={this.handleChangeInputCheckbox}
            isStatusVisible={isStatusVisible}
            onSubmitUser={this.handleSubmitUser}
            onOpenPopUp={this.handleOpenPopUp}
            user={user}
            users={users}
            onConfirmDeleteAccount={this.handleConfirmDeleteAccount}
          />
        )} */}

        {/* {this.renderFooter()} */}
    </div>
    );
  }
};
