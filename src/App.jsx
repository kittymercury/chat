import React from 'react';
import { browserHistory } from 'react-router';
import { lock, unlock } from 'tua-body-scroll-lock';

import api, { getAttachmentUrl } from './api';
import * as ActionHelpers from './actions/helpers';
import Header from './containers/header';
import Footer from './components/footer';
import Popup from './containers/popup';
import Search from './containers/search';

// TODO: из-за того, что header рендерит контент исходя из pathname
// не получается скрыть его при открытии search (search открывается,
// но header не пропадает, а смещается)

// TODO: не получается достучаться до кнопок в dropdownSettings.
// 'log out' и 'edit profile' не делают того, что нужно:
// edit-profile не меняет state.pages.settings.isEditMode
// log-out не открывает попап


export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      typing: {},
      messageToForward: null,
      foundMessage: null,
      selectedMessages: [],

      theme: 'default',

      isSelectMode: false,
      isStatusVisible: true,
      isMsgMenuActive: false,
      isSearch: false,
    };
  }

  componentDidUpdate = (prevProps, prevState) => {
    const page = this.props.state.location.pathname;
    const $content = this.getElement('.content');

    if (page.includes('messages')) {
      const chat = +page.split('/')[2];
      const chatMessages = this.props.state.records.messages.filter((m) => m.chat === chat);
      const prevChatMessages = prevState.messages.filter((m) => m.chat === chat);

      if (chatMessages.length > prevChatMessages.length) {
        const list = document.querySelector('.messages ul');
        list.style['scroll-behavior'] = 'smooth';
        this.setScroll();
      }
    }

  }

  componentDidMount = () => {
    var htmlElement = document.getElementsByTagName("html")[0];
    htmlElement.classList = this.state.theme;
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

  getPage = () => {
    return window.location.pathname.slice(1);
  }

  setScroll = () => {
    const $messages = document.querySelector("#app > div > div.container.messages > ul");
    $messages.scrollTop = $messages.scrollHeight;
  }

  handleWSOpen = async () => {
    console.log('WS: Open');

    const { currentUser } = this.props.state;
    console.log({currentUser});


    if (currentUser) {
      const records = await ActionHelpers.getRecords(currentUser);
      this.props.init(records);
      console.log({currentUser});
      const currentPage = this.props.state.location.pathname;

      if (currentPage === '/') {
        browserHistory.push('/chats');
      }
    } else {
      browserHistory.push('/authentication');
    }
  }

  handleWSClose = async () => {
    console.log('WS: Close');

    const { currentUser } = this.props.state;

    if (currentUser) {
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
    console.log({ response, payload });
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
          return this.setState({ typing: { user: response.user, chat: payload.chat } });
      }
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
        record: this.props.state.currentUser.id,
      });
      const [ attachment ] = data;
      if (attachment) user.avatar = getAttachmentUrl(attachment.attributes);
    }

    const data = await api('update_user', {
      id: this.props.state.currentUser.id,
      ...user
    });

    if (data.error) {
      this.props.openPopup({
        message: data.error.description
      })
    }

    if (data.user) {
      this.props.updateCurrentUser(data.user);
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
