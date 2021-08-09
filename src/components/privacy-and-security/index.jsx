import React from 'react';
import ShowPasswordCheckbox from '../common/show-password-checkbox';

import './styles/base.css';
import './styles/aqua.css';
import './styles/purple.css';

export default class PrivacyAndSecurity extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      login: props.user.login,
      password: props.user.password,
      currentPassword: '',
      newPassword: '',
      repeatNewPassword: '',
      isPasswordVisible: false,
      inputType: 'password',
      inputLogin: ''
    }
  }

  handleChangeInputCheckbox = (e) => {
    this.props.onChangeStatus(e.target.checked);
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
      this.props.onSubmitUser({ password: this.state.repeatNewPassword });
      this.props.onOpenPopUp({ message: 'Password was changed!' });
      this.setState({
        currentPassword: '',
        newPassword: '',
        repeatNewPassword: ''
      });
    } else {
      this.props.onOpenPopUp({ message: 'Ooops, wrong credentials! Try again :)' });
      this.setState({
        currentPassword: '',
        newPassword: '',
        repeatNewPassword: ''
      })
    }
  }

  handleChangeLogin = (e) => {
    const allowedSymbols = /^[0-9a-z]+$/;

    if (e.target.value === '' || allowedSymbols.test(e.target.value)) {
      this.setState({ inputLogin: e.target.value });
    }
  }

  handleConfirmNewLogin = () => {
    const { users } = this.props;
    const { inputLogin, login } = this.state;

    const isLoginExist = users.find((user) => user.login === inputLogin);
    const isLoginShort = (inputLogin.length < 3);
    const isLoginAppropriate = (!isLoginExist && inputLogin && !isLoginShort);
    const isLoginEmpty = (!inputLogin || !inputLogin.trim());
    const isAlreadyMine = (inputLogin === login);

    if (isLoginAppropriate) {
      this.props.onSubmitUser({ login: this.state.inputLogin });
      this.props.onOpenPopUp({ message: 'Successfully changed!' });
    }

    if (isLoginShort) {
      this.props.onOpenPopUp({ message: 'Too short login!' });
    }

    if (isLoginEmpty) {
      this.props.onOpenPopUp({ message: 'Login cannot be empty!' });
    }

    if (isLoginExist) {
      if (isAlreadyMine) {
        this.props.onOpenPopUp({ message: 'You have already had such login :)' });
      } else {
        this.props.onOpenPopUp({ message: 'This login is already taken' });
      }
    }
  }

  handleClickDeleteAccount = () => {
    this.props.onOpenPopUp({
      message: 'All your data will be deleted and it won\'t be possible to restore it. Do you want to continue?',
      onConfirm: this.props.onConfirmDeleteAccount
    });
  }

  render () {
    const { onClickSubmit, isStatusVisible } = this.props;
    const {
      login,
      inputLogin,
      isPasswordVisible,
      password,
      currentPassword,
      newPassword,
      repeatNewPassword,
      inputType
    } = this.state;

    return (
      <div className="content privacy-and-security">

        <div className="show-status-wrapper">Show my status:
          <input
            type="checkbox"
            id="checkbox"
            onChange={this.handleChangeInputCheckbox}
            checked={isStatusVisible}
          />
          <button onClick={onClickSubmit}>Submit</button>
        </div>

        <div className="change-password-wrapper">
          <h4>Change password</h4>
            <label>
              Current password:
              <input
                type={inputType}
                value={currentPassword}
                onChange={(e) => this.handleChangePassword('currentPassword', e)}
              />
            </label>
            <label>
              New password:
              <input
                type={inputType}
                value={newPassword}
                onChange={(e) => this.handleChangePassword('newPassword', e)}
              />
            </label>
            <label>
              Repeat new password:
              <input
                type={inputType}
                value={repeatNewPassword}
                onChange={(e) => this.handleChangePassword('repeatNewPassword', e)}
              />
            </label>
            <ShowPasswordCheckbox
              onChangeShowPassword={this.changePasswordVisibility}
              checked={isPasswordVisible}
            />
            <button className="button-confirm" onClick={this.handleConfirmNewPassword}>Confirm</button>
        </div>

        <div className="change-login-wrapper">
          <h4>Change login</h4>
            <label>
              <input
                className="input-login"
                type="text"
                value={inputLogin}
                placeholder={`@${login}`}
                onChange={this.handleChangeLogin}
              />
            </label>
            <button className="button-confirm" onClick={this.handleConfirmNewLogin}>Confirm</button>
        </div>

        <div className="delete-account-wrapper">
          <h4>Delete account</h4>
          <span>Press the button to delete your account: </span>
          <button className="button-delete-account" onClick={this.handleClickDeleteAccount}>Delete account</button>
        </div>
      </div>
    )
  }
}
