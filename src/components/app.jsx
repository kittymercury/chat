import React from 'react';
import { browserHistory } from 'react-router';
import { lock, unlock } from 'tua-body-scroll-lock';

import api, { getAttachmentUrl } from '../api';
import Header from '../containers/header';
import Footer from './footer';
import Popup from '../containers/popup';
import Search from '../containers/search';

// TODO:
// 1. privacyAndSecurity container. what kind of state in mapstatetoprops?
// 2. try bulma for chat
// 3. continue create redux for contacts (remove)
// 4. openSubmenu in settings

export default class App extends React.Component {
  constructor(props) {
    super(props);

    const user = localStorage.getItem('user');
    const currentUser = user ? JSON.parse(user) : null;
    const theme = JSON.parse(localStorage.getItem('theme'));

    this.state = {
      currentUser: currentUser,

      users: [],
      chats: [],
      messages: [],

      typing: {},
      messageToForward: null,
      foundMessage: null,
      selectedMessages: [],

      theme: theme,
      // popUp: null,

      isSelectMode: false,
      isStatusVisible: true,
      isMsgMenuActive: false,
      isSearch: false,
    };
  }

  componentDidUpdate = (prevProps, prevState) => {
    const page = this.getPage();
    const $content = this.getElement('.content');

    if (this.state.popUp) {
      const $popUp = this.getElement('.pop-up-wrapper');
      lock($popUp)
    } else {
      unlock($content)
    }

    if (page.includes('messages')) {
      const chat = +page.split('/')[1];
      const chatMessages = this.state.messages.filter((m) => m.chat === chat);
      const prevChatMessages = prevState.messages.filter((m) => m.chat === chat);

      if (chatMessages.length > prevChatMessages.length) {
        const list = document.querySelector('.messages ul');
        list.style['scroll-behavior'] = 'smooth';
        this.setScroll();
      }
    }

    localStorage.setItem('theme', JSON.stringify(this.state.theme));
  }

  componentDidMount = () => {
    var htmlElement = document.getElementsByTagName("html")[0];
    htmlElement.classList = this.state.theme;
    window.scrollTo(0,1);
    const content = this.getElement('.content');

    const page = this.getPage();
    if (page.includes('messages')) {
      const list = this.getElement('#messages-list');
      lock(list);
    }
    unlock(content);
    this.setWS();
  }

  setWS = () => {
    this.ws = new WebSocket(`wss://beatmeat.plasticine.ml/ws?channels[]=chat`);
    this.ws.onopen = this.handleWSOpen;
    this.ws.onclose = this.handleWSClose;
    this.ws.onerror = this.handleWSError;
    this.ws.onmessage = this.handleWSMessage;
  }

  init = async (user) => {
    const { users = [] } = await api('get_users', { id: user.id });
    console.log({users});
    user = users[0];
    if (!user) {
      return browserHistory.push('/authentication');
    };
    localStorage.setItem('user', JSON.stringify(user));
    const knownUsers = [ ...(user.contacts || []) ];

    const dataChats = await api('get_chats', user);
    dataChats.chats.forEach((c) => {
      c.participants.forEach((id) => {
        if (id === user.id) return;
        if (!knownUsers.includes(id)) {
          knownUsers.push(id)
        }
      })
    });
    const dataUsers = await api('get_users', { id: knownUsers });
    const currentUserChats = [];

    dataChats.chats.forEach((c) => {
      if (c.participants.includes(user.id)) {
        currentUserChats.push(c.id);
      }
    })

    const dataMessages = await api('get_messages', { id: currentUserChats } );

    this.setState({
      users: dataUsers.users,
      chats: dataChats.chats,
      messages: dataMessages.messages,
    });
  }

  getElement = (el) => {
    return document.querySelector(el)
  }

  getPage = () => {
    return window.location.pathname.slice(1);
  }

  setScroll = () => {
    const $messages = document.querySelector("#app > div > div.content.messages > ul");
    $messages.scrollTop = $messages.scrollHeight;
  }

  handleWSOpen = async () => {
    console.log('WS: Open');

    const currentPage = this.getPage();
    const { currentUser, users } = this.state;

    if (currentUser) {
      await this.init(currentUser);
      console.log({currentUser});

      if (!currentPage) {
        browserHistory.push('/chats');
      }
    } else {
      browserHistory.push('/authentication');
    }
  }

