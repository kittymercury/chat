import React from 'react';
import { Link, browserHistory } from 'react-router';

import './styles.scss';
import { getImg } from '../helpers';

export default class Settings extends React.Component {
  render () {
    const { currentUser } = this.props.app.state;

    return (
      <div className="content settings">
        <div className="my-info">
          <span className="edit-my-profile">
            <Link to="/profile"><i className="fas fa-pencil-alt"></i></Link>
          </span>
          <div className="my-avatar">
            <img className="my-avatar-image" src={getImg(currentUser.avatar)} />
          </div>
          <div className="my-name">{currentUser.name}</div>
          <div className="my-login">@{currentUser.login}</div>
        </div>
        <ul className="features">
          <li><Link to="/themes">Themes</Link></li>
          <li><Link to="/privacy-and-security">Privacy and security</Link></li>
        </ul>
      </div>
    )
  }
}
