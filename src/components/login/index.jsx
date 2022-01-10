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
    console.log({login, password});
    await this.props.app.login({ password, login });
    this.setState({ login: '', password: '' });
  }

  changePasswordVisibility = (e) => {
    console.log(e.target.checked);
    if (e.target.checked) {
      this.setState({ isPasswordVisible: true, inputType: 'text' })
    } else {
      this.setState({ isPasswordVisible: false, inputType: 'password' })
    }
  }

  render () {
    const { login, inputType, password, isPasswordVisible } = this.state;

    return (
      <Container breakpoint="mobile">
        <Hero>
          <Hero.Body>
            <Heading>Log in</Heading>
          </Hero.Body>
        </Hero>
        <Section>
          <Form.Field>
            <Form.Label>Login</Form.Label>
            <Form.Control>
              <Form.Input
                color="success"
                type="text"
                placeholder="Your login"
                value={login}
                onChange={(e) => this.changeInputValue('login', e)}
              />
              <Icon align="left" size="small">
                <i className="fas fa-user" />
              </Icon>
              {/* <Icon align="right" size="small">
                <i className="fas fa-check" />
              </Icon> */}
              {/* <Form.Help color="danger">This email is invalid</Form.Help> */}
            </Form.Control>
          </Form.Field>
          <Form.Field>
            <Form.Label>Password</Form.Label>
            <Form.Control>
              <Form.Input
                color="success"
                type={inputType}
                placeholder="Your password"
                value={password}
                onChange={(e) => this.changeInputValue('password', e)}
              />
              <Icon align="left" size="small">
                <i className="fas fa-lock" />
              </Icon>
            </Form.Control>
          </Form.Field>
            <ShowPasswordCheckbox
              onChangeShowPassword={this.changePasswordVisibility}
              checked={isPasswordVisible}
            />
          <Button color="success" onClick={this.handleClickLogIn}>Go</Button>
        </Section>
        <Section>
          <Heading subtitle>Don't have an account yet?</Heading>
          <Heading size="4">
            <Link to="registration">Registrate here</Link>
          </Heading>
        </Section>
      </Container>
    )
  }
}
