import React from 'react';
import { browserHistory } from 'react-router';

import api from '../api';
import { getImg } from '../helpers';
import './styles.scss';

export default class Contacts extends React.Component {
  handleClickOpenContactInfo = (user) => {
    browserHistory.push(`/contact-info/${user.id}`);
  }

  handleClickContact = async (user) => {
    const { chats, users, currentUser } = this.props.app.state;

    const isChatExist = chats.find((chat) => {
      if (chat.participants.includes(user.id) && chat.participants.includes(currentUser)) {
        return true;
      } else {
        return false;
      }
    })

    if (isChatExist) return;

    const newChat = {
      participants: [ currentUser.id, user.id ]
    }
    const data = await api('create_chat', newChat);

    if (data.chat) {
      this.props.app.setState({ chats: this.props.app.state.chats.concat(data.chat) });
      browserHistory.push(`/messages/${data.chat.id}`);
    }

    if (data.error) {
      this.props.app.handleOpenPopUp({
        message: data.error.description,
      });
    }
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
