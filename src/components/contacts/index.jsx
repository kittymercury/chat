import React from 'react';
import { browserHistory } from 'react-router';

import api from '../api';
import { getImg } from '../helpers';
import InputSearch from '../common/input-search';
import './styles.scss';

export default class Contacts extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      users: []
    }
  }

  handleChangeInputSearch = async (value) => {
    const data = await api('get_users', { login: value });

    if (data.error) {
      this.props.app.handleOpenPopUp({
        message: data.error.description,
      });
    }

    if (data.users) {
      this.setState({ users: data.users });
    }
  }

  handleClickOpenContactInfo = (user) => {
    this.props.app.setState({ isSearch: false })
    browserHistory.push(`/contact-info/${user.id}`);
  }

  handleClickContact = async (user) => {
    const { chats, users, currentUser, isSearch } = this.props.app.state;

    if (isSearch) {
      this.props.app.setState({ isSearch: false })
      return browserHistory.push(`/contact-info/${user.id}`)
    }

    const isChatExist = chats.find((chat) => {
      if (chat.participants.includes(user.id) && chat.participants.includes(currentUser.id)) {
        return true;
      } else {
        return false;
      }
    })

    // if (isChatExist) return;
    if (isChatExist) {
      const chatId = chats.find((chat) => (chat.participants.includes(user.id) && chat.participants.includes(currentUser.id))).id;

      return browserHistory.push(`/messages/${chatId}`);
    }

    if (!isChatExist) {
      const newChat = {
        participants: [ currentUser.id, user.id ]
      }
      const data = await api('create_chat', newChat);

      if (data.chat) {
        this.props.app.setState({ chats: this.props.app.state.chats.concat(data.chat) });
        return browserHistory.push(`/messages/${data.chat.id}`);
      }

      if (data.error) {
        this.props.app.handleOpenPopUp({
          message: data.error.description,
        });
      }
    }
  }

  renderStatus = (user) => {
    if (this.props.app.state.isStatusVisible) {
      return <i className={`fas fa-circle ${user.status}`}></i>
    }
  }

  renderInputSearch = () => {
    if (this.props.app.state.isSearch) {
      return (
        <InputSearch
          onChange={(e) => this.handleChangeInputSearch(e.target.value)}
        />
      )
    }
  }

  render () {
    const { currentUser, isSearch } = this.props.app.state;
    const contacts = this.props.app.state.users.filter((user) => {
      return currentUser.contacts.includes(user.id);
    });
    const users = isSearch
      ? this.state.users
      : contacts;
    const filteredUsers = users.filter((user) => user.id !== currentUser.id);


    return (
        <div className="content contacts">
          {this.renderInputSearch()}
          <ul>
            {filteredUsers.map((user) => {
              const onClickUserName = () => this.handleClickContact(user);
              const onClickAvatar = () => this.handleClickOpenContactInfo(user);

              return (
                <li key={user.id}>
                  <div className="img-wrapper">
                    {this.renderStatus(user)}
                    <img className="avatar"
                      src={getImg(user.avatar)}
                      onClick={onClickAvatar}
                    />
                  </div>
                  <span className="user-name" onClick={onClickUserName}>
                    {user.name}
                  </span>
                </li>
              )
            })}
          </ul>
        </div>
    )
  }
}
