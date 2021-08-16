import React from 'react';
import { Link, browserHistory } from 'react-router';

import Themes from '../themes';
import PrivacyAndSecurity from '../privacy-and-security';
import './styles.scss';
import './change-avatar-menu.scss';
import { getImg } from '../helpers';
import noAvatar from '../tg-imgs/no-avatar.png';

// TODO:
// 1. delete taken handlers from header, PrivacyAndSecurity and all Profile component.
// 2. handles for confirming new info in handleClicksaveEditing

export default class Settings extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: this.props.app.state.currentUser.name,
      avatar: this.props.app.state.currentUser.avatar,
      login: this.props.app.state.currentUser.login,
      errorMessage: '',
      messageColor: 'red',

      isOptionsVisible: true,
      activeMenuItem: null
    }
  }

  handleSubmit = () => {
    this.setState({ isOptionsVisible: false });
    this.props.app.handleSubmitUser({
      name: this.state.name,
      avatar: this.state.avatar,
      login: this.state.login
    })
  }

  handleClickMenuItem = (id) => {
    this.setState({ activeMenuItem: (id === this.state.activeMenuItem) ? null : id });
  }

  handleClickEditProfile = () => {
    this.setState({ isOptionsVisible: true });
  }

  // log out

  handleClickLogOut = () => {
    this.props.app.handleOpenPopUp({
      message: 'Do you want to sign out?',
      onConfirm: this.handleConfirmLogOut,
      onClose: this.props.app.handleClosePopUp
    });
  }

  handleConfirmLogOut = () => {
    this.props.app.setState({ currentUser: null });
    localStorage.removeItem('user');
    browserHistory.push('/authentication');
  }

  handleChangeName = (e) => {
    this.setState({ name: e.target.value });
  }

  handleChangeLogin = (e) => {
    const allowedSymbols = /^[0-9a-z]+$/;

    if (e.target.value === '' || allowedSymbols.test(e.target.value)) {
      this.setState({ login: e.target.value });

      const { users } = this.props.app.state;
      const currentLogin = this.props.app.state.currentUser.login;

      const isLoginExist = users.find((user) => user.login === e.target.value);
      const isLoginShort = (e.target.value.length < 3);
      const isLoginAppropriate = (!isLoginExist && e.target.value && !isLoginShort);
      const isLoginEmpty = (!e.target.value || !e.target.value.trim());
      const isAlreadyMine = (e.target.value === currentLogin);

      if (isAlreadyMine) return this.setState({ errorMessage: 'You have already had such login!', messageColor: 'red' });
      if (isLoginExist) return this.setState({ errorMessage: 'This login is already taken!', messageColor: 'red' });
      if (isLoginAppropriate) return this.setState({ errorMessage: 'Allowed login', messageColor: 'green' })
      if (isLoginShort) return this.setState({ errorMessage: 'Too short login!', messageColor: 'red' });
      if (isLoginEmpty) return this.setState({ errorMessage: 'Login cannot be empty!', messageColor: 'red' });
    }
  }

  // avatar
  // handleChangeAvatar = (e) => {
  //   this.setState({ avatar: e.target.files[0].name })
  // }

  handleConfirmRemoveAvatar = () => {
    this.props.app.handleSubmitUser({ avatar: null });
  }

  handleClickRemoveAvatar = () => {
    this.props.app.handleOpenPopUp({
      message: 'Do you want to remove your avatar?',
      onConfirm: this.handleConfirmRemoveAvatar,
      onClose: this.props.app.handleClosePopUp
    });
  }

  // --------------------

  renderMainOptions = (condition) => {
    if (condition) {
      return (
        <div className="dynamic my-info-wrapper">
          <div className={`change-avatar ${this.state.activeMenuItem === 'change-avatar' ? 'active' : ''}`}>
            <div className="headline" onClick={() => this.handleClickMenuItem('change-avatar')}>Change avatar</div>
            <div className="submenu">
              <input
                id="file"
                type="file"
                name="avatar"
                accept="image/png, image/jpeg, image/jpg"
                onChange={this.handleChangeAvatar}
              />
              <label htmlFor="file">Load avatar</label>
              <button className="remove-avatar" onClick={this.handleClickRemoveAvatar}>Remove avatar</button>
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div className="my-info-wrapper">
          <div className="my-name">{this.state.name}</div>
          <div className="my-login">@{this.state.login}</div>
        </div>
      )
    }
  }

  renderFeatures = (condition) => {
    if (condition) {
      return (
        <div className="dynamic options">
          <div className="input-menu">
            <div>
              <input
                className="name-input"
                type="text"
                value={this.state.name}
                onChange={this.handleChangeName}
              />
            </div>
            <div>
              <input
                className="input-login"
                value={this.state.login}
                type="text"
                placeholder={`@${this.props.app.state.currentUser.login}`}
                onChange={this.handleChangeLogin}
              />
              <span className="change-login-message" style={{ color: this.state.messageColor }}>{this.state.errorMessage}</span>
            </div>
          </div>
          <div className="menu">
            <Themes
              onClick={this.handleClickMenuItem}
              activeMenuItem={this.state.activeMenuItem}
              app={this.props.app}
            />
            <PrivacyAndSecurity
              onClick={this.handleClickMenuItem}
              activeMenuItem={this.state.activeMenuItem}
              app={this.props.app}
            />
          </div>
        </div>
      )
    } else {
      return (
        <div className="dynamic features">
          <div className="log-out" onClick={this.handleClickLogOut}>
            Log out
          </div>
        </div>
      )
    }
  }

  renderButtonEdit = (condition) => {
    if (condition) {
      return (
        <span className="save" onClick={this.handleSubmit}>Save</span>
      )
    } else {
      return (
        <span className="edit-my-profile" onClick={this.handleClickEditProfile}>Edit</span>
      )
    }
  }

  render () {
    const { currentUser } = this.props.app.state;
    const { isOptionsVisible } = this.state;

    return (
      <div className="content settings">
        <div className="my-info">
          {this.renderButtonEdit(isOptionsVisible)}
          <div className="my-avatar">
            <img className="my-avatar-image" src={getImg(currentUser.avatar)} />
          </div>
          {this.renderMainOptions(isOptionsVisible)}
        </div>
        {this.renderFeatures(isOptionsVisible)}
      </div>
    )
  }
}
