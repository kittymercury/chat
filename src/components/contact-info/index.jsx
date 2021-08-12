import React from 'react';
import { browserHistory } from 'react-router';

import { getImg } from '../helpers';
import './styles.scss';

export default class ContactInfo extends React.Component {
  handleClickOpenChat = (user) => {
    const { chats } = this.props.app.state;
    const chat = chats.find((chat) => chat.participants.includes(user.id));

    if (chat) {
      browserHistory.push(`/messages/${chat.id}`)
    } else {
      const { currentUser } = this.props.app.state;
      const newChat = {
        id: +new Date(),
        name: user.name,
        participants: [ currentUser.id, user.id ]
      }

      const newChats = chats.concat(newChat);
      this.setState({ chats: newChats });
      browserHistory.push(`/messages/${newChat.id}`);
    }
  };

  renderStatus = (user) => {
    if (this.props.app.state.isStatusVisible) {
      return <i className={`fas fa-circle ${user.status}`}></i>
    }
  }

  render () {
    const user = this.props.app.state.users.find((user) => user.id === Number(this.props.params.userId));

    if (!user) {
      return (
        <div className="content contact-info">
          user not found
        </div>
      )
    }

    return (
      <div className="content contact-info">
        <div className="info-wrapper">
          <div>
            <img className="user-avatar-image" src={getImg(user.avatar)} />
            {this.renderStatus(user)}
          </div>
          <div className="user-name">{user.name}</div>
          <div className="user-login">@{user.login}</div>
        </div>
        <div className="chat-with-user-wrapper">
          <div className="chat-with-user" onClick={() => this.handleClickOpenChat(user)}>Open chat</div>
        </div>
      </div>
    )
  }
}
