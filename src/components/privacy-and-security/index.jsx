import React from 'react';
import { browserHistory } from 'react-router';

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
      inputType: 'password',
    }
  }

  handleConfirmDeleteAccount = () => {
    this.props.app.setState({ users: [], currentUser: null });
    localStorage.removeItem('user');
    browserHistory.push('/authentication');
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

  // handleChangeLogin = (e) => {
  //   const allowedSymbols = /^[0-9a-z]+$/;
  //
  //   if (e.target.value === '' || allowedSymbols.test(e.target.value)) {
  //     this.setState({ inputLogin: e.target.value });
  //   }
  // }
  //
  // handleConfirmNewLogin = () => {
  //   const { users } = this.props.app.state;
  //   const { inputLogin, login } = this.state;
  //
  //   const isLoginExist = users.find((user) => user.login === inputLogin);
  //   const isLoginShort = (inputLogin.length < 3);
  //   const isLoginAppropriate = (!isLoginExist && inputLogin && !isLoginShort);
  //   const isLoginEmpty = (!inputLogin || !inputLogin.trim());
  //   const isAlreadyMine = (inputLogin === login);
  //
  //   if (isLoginAppropriate) {
  //     this.props.app.handleSubmitUser({ login: this.state.inputLogin });
  //     this.props.app.handleOpenPopUp({ message: 'Successfully changed!' });
  //   }
  //
  //   if (isLoginShort) {
  //     this.props.app.handleOpenPopUp({ message: 'Too short login!' });
  //   }
  //
  //   if (isLoginEmpty) {
  //     this.props.app.handleOpenPopUp({ message: 'Login cannot be empty!' });
  //   }
  //
  //   if (isLoginExist) {
  //     if (isAlreadyMine) {
  //       this.props.app.handleOpenPopUp({ message: 'You have already had such login :)' });
  //     } else {
  //       this.props.app.handleOpenPopUp({ message: 'This login is already taken' });
  //     }
  //   }
  // }

  handleClickDeleteAccount = () => {
    this.props.app.handleOpenPopUp({
      message: 'All your data will be deleted and it won\'t be possible to restore it. Do you want to continue?',
      onConfirm: this.props.app.handleConfirmDeleteAccount
    });
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
      <div className="content privacy-and-security">

        <div>Show my status:
          <input
            type="checkbox"
            id="checkbox"
            onChange={this.handleChangeInputCheckbox}
            checked={this.props.app.state.isStatusVisible}
          />
        </div>

        <div>
          <h4>Change password</h4>
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
          <button className="button-confirm" onClick={this.handleConfirmNewPassword}>Confirm</button>
        </div>

        <div>
          <h4>Delete account</h4>
          <span>Press the button to delete your account: </span>
          <button className="button-delete-account" onClick={this.handleClickDeleteAccount}>Delete account</button>
        </div>
      </div>
    )
  }
}
