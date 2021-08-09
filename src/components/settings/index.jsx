import React from 'react';
import { getImg } from '../helpers';
import './styles/base.css';
import './styles/aqua.css';
import './styles/purple.css';

export default class Settings extends React.Component {
  render () {
    const {
      user,
      onClickEditProfile,
      onClickThemes,
      onClickPrivacyAndSecurity
    } = this.props;

    return (
      <div className="content settings">
        <div className="my-info">
          <div className="my-avatar">
            <img className="my-avatar-image" src={getImg(user.avatar)} />
          </div>
          <div className="my-name">{user.name}</div>
          <div className="my-login">@{user.login}</div>
        </div>
        <div className="space"></div>
        <ul className="features">
          <li>
            <div onClick={onClickEditProfile}>Edit profile</div>
          </li>
          <li>
            <div onClick={onClickThemes}>Themes</div>
          </li>
          <li>
            <div onClick={onClickPrivacyAndSecurity}>Privacy and security</div>
          </li>
        </ul>
      </div>
    )
  }
}
