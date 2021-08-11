import React from 'react';
import { Link, browserHistory } from 'react-router';

import api from '../api';

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

  // handleClickLogIn = (state) => {
  //   const { users } = this.state;
  //
  //   const currentUser = users.find((user) => {
  //     if ((user.login === state.login) && (user.password === state.password)) {
  //       return true;
  //     } else {
  //       return false;
  //     }
  //   });
  //   if (currentUser) {
  //     this.changePage('Chats');
  //     this.setState({
  //       currentUser: currentUser.id,
  //     });
  //   } else {
  //     this.handleOpenPopUp({
  //       message: 'No users with such data!'
  //     });
  //     this.setState({ currentPage: 'Authentication' });
  //   }
  // }

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
      const usersData = await api('get_users');

      this.props.app.setState({
        users: usersData.users,
        currentUser: data.user.id,
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
            <Link to="registration"><button>Sign up</button></Link>
          </div>
        </form>
      </div>
    )
  }
}
