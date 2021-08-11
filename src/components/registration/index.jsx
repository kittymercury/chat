import React from 'react';
import { browserHistory } from 'react-router';

import api from '../api';

import './styles/base.scss';
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

  handleClickSignUp = async () => {
    const data = await api('sign_up', {
      name: this.state.name,
      login: this.state.login,
      password: this.state.password
    });

    if (data.user) {
      const usersData = await api('get_users');

      this.setState({ currentUser: data.user.id, users: usersData.users });

      browserHistory.push('/settings');
      localStorage.setItem('user', JSON.stringify(data.user));
    }

    if (data.error) {
      this.props.app.handleOpenPopUp({
        message: data.error.description
      });
    }


    // const isName = newUser.name && newUser.name.trim();
    // const isLogin = newUser.login && newUser.login.trim();
    // const isPassword = newUser.password && newUser.password.trim();
    // const isLoginExist = users.find((user) => user.login === state.login);
    // const isLoginShort = newUser.login.length < 3;
    //
    // if (isName && isLogin && isPassword) {
    //   if (!isLoginExist) {
    //     if (!isLoginShort) {
    //       const newUsers = users.concat(newUser);
    //
    //       this.changePage('Chats');
    //       this.setState({ currentUser: newUser.id, users: newUsers });
    //     } else {
    //       this.handleOpenPopUp({
    //         message: 'Login cannot be shorter than 4 symbols!'
    //       });
    //     }
    //   } else {
    //     this.handleOpenPopUp({
    //       message: 'Oops, this name is already taken'
    //     });
    //   }
    // } else {
    //   this.handleOpenPopUp({
    //     message: 'Inputs with * cannot be empty!'
    //   });
    // }
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
        <input
          className="sign-up-avatar"
          type="file"
          name="avatar"
          accept="image/png, image/jpeg, image/jpg"
          value={this.state.avatar}
          onChange={(e) => this.changeInputValue('avatar', e)}
        />
        <button className="sign-up-button" onClick={this.handleClickSignUp}>Sign up</button>
      </div>
    )
  }
}
