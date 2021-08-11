import React from 'react';
import { Link, browserHistory } from 'react-router';
import { getImg } from '../helpers';
import './styles/base.css';
import './styles/aqua.css';
import './styles/purple.css';

export default class Settings extends React.Component {
  render () {
    const { currentUser } = this.props.app.state;

    return (
      <div className="content settings">
        <div className="my-info">
          <div className="my-avatar">
            <img className="my-avatar-image" src={getImg(currentUser.avatar)} />
          </div>
          <div className="my-name">{currentUser.name}</div>
          <div className="my-login">@{currentUser.login}</div>
        </div>
        <div className="space"></div>
        <ul className="features">
          <li><Link to="/profile">Edit profile</Link></li>
          <li><Link to="/themes">Themes</Link></li>
          <li><Link to="/privacy-and-security">Privacy and security</Link></li>
        </ul>
      </div>
    )
  }
}
