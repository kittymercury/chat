import React from 'react';
import { browserHistory } from 'react-router';
import { Container, Form, Section, Heading, Icon, Button, Block } from 'react-bulma-components';
import styled from 'styled-components';

import api from '../api';
import noAvatar from '../images/no-avatar.png';
import ShowPasswordCheckbox from './common/show-password-checkbox';

const StyledButton = styled(Button)`
  background: none;
  border: none;
  box-shadow: none;
  color: white;
  font-size: 1.1rem;
  position: fixed;
  top: 5px;
  z-index: 1;

  &:hover, &:active, &:focus {
    color: white;
    border: none;
  }

  span {
    margin-left: 5px;
  }
`;

export default class Registration extends React.Component {
  // handleClickSignUp = async () => {
  //   const { login = '', password = '', name = '' } = this.state;
  //   const errors = [];
  //
  //   if (login.trim().length < 3) {
  //     errors.push('Login cannot be shorter than 3 symbols!')
  //   }
  //
  //   if (password.trim().length < 6) {
  //     errors.push('Password cannot be shorter than 6 symbols!')
  //   }
  //
  //   if (!name.trim()) {
  //     errors.push('Enter your name!')
  //   }
  //
  //   if (errors.length) {
  //     return this.props.app.handleOpenPopUp({
  //       message: errors.join('\n')
  //     })
  //   }
  //
  //   const data = await api('sign_up', {
  //     name: this.state.name,
  //     login: this.state.login,
  //     password: this.state.password
  //   });
  //
  //   if (data.user) {
  //     const usersData = await api('get_users');
  //
  //     this.props.app.setState({ currentUser: data.user, users: usersData.users });
  //
  //     localStorage.setItem('user', JSON.stringify(data.user));
  //     browserHistory.push('/settings');
  //   }
  //
  //   if (data.error) {
  //     this.props.app.handleOpenPopUp({
  //       message: data.error.description
  //     });
  //   }
  // }
  //
  // handleChangeLogin = (e) => {
  //   const allowedSymbols = /^[0-9a-z]+$/;
  //
  //   if (e.target.value === '' || allowedSymbols.test(e.target.value)) {
  //     this.setState({ login: e.target.value });
  //   }
  // }


  changeInputValue = (type) => (e) => {
    this.props.changeInputValue({ type, page: 'registration', value: e.target.value });
  }


  changePasswordVisibility = (e) => {
    this.props.changePasswordVisibility(e.target.checked);
  }

  handleClickBack = () => {
    this.props.backToLoginPage();
    browserHistory.goBack();
  }

  render () {
    const { name, login, password, isPasswordVisible } = this.props;

    return (
      <Container className="registration">
        <StyledButton onClick={this.handleClickBack}>
          <i className="fas fa-angle-left"></i>
          <span>Back</span>
        </StyledButton>
      {/* <StyledSection>  */}
        <Block style={{ textAlign: 'center' }}>
          <Heading>Registration</Heading>
        </Block>
        <Section style={{ padding: '1.5rem 2.5rem' }} >
          <form>
            <Form.Field>
              <Form.Label>Username</Form.Label>
              <Form.Control>
                <Form.Input
                  color="success"
                  type="text"
                  placeholder="Username"
                  value={name}
                  onChange={this.changeInputValue('name')}
                />
                <Icon align="left" size="small">
                  <i className="fas fa-user" />
                </Icon>
              </Form.Control>
            </Form.Field>
            <Form.Field>
              <Form.Label>Login</Form.Label>
              <Form.Control>
                <Form.Input
                  color="success"
                  type="text"
                  placeholder="Your login"
                  value={login}
                  onChange={this.changeInputValue('login')}
                />
                <Form.Help color="text">Your login should contain only numbers and letters</Form.Help>
                <Icon align="left" size="small">
                  <i className="fas fa-at"></i>
                </Icon>
              </Form.Control>
            </Form.Field>
            <Form.Field>
              <Form.Label>Password</Form.Label>
              <Form.Control>
                <Form.Input
                  color="success"
                  type={isPasswordVisible ? 'text' : 'password'}
                  placeholder="Password"
                  value={password}
                  onChange={this.changeInputValue('password')}
                />
                <Icon align="left" size="small">
                  <i className="fas fa-lock" />
                </Icon>
                <Icon align="right" size="small">
                  {isPasswordVisible
                    ? <i className="fas fa-eye"></i>
                    : <i className="fas fa-eye-slash"></i>
                  }
                </Icon>
              </Form.Control>
            </Form.Field>
            <ShowPasswordCheckbox
              onChangeShowPassword={this.changePasswordVisibility}
            />
            <Button color="success" onClick={this.handleClickSignUp}>Sign up</Button>
          </form>
        </Section>
      </Container>
    )
  }
}
