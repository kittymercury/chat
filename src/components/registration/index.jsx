import React from 'react';
import { browserHistory } from 'react-router';

import api from '../../api';

import './styles.scss';

import noAvatar from '../../images/no-avatar.png';
import ShowPasswordCheckbox from '../common/show-password-checkbox';

export default class Registration extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      login: '',
      password: '',
      name: '',
      isPasswordVisible: false,
      inputType: 'password'
    }
  }

  handleClickSignUp = async () => {
    const { login = '', password = '', name = '' } = this.state;
    const errors = [];

    if (login.trim().length < 3) {
      errors.push('Login cannot be shorter than 3 symbols!')
    }

    if (password.trim().length < 6) {
      errors.push('Password cannot be shorter than 6 symbols!')
    }

    if (!name.trim()) {
      errors.push('Enter your name!')
    }

    if (errors.length) {
      return this.props.app.handleOpenPopUp({
        message: errors.join('\n')
      })
    }

    const data = await api('sign_up', {
      name: this.state.name,
      login: this.state.login,
      password: this.state.password
    });

    if (data.user) {
      const usersData = await api('get_users');

      this.props.app.setState({ currentUser: data.user, users: usersData.users });

      localStorage.setItem('user', JSON.stringify(data.user));
      browserHistory.push('/settings');
    }

    if (data.error) {
      this.props.app.handleOpenPopUp({
        message: data.error.description
      });
    }
  }

  handleChangeLogin = (e) => {
    const allowedSymbols = /^[0-9a-z]+$/;

    if (e.target.value === '' || allowedSymbols.test(e.target.value)) {
      this.setState({ login: e.target.value });
    }
  }


  changeInputValue = (name, e) => {
    this.setState({ [name]: e.target.value })
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
        <div className="headline">Sign up</div>
        <input
          type="text"
          placeholder="Your name*"
          value={this.state.name}
          onChange={(e) => this.changeInputValue('name', e)}
        />
        <input
          type="text"
          placeholder="Login*"
          value={this.state.login}
          onChange={this.handleChangeLogin}
        />
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
        <div className="sign-up-button" onClick={this.handleClickSignUp}>Sign up</div>
      </div>
    )
  }
}