  handleWSClose = async () => {
    console.log('WS: Close');

    const { currentUser } = this.state;

    if (currentUser) {
      await api('update_user', {
        id: currentUser.id,
        status: 'offline'
      });
      const users = this.state.users.map((user) => {
        return { ...user, status: 'offline' }
      })
      this.setState({ users })
    }
    setTimeout(() => {
      this.setWS();
    }, 1000);
  }

  handleWSMessage = async (e = {}) => {
    const { action, payload, response } = JSON.parse(e.data).payload;
    const { users, messages, currentUser, chats } = this.state;
    console.log({ response, payload });
    if (currentUser.id !== response.user) {
      const user = users.find((u) => u.id === response.user);
      if (user) {
        this.updateUsers({ ...user, status: 'online' })
      }

      switch (action) {
        case 'create_message':
          const message = response.data.message;
          const currentPage = this.getPage();
          if (currentPage.includes('messages')) {
            const chat = currentPage.split('/')[1];
            api('read_messages', { id: chat });
            return this.setState({ messages: messages.concat({ ...message, seen: true }) })
          }
          return this.setState({ messages: messages.concat(message) });

        case 'delete_message':
          return this.setState({ messages: messages.filter((m) => m.id !== payload.id) });

        case 'update_message':
          return this.updateMessages(response.data.message);

        case 'create_chat':
          return this.setState({ chats: chats.concat(response.data.chat)});

        case 'delete_chat':
          return this.setState({ chats: chats.filter((c) => c.id !== payload.id) });

        case 'typing':
          return this.setState({ typing: { user: response.user, chat: payload.chat } });
      }
    }
  }

  updateMessages = (message) => {
    const messages = this.state.messages.map((m) => {
      if (m.id === message.id) {
        return message;
      } else {
        return m;
      }
    });

    this.setState({ messages });
  }


  updateUsers = (user) => {
    const users = this.state.users.map((u) => {
      if (u.id === user.id) {
        return user;
      } else {
        return u;
      }
    });

    this.setState({ users });
  }

  login = async ({ password, login }) => {
    const data = await api('login', { password, login });

    if (data.error) {
      this.handleOpenPopUp({
        message: data.error.description,
      });
    }

    if (data.user) {
      await this.init(data.user);

      this.setState({
        currentUser: data.user,
      });

      localStorage.setItem('user', JSON.stringify(data.user));
      browserHistory.push('/chats');
    }
  }

  handleWSError = (e) => {
    console.log('WS: Error', e);

    setTimeout(this.setWS, 10000);
  }

  handleSubmitUser = async (user) => {
    if (typeof user.avatar === 'object') {
      const { data = [] } = await api('upload_attachment', {
        file: user.avatar,
        name: 'avatar.jpeg',
        model: 'tgc_user',
        record: this.state.currentUser.id,
      });
      const [ attachment ] = data;
      if (attachment) user.avatar = getAttachmentUrl(attachment.attributes);
    }

    const data = await api('update_user', {
      id: this.state.currentUser.id,
      ...user
    });

    if (data.error) {
      this.handleOpenPopUp({
        message: data.error.description
      })
    }

    if (data.user) {
      const newCurrentUser = { ...this.state.currentUser, ...data.user };

      this.setState({ currentUser: newCurrentUser });
      localStorage.setItem('user', JSON.stringify(newCurrentUser));
    }
  }

  // --------------------------------

  renderHeader = () => {
    return (
      <Header app={this} />
    )
  }

  renderFooter = () => {
    return <Footer app={this} />
  }

  renderContent = () => {
    return (
      React.Children.map(this.props.children, (child) => {
        if (this.state.currentUser) {
          return React.cloneElement(child, { app: this });
        }

        if (['registration', 'authentication'].includes(this.getPage())) {
          return React.cloneElement(child, { app: this });
        }
      })
    )
  }

  // renderPopUp = () => {
  //   const { popUp } = this.state;
  //
  //   if (popUp) {
  //     return (
  //       <PopUp
  //         message={popUp.message}
  //         type={popUp.type}
  //         onClose={popUp.onClose || this.handleClosePopUp}
  //         onConfirm={popUp.onConfirm}
  //       />
  //     )
  //   }
  // }

  render() {
    return (
      <div className="chat">
        {this.renderHeader()}
        <Search />
        {this.renderContent()}
        {this.renderFooter()}

        <Popup />
      </div>
    );
  }
};
