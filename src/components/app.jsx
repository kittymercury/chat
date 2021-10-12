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
// 2. search among all users and add to contacts
// 3. delete from contact list
// 4. theme to localStorage
// 11. make it possible to load avatar
// 12. autoscroll in messages
// 13. click on contact with existed chat

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
      //   { id: 1, user: 1, chat: 1, created_at: +new Date('2020', '7', '25', '1', '1'), content: 'I love you <3' },
      //   { id: 2, user: 7, chat: 1, created_at: +new Date('2020', '6', '25', '1', '2'), content: 'I love you too <3' },
      //   { id: 3, user: 6, chat: 2, created_at: +new Date('2020', '7', '25', '1', '3'), content: 'Віта, в тебе є черешні?' },
      //   { id: 4, user: 7, chat: 2, created_at: +new Date('2020', '7', '25', '1', '4'), content: 'нажаль уже немає' },
      //   { id: 5, user: 3, chat: 3, created_at: +new Date('2020', '7', '25', '1', '5'), content: 'I know that you are the one who knocks and always make' },
      //   { id: 6, user: 7, chat: 3, created_at: +new Date('2020', '7', '25', '1', '6'), content: 'You are goddamn right' },
      //   { id: 7, user: 7, chat: 3, created_at: +new Date('2020', '7', '25', '1', '7'), content: 'You' },
      //   { id: 8, user: 7, chat: 3, created_at: +new Date('2020', '7', '25', '1', '8'), content: 'are' },
      //   { id: 9, user: 7, chat: 3, created_at: +new Date('2020', '7', '25', '1', '9'), content: 'goddamn' },
      //   { id: 10, user: 7, chat: 3, created_at: +new Date('2020', '7', '25', '1', '10'), content: 'right' },
      //   { id: 11, user: 7, chat: 3, created_at: +new Date('2020', '7', '25', '1', '11'), content: 'wooooow' },
      //   { id: 12, user: 7, chat: 3, created_at: +new Date('2020', '7', '25', '1', '12'), content: 'w a a aw' },
      //   { id: 13, user: 7, chat: 3, created_at: +new Date('2020', '7', '25', '1', '13'), content: 'We already know that emojis are these tiny colorful icons. While this may give you the impression that they are images in the traditional sense, they aren\'t. They are more like the letters, numbers, punctuation marks, and weird symbols that we tend to bucket as text' },
      //   {id: 14, user: 1, chat: 4, created_at: +new Date('2020', '7', '25', '1', '14'), content: 'lol' },
      //   {id: 15, user: 3, chat: 4, created_at: +new Date('2020', '7', '25', '1', '15'), content: 'lol lol' },
      // ]

      users: [],
      chats: [],
      messages: [],
    };
  }

  componentDidMount = async () => {
    const currentPage = window.location.pathname.slice(1);
    console.log(this.state.users);

    if (this.state.currentUser) {
      const dataUsers = await api('get_users', { id: this.state.currentUser.contacts || [] });
      const dataChats = await api('get_chats', this.state.currentUser);
      const dataMessages = await api('get_messages', this.state.currentUser);

      this.setState({
        users: dataUsers.users,
        chats: dataChats.chats,
        messages: dataMessages.messages
      });

      if (!currentPage) {
        browserHistory.push('/chats');
      }
    } else {
      if (!currentPage) {
        browserHistory.push('/authentication');
      }
    }
  }

  // --------------------------------

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
