import React from 'react';
import { getImg } from '../helpers';

import './styles/base.css';
import './styles/aqua.css';
import './styles/purple.css';

export default class Contacts extends React.Component {

  renderStatus = (user) => {
    if (this.props.isStatusVisible) {
      return <i className={`fas fa-circle ${user.status}`}></i>
    }
  }

  render () {
    const { users, currentUser } = this.props;
    const filteredUsers = users.filter((user) => user.id !== currentUser);

    return (
        <div className="content contacts">
          <ul>

            {filteredUsers.map((user) => {
              const onClickUserName = () => this.props.onClickUserName(user);
              const onClickAvatar = () => this.props.onClickAvatar(user);

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
