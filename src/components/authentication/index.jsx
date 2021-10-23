import React from 'react';
import { Link, browserHistory } from 'react-router';

import api from '../api';

import './styles.scss';

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

  handleClickLogIn = async (state) => {
    const data = await api('login', {
      password: this.state.password,
      login: this.state.login
    });

    if (data.error) {
      this.props.app.handleOpenPopUp({
        message: data.error.description,
      });
    }

    if (data.user) {
      await this.props.app.init(data.user);

      this.props.app.setState({
        currentUser: data.user,
      });

      this.setState({ login: '', password: '' });
      browserHistory.push('/chats');
      localStorage.setItem('user', JSON.stringify(data.user));
    }
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
        <div className="headline">Sign in</div>
        {this.renderInput('text', 'Login', login, 'login')}
        {this.renderInput(inputType, 'Password', password, 'password')}
        <ShowPasswordCheckbox
          onChangeShowPassword={this.changePasswordVisibility}
          checked={isPasswordVisible}
        />
        <div className="buttons-wrapper">
          <button onClick={this.handleClickLogIn}>Log in</button>
          <div>Don't have an account? Sign up!</div>
          <Link to="registration"><button>Sign up</button></Link>
        </div>
      </div>
    )
  }
}
