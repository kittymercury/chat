import React from 'react';
import { browserHistory } from 'react-router';

import api from '../api';
import ShowPasswordCheckbox from '../common/show-password-checkbox';

import './styles.scss';

export default class PrivacyAndSecurity extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      password: props.app.state.currentUser.password,
      currentPassword: '',
      newPassword: '',
      repeatNewPassword: '',
      isPasswordVisible: false,
      inputType: 'password'
    }
  }

  handleClickDeleteAccount = () => {
    this.props.app.handleOpenPopUp({
      message: 'All your data will be deleted and it won\'t be possible to restore it. Do you want to continue?',
      onConfirm: this.handleConfirmDeleteAccount
    });
  }

  handleConfirmDeleteAccount = async () => {
    const { currentUser, users, messages, chats } = this.props.app.state;
    const data = await api('delete_user', currentUser);

    if (data.error) {
      this.handleOpenPopUp({
        message: data.error.description
      })
    }

    if (data.deleted) {
      this.props.app.setState({ currentUser: null });
      localStorage.removeItem('user');
      browserHistory.push('/authentication');
    }
  }

  handleChangeInputCheckbox = (e) => {
    this.props.app.setState({ isStatusVisible: e.target.checked });
  }

  handleChangePassword = (name, e) => {
    this.setState({ [name]: e.target.value })
  }

  changePasswordVisibility = (e) => {
    if (e.target.checked) {
      this.setState({ isPasswordVisible: true, inputType: 'text' })
    } else {
      this.setState({ isPasswordVisible: false, inputType: 'password' })
    }
  }

  handleConfirmNewPassword = () => {
    const {
      password,
      currentPassword,
      newPassword,
      repeatNewPassword
    } = this.state;

    if ((password === currentPassword) && (newPassword === repeatNewPassword)) {
      this.props.app.handleSubmitUser({ password: this.state.repeatNewPassword });
      this.props.app.handleOpenPopUp({ message: 'Password was changed!' });
      this.setState({
        currentPassword: '',
        newPassword: '',
        repeatNewPassword: ''
      });
    } else {
      this.props.app.handleOpenPopUp({ message: 'Ooops, wrong credentials! Try again :)' });
      this.setState({
        currentPassword: '',
        newPassword: '',
        repeatNewPassword: ''
      })
    }
  }

  render () {
    const {
      isPasswordVisible,
      password,
      currentPassword,
      newPassword,
      repeatNewPassword,
      inputType
    } = this.state;

    return (
      <div className={`security ${this.props.activeMenuItem === 'privacy-and-security' ? 'active' : ''}`}>
        <div className="menu-name" onClick={() => this.props.onClick('privacy-and-security')}>Privacy and security
          <i className="fas fa-angle-down"></i>
        </div>
        <div className="submenu">
          <div className="wrapper">Show my status:
            <input
              type="checkbox"
              id="checkbox"
              onChange={this.handleChangeInputCheckbox}
              checked={this.props.app.state.isStatusVisible}
            />
          </div>

          <div className="change-password wrapper">
            <div style={{ padding: '0 10px 10px' }}>Change password</div>
            <input
              type={inputType}
              value={currentPassword}
              placeholder='Old password'
              onChange={(e) => this.handleChangePassword('currentPassword', e)}
            />
            <input
              type={inputType}
              value={newPassword}
              placeholder='New password'
              onChange={(e) => this.handleChangePassword('newPassword', e)}
            />
            <input
              type={inputType}
              value={repeatNewPassword}
              placeholder='Repeat new password'
              onChange={(e) => this.handleChangePassword('repeatNewPassword', e)}
            />
            <ShowPasswordCheckbox
            onChangeShowPassword={this.changePasswordVisibility}
            checked={isPasswordVisible}
            />
            <button onClick={this.handleConfirmNewPassword}>Confirm</button>
          </div>

          <div className="delete-account wrapper">
            <div style={{ padding: '0 10px 10px' }}>Delete account</div>
            <span>Press the button to delete your account: </span>
            <button onClick={this.handleClickDeleteAccount}>Delete account</button>
          </div>
        </div>
      </div>
    )
  }
}
