import React from 'react';
import { getImg } from '../helpers';
import './styles/base.css';
import './styles/aqua.css';
import './styles/purple.css';

export default class ContactInfo extends React.Component {

  renderStatus = (user) => {
    if (this.props.isStatusVisible) {
      return <i className={`fas fa-circle ${user.status}`}></i>
    }
  }

  render () {
    const { user, onClickOpenChat } = this.props;

    return (
      <div className="content contact-info">
        <div className="user-info">
          <div className="user-info-wrapper">
            <img className="user-avatar-image" src={getImg(user.avatar)} />
            {this.renderStatus(user)}
            <div className="user-name">{user.name}</div>
            <div className="user-login">@{user.login}</div>
          </div>
          <div>
            <div className="chat-with-user" onClick={onClickOpenChat}>Open chat</div>
          </div>
        </div>
      </div>
    )
  }
}
