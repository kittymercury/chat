import React from 'react';
import './styles/base.css';
import './styles/aqua.css';
import './styles/purple.css';

import noAvatar from '../tg-imgs/no-avatar.png';
import ShowPasswordCheckbox from '../common/show-password-checkbox';

export default class Registration extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      login: '',
      password: '',
      name: '',
      avatar: '',
      isPasswordVisible: false,
      inputType: 'password'
    }
  }

  handleChangeLogin = (e) => {
    const allowedSymbols = /^[0-9a-z]+$/;

    if (e.target.value === '' || allowedSymbols.test(e.target.value)) {
      this.setState({ login: e.target.value });
    }
  }

  handleChangeAvatar = (e) => {
    this.setState({ avatar: e.target.files[0].name })
  }

  changeInputValue = (name, e) => {
    this.setState({ [name]: e.target.value })
  }

  handleClickSignUp = (e) => {
    this.props.onClickSignUp(this.state);
  }

  changePasswordVisibility = (e) => {
    if (e.target.checked) {
      this.setState({ isPasswordVisible: true, inputType: 'text' })
    } else {
      this.setState({ isPasswordVisible: false, inputType: 'password' })
    }
  }

  render () {
    const { isPasswordVisible, inputType } = this.state;

    return (
      <div className="content registration">
        <form>
          <div className="registration-headline">Sign up</div>
          <div>
            <input
              type="text"
              placeholder="Your name*"
              value={this.state.name}
              onChange={(e) => this.changeInputValue('name', e)}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Login*"
              value={this.state.login}
              onChange={this.handleChangeLogin}
            />
          </div>
          <div>
            <input
              type={inputType}
              placeholder="Password*"
              value={this.state.password}
              onChange={(e) => this.changeInputValue('password', e)}
            />
            <ShowPasswordCheckbox
              onChangeShowPassword={this.changePasswordVisibility}
              checked={isPasswordVisible}
            />
          </div>
          <div>
            <input
              className="sign-up-avatar"
              type="file"
              name="avatar"
              accept="image/png, image/jpeg, image/jpg"
              value={this.state.avatar}
              onChange={(e) => this.changeInputValue('avatar', e)}
            />
          </div>
          <div className="button-wrapper">
            <div className="sign-up-button" onClick={this.handleClickSignUp}>Sign up</div>
          </div>
        </form>
      </div>
    )
  }
}
