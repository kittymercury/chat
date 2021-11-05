import React from 'react';
import { Link, browserHistory } from 'react-router';

import Themes from '../themes';
import PrivacyAndSecurity from '../privacy-and-security';
import './styles.scss';
import './change-avatar-menu.scss';
import { getImg, openFileDialog } from '../../helpers';
import noAvatar from '../../images/no-avatar.png';

export default class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: '',
      messageColor: 'red',
      activeMenuItem: null,

      isEditProfileMode: false,
    }

    if (this.props.app.state.currentUser) {
      this.state.name = this.props.app.state.currentUser.name;
      this.state.avatar = this.props.app.state.currentUser.avatar;
      this.state.login = this.props.app.state.currentUser.login;
    }
  }

  renderSettingsHeader = () => {
    if (this.state.isEditProfileMode) {
      return (
        <div className="settings-btns">
          <span onClick={this.handleClickCancelEditProfile}>Cancel</span>
          <div className="title">Settings</div>
          <span style={{ paddingLeft: '23px' }} onClick={this.handleSubmit}>Save</span>
        </div>
      )
    } else {
      return (
        <div className="settings-btns">
          <span style={{ cursor: 'initial', color: 'transparent' }}>
            <i className="fas fa-pen"></i>
          </span>
          <div className="title">Settings</div>
          <span onClick={this.handleClickEditProfile}>
            <i className="fas fa-pen"></i>
          </span>
        </div>
      )
    }
  }

  handleSubmit = () => {
    this.setState({ isEditProfileMode: false });
    this.props.app.handleSubmitUser({
      name: this.state.name,
      login: this.state.login
    })
  }

  handleClickEditProfile = () => {
    this.setState({ isEditProfileMode: true });
  }

  handleClickCancelEditProfile = () => {
    this.setState({ isEditProfileMode: false });
  }

  handleClickMenuItem = (id) => {
    this.setState({ activeMenuItem: (id === this.state.activeMenuItem) ? null : id });
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
    this.props.app.ws.close();
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

  handleClickLoadAvatar = () => {
    openFileDialog({ alias: 'tgc_user' }, this.props.app.state.currentUser);
  }

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
            <button className="input-avatar" onClick={this.handleClickLoadAvatar}>Load avatar</button>
            <button onClick={this.handleClickRemoveAvatar}>Remove avatar</button>
          </div>
        </div>
      )
    } else {
      return (
        <div className="data-wrapper">
          <div className="name">{this.props.app.state.currentUser.name}</div>
          <div className="login">@{this.props.app.state.currentUser.login}</div>
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

  render () {
    const { currentUser } = this.props.app.state;
    const { isEditProfileMode } = this.state;

    if (!currentUser) return null;

    return (
      <div className="content settings">
        <div className="header-info-wrapper">
          {this.renderSettingsHeader()}
        </div>
        <div className="info">
          <div className="current-user-img" style={{ backgroundImage: `url(${getImg(currentUser.avatar)})` }}></div>
          {this.renderMainOptions(isEditProfileMode)}
        </div>
        {this.renderFeatures(isEditProfileMode)}
      </div>
    )
  }
}
