import React from 'react';
import { browserHistory } from 'react-router';

import api from './api';
import Header from './header';
import Footer from './footer';
import PopUp from './pop-up';

// import cornersImg from './tg-imgs/corners.jpeg';
// import jesseImg from './tg-imgs/jesse.jpg';
// import walterImg from './tg-imgs/walter.jpeg';
// import freddieImg from './tg-imgs/freddie.jpeg';

// TODO:
// 2. search among all users and add to contacts +
// 4. theme to localStorage +
// 13. click on contact with existed chat +
// 3. delete from contact list +
// 14. delete user from contacts +
// 13. preview of last message +
// 16. not showing messages from another user +
// 17. do not load messages because of participants +
// 16. sort chats by message time +
// 19. message reply deleted +
// 20. if chat is empty +
// 21. cancel editing in settings +
// 11. make it possible to load avatar
// 12. autoscroll in messages
// 15. show real status of user
// 18. click on name in Messages
// 19. click on forwarded message

export default class App extends React.Component {
  constructor(props) {
    super(props);

    const user = localStorage.getItem('user');
    const currentUser = user ? JSON.parse(user) : null;
    const theme = JSON.parse(localStorage.getItem('theme'));

    this.state = {
      currentUser: currentUser,

      theme: theme,

      isStatusVisible: true,
      isEditMessages: false,
      isSearch: false,
      popUp: null,
      messageToForward: null,
      foundMessage: null,

      // users: [
      //   { id: 1, name: 'Cut Corners', status: 'online', avatar: 'corners.jpeg', login: 'cutcorners', password: '1' },
      //   { id: 7, name: 'Mercury', status: 'online', avatar: 'freddie.jpeg', login: 'mercury', password: '2' },
      // ],
      // chats: [
      //   { id: 1, participants: [ 7, 1 ] },
      // ],
      // messages: [
      //   { id: 1, user: 1, chat: 1, created_at: +new Date('2020', '7', '25', '1', '1'), content: 'I love you <3' },
      //   { id: 2, user: 7, chat: 1, created_at: +new Date('2020', '6', '25', '1', '2'), content: 'I love you too <3' },

      users: [],
      chats: [],
      messages: [],
    };
  }

  componentDidUpdate = () => {
    localStorage.setItem('theme', JSON.stringify(this.state.theme));
  }

  componentDidMount = async () => {
    const currentPage = this.getPage();
    const { currentUser } = this.state;

    if (currentUser) {
      const knownUsers = [ ...(currentUser.contacts || []) ];
      const dataChats = await api('get_chats', this.state.currentUser);
      dataChats.chats.forEach((c) => {
        c.participants.forEach((id) => {
          if (id === currentUser.id) return;
          if (knownUsers.includes(id)) return;
          if (!knownUsers.includes(id)) {
            knownUsers.push(id)
          }
        })
      });

      const dataUsers = await api('get_users', { id: knownUsers });
      const currentUserChats = [];

      dataChats.chats.forEach((c) => {
        if (c.participants.includes(currentUser.id)) {
          currentUserChats.push(c.id);
        }
      })

      const dataMessages = await api('get_messages', { id: currentUserChats } );

      this.setState({
        users: dataUsers.users,
        chats: dataChats.chats,
        messages: dataMessages.messages,
      });

      if (!currentPage) {
        browserHistory.push('/chats');
      }
    } else {
      browserHistory.push('/authentication');
    }
  }

  getPage = () => {
    return window.location.pathname.slice(1);
  }

  handleSubmitUser = async (user) => {
    const data = await api('update_user', { id: this.state.currentUser.id, ...user });

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

  handleOpenPopUp = (popUp) => {
    this.setState({ popUp });
  }

  handleClosePopUp = () => {
    this.setState({ popUp: null });
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

  render() {
    return (
      <div className={`chat theme ${this.state.theme}`}>
        {this.renderHeader()}
        {this.renderContent()}
        {this.renderFooter()}

        {this.renderPopUp()}
      </div>
    );
  }
};
