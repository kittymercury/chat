import React from 'react';
import { browserHistory } from 'react-router';

import { getImg } from '../helpers';

import './styles/base.css';
import './styles/aqua.css';
import './styles/purple.css';

export default class Contacts extends React.Component {
  handleClickOpenContactInfo = (user) => {
    browserHistory.push(`/contact-info/${user.id}`);
  }

  handleClickContact = (user) => {
    const { currentChat, chats, users, currentUser } = this.props.app.state;

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

    this.props.app.setState({ chats: newChats });
    browserHistory.push(`/messages/${newChat.id}`);
  }

  renderStatus = (user) => {
    if (this.props.app.state.isStatusVisible) {
      return <i className={`fas fa-circle ${user.status}`}></i>
    }
  }

  render () {
    const { users, currentUser } = this.props.app.state;
    const filteredUsers = users.filter((user) => user.id !== currentUser.id);

    return (
        <div className="content contacts">
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
