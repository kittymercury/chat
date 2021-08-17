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
        <div className={`avatar-menu ${this.state.activeMenuItem === 'avatar-menu' ? 'active' : ''}`}>
          <div className="menu-name" onClick={() => this.handleClickMenuItem('avatar-menu')}>Change avatar</div>
          <div className="submenu">
            <input
              id="file"
              type="file"
              name="avatar"
              accept="image/png, image/jpeg, image/jpg"
              onChange={this.handleChangeAvatar}
            />
            <label htmlFor="file">Load avatar</label>
            <button onClick={this.handleClickRemoveAvatar}>Remove avatar</button>
          </div>
        </div>
      )
    } else {
      return (
        <div className="data-wrapper">
          <div className="name">{this.state.name}</div>
          <div className="login">@{this.state.login}</div>
        </div>
      )
    }
  }

  renderFeatures = (condition) => {
    if (condition) {
      return (
        <div className="options">
          <div className="input-menu">
            <div>
              <input
                type="text"
                value={this.state.name}
                onChange={this.handleChangeName}
              />
            </div>
            <div>
              <input
                type="text"
                value={this.state.login}
                placeholder={`@${this.props.app.state.currentUser.login}`}
                onChange={this.handleChangeLogin}
              />
              <span style={{ color: this.state.messageColor, fontSize: '10px', paddingLeft: '8px' }}>{this.state.errorMessage}</span>
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
        <div className="log-out" onClick={this.handleClickLogOut}>
          Log out
        </div>
      )
    }
  }

  renderButtonEdit = (condition) => {
    if (condition) {
      return <span onClick={this.handleSubmit}>Save</span>
    } else {
      return <span onClick={this.handleClickEditProfile}>Edit</span>
    }
  }

  render () {
    const { currentUser } = this.props.app.state;
    const { isOptionsVisible } = this.state;

    return (
      <div className="content settings">
        <div className="info">
          {this.renderButtonEdit(isOptionsVisible)}
          <img src={getImg(currentUser.avatar)} />
          {this.renderMainOptions(isOptionsVisible)}
        </div>
        {this.renderFeatures(isOptionsVisible)}
      </div>
    )
  }
}
