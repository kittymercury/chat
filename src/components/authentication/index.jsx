import React from 'react';
import { Link, browserHistory } from 'react-router';

import api from '../../api';

import './styles.scss';

import ShowPasswordCheckbox from '../common/show-password-checkbox';

export default class Authentication extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      login: '',
      password: '',
      inputType: 'password',
      isPasswordVisible: false
    }
  }

  changeInputValue = (name, e) => {
    this.setState({ [name]: e.target.value })
  }

  handleClickLogIn = async (state) => {
    const { login, password } = this.state;
    await this.props.app.login({ password, login });
    this.setState({ login: '', password: '' });
  }

  changePasswordVisibility = (e) => {
    if (e.target.checked) {
      this.setState({ isPasswordVisible: true, inputType: 'text' })
    } else {
      this.setState({ isPasswordVisible: false, inputType: 'password' })
    }
  }

  renderInput = (type, placeholder, value, name) => {
    return (
      <input
        type={`${type}`}
        placeholder={`${placeholder}`}
        value={value}
        onChange={(e) => this.changeInputValue(name, e)}
      />
    )
  }

  render () {
    const { login, inputType, password, isPasswordVisible } = this.state;

    return (
      <div className="content authentication">
        <div className="inputs">
          <div className="headline">Log in</div>
          {this.renderInput('text', 'Login', login, 'login')}
          {this.renderInput(inputType, 'Password', password, 'password')}
          <ShowPasswordCheckbox
            onChangeShowPassword={this.changePasswordVisibility}
            checked={isPasswordVisible}
          />
          <div className="button" onClick={this.handleClickLogIn}>Go</div>
        </div>
        <div className="sign-up-wrapper">
          <div>Don't have an account yet?</div>
          <Link to="registration">
            <div className="link-to-reg">Sign up here</div>
          </Link>
        </div>
      </div>
    )
  }
}
