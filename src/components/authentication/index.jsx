import React from 'react';
import './styles/base.css';
import './styles/aqua.css';
import './styles/purple.css';

import ShowPasswordCheckbox from '../common/show-password-checkbox';

export default class Authentication extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      login: '',
      password: '',
      inputType: 'password',
      isPasswordVisible: false,
    }
  }

  changeInputValue = (name, e) => {
    this.setState({ [name]: e.target.value })
  }

  handleClickLogIn = (e) => {
    this.setState({ login: '', password: '' });
    this.props.onClickLogIn(this.state);
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
      <div>
        <input
          type={`${type}`}
          placeholder={`${placeholder}`}
          value={value}
          onChange={(e) => this.changeInputValue(name, e)}
        />
      </div>
    )
  }

  render () {
    const { login, inputType, password, isPasswordVisible } = this.state;

    return (
      <div className="content authentication">
        <div className="authentication-headline">Sign in</div>
        <form>
          {this.renderInput('text', 'Login', login, 'login')}
          {this.renderInput(inputType, 'Password', password, 'password')}
          <ShowPasswordCheckbox
            onChangeShowPassword={this.changePasswordVisibility}
            checked={isPasswordVisible}
          />
          <div className="buttons-wrapper">
            <div className="log-in-button" onClick={this.handleClickLogIn}>Log in</div>
            <div>Don't have an account? Sign up!</div>
            <button onClick={this.props.onClickOpenRegistration}>Sign up</button>
          </div>
        </form>
      </div>
    )
  }
}
