import React from 'react';
import { browserHistory } from 'react-router';
import { lock, unlock } from 'tua-body-scroll-lock';

import api, { getAttachmentUrl } from './api';
import * as ActionHelpers from './actions/helpers';
import ThemeManager from './containers/themeManager';
import Header from './containers/header';
import Footer from './containers/footer';
import Popup from './containers/popup';
import Search from './containers/search';

// TODO: pass themes values to messages component and catch them in styles.js 

//// TODO: check how to refactor api CRUD records in actions/records

// TODO: why header and footer is visible in login page
// TODO: pass avatar to header
// TODO: if status isn't visible header shouldn't render it

// scss cases:
// display none for navbars in reg and login, no paddings for container login
// why registration page doesnt render

// active navbar-item footer has different highlight color according to theme
// ^ the same with message cloud


// TODO: container for footer (not show in login page. messages, registr)

// TODO: create container for themes
// TODO: profile save changes. fix data that render
// in inputs login and name after profile page initialize

// TODO: separate checkbox onchange (isStatusVisible and isPasswordVisible)
// TODO: get user data to render in header contactinfo and messages
// TODO: fix header title in chats while forwarding message

// TODO: lodash to all components and may be reducers

// !!! check if messages forward works
// TODO: !!!!! check if records actions work properly with third argument.
// may be this.props should be changed to this props records

// TODO: будет ли работать InputSearch если не импортить его прямо в компоненты
// TODO: privacyAndSecurity delete user
// TODO: updateCurrentUser in profile, privacy and security and so on.
// what arguments should i insert in this action?

// TODO: big handleChangeLogin in profile component.
// TODO: may be unite reducers for changeLoginInput with changeHelpMesage
// TODO: changeAvatar in redux ?
// TODO: scroll to found message and highlight it without classlist add (messages)

export default class App extends React.Component {
  componentDidUpdate = (prevProps, prevState) => {
    // const page = this.props.state.location.pathname;
    // const $content = this.getElement('.content');
    //
    // if (page.includes('messages')) {
    //   const chat = +page.split('/')[2];
    //   const chatMessages = this.props.state.records.messages.filter((m) => m.chat === chat);
    //   const prevChatMessages = prevState.messages.filter((m) => m.chat === chat);
    //
    //   if (chatMessages.length > prevChatMessages.length) {
    //     const list = document.querySelector('.messages ul');
    //     list.style['scroll-behavior'] = 'smooth';
    //     this.setScroll();
    //   }
    // }
  }

  componentDidMount = () => {
    var htmlElement = document.getElementsByTagName("html")[0];
    htmlElement.classList = this.props.state.theme;
    window.scrollTo(0,1);
    const content = this.getElement('.content');

    const page = this.props.state.location.pathname;
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

  getElement = (el) => {
    return document.querySelector(el)
  }

  setScroll = () => {
    // const $messages = document.querySelector("#app > div > div.container.messages > ul");
    $messages.scrollTop = $messages.scrollHeight;
  }

  handleWSOpen = async () => {
    console.log('WS: Open');

    const { currentUser } = this.props.state;
    if (currentUser) {
      const records = await ActionHelpers.getRecords(currentUser);
      this.props.init(records);
      const currentPage = this.props.state.location.pathname;

      if (currentPage === '/') {
        browserHistory.push('/chats');
      }
    }

    if (!currentUser) {
      browserHistory.push('/authentication');
    }
  }

  handleWSClose = async () => {
    console.log('WS: Close');

    if (this.props.currentUser) {
      await api('update_user', {
        id: currentUser.id,
        status: 'offline'
      });
    }
    setTimeout(() => {
      this.setWS();
    }, 1000);
  }

  handleWSMessage = async (e = {}) => {
    const { action, payload, response } = JSON.parse(e.data).payload;
    const { users, messages, currentUser, chats } = this.props.state;
    // console.log({ response, payload });
    if (currentUser.id !== response.user) {
      const user = users.find((u) => u.id === response.user);
      if (user) {
        this.props.updateRecords('users', {...user, status: 'online' }, this.props.state);
      }

      switch (action) {
        case 'create_message':
          const message = response.data.message;
          const currentPage = this.props.state.location.pathname;
          if (currentPage.includes('messages')) {
            const chat = currentPage.split('/')[2];
            api('read_messages', { id: chat });
            return this.props.createRecords('messages', { ...message, seen: true }, this.props.state);
          }
          return this.props.createRecords('messages', message, this.props.state)

        case 'delete_message':
          return this.props.deleteRecords('messages', payload, this.props.state);

        case 'update_message':
          return this.props.updateRecords('messages', response.data.message, this.props.state);

        case 'create_chat':
          return this.props.createRecords('chats', response.data.chat, this.props.state);

        case 'delete_chat':
          return this.props.deleteRecords('chats', payload, this.props.state);

        case 'typing':
          // return this.setState({ typing: { user: response.user, chat: payload.chat } });
      }
    }
  }

  handleWSError = (e) => {
    console.log('WS: Error', e);

    setTimeout(this.setWS, 10000);
  }

  renderContent = () => {
    return (
      React.Children.map(this.props.children, (child) => {
        if (this.props.state.currentUser) {
          return React.cloneElement(child, { app: this });
        }

        if (['/registration', '/authentication'].includes(this.props.state.location.pathname)) {
          return React.cloneElement(child, { app: this });
        }
      })
    )
  }

  render() {
    // console.log(this.props);

    return (
      <ThemeManager>
        <div className="chat">
          <Header />
          <Search />
          {this.renderContent()}
          <Popup />
          <Footer />
        </div>
      </ThemeManager>
    );
  }
};
