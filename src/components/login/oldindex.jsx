import React from 'react';
import { Link, browserHistory } from 'react-router';
import { Container, Form, Section, Heading, Icon, Box, Hero, Message, Button, Block } from 'react-bulma-components';
import api from '../../api';

import './styles.scss';
// import { StyledSection } from './styles.js';

import ShowPasswordCheckbox from '../common/show-password-checkbox';

export default class Login extends React.Component {
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

  handleClickLogIn = async () => {
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

  render () {
    const { login, inputType, password, isPasswordVisible } = this.state;

    return (
      <div className="section">
        <div className="field">
          <div className="headline">Log in</div>
         <label className="label is-large">Log in</label>
         <div className="control has-icons-left has-icons-right">
           <input
             className="input"
             type="text"
             placeholder="Your login"
             value={login}
             onChange={(e) => this.changeInputValue('login', e)}
           />
           <span className="icon is-small is-left">
             <i className="fas fa-user"></i>
           </span>
         </div>
         <div className="control has-icons-left has-icons-right">
           <input
             className="input"
             type={inputType}
             placeholder="Your password"
             value={password}
             onChange={(e) => this.changeInputValue('password', e)}
           />
           <span className="icon is-small is-left">
             <i className="fas fa-lock"></i>
           </span>
         </div>
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
