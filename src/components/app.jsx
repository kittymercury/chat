import React from 'react';
import { browserHistory } from 'react-router';

import api from './api';

import Header from './header';
import Footer from './footer';
import PopUp from './pop-up';

import cornersImg from './tg-imgs/corners.jpeg';
import jesseImg from './tg-imgs/jesse.jpg';
import walterImg from './tg-imgs/walter.jpeg';
import freddieImg from './tg-imgs/freddie.jpeg';

// TODO:
// 1. make edit like in telegram
// 2. search in among all users and add to contacts
// 3. delete from contact list
// 4. theme to localStorage
// 5. scss for chats
// 6. form in auth
// 7. styles for input search
// 8. js for pop-up
// 9. flex 0.9 improve css for chats

export default class App extends React.Component {
  constructor(props) {
    super(props);

    const user = localStorage.getItem('user');
    const currentUser = user ? JSON.parse(user) : null;
    const currentPage = window.location.pathname;

    this.state = {
      currentUser: currentUser,
      currentPage: currentPage,

      theme: 'dark',

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
    const currentPage = window.location.pathname;

    if (['/authentication', '/registration'].includes(currentPage)) {
      return;
    }

    if (!this.state.currentUser) {
      return browserHistory.push('/authentication');
    }

    const dataUsers = await api('get_users');
    const dataChats = await api('get_chats', this.state.currentUser);

    this.setState({ users: dataUsers.users, chats: dataChats.chats });
  }

  // --------------------------------

  handleSubmitUser = (user) => {
    const newCurrentUser = { ...this.state.currentUser, ...user };

    this.setState({ currentUser: newCurrentUser });
    localStorage.setItem('user', JSON.stringify(newCurrentUser));
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
        return React.cloneElement(child, { app: this });
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
