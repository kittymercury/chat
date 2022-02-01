import React from 'react';
import { Link, browserHistory } from 'react-router';
import { Container, Form, Section, Block, Heading, Icon, Button } from 'react-bulma-components';

import api from '../api';
import * as ActionHelpers from '../actions/helpers';

import ShowPasswordCheckbox from './common/show-password-checkbox';

export default class Login extends React.Component {
  changeInputValue = (type) => (e) => {
    this.props.changeInputValue({ type, page: 'login', value: e.target.value });
  }

  changePasswordVisibility = (e) => {
    this.props.changePasswordVisibility(e.target.checked);
  }

  handleClickLogIn = async () => {
    const { login, password } = this.props;
    const data = await api('login', { password, login });

    if (data.error) {
      this.props.openPopup({
        message: data.error.description,
      });
    }

    if (data.user) {
      this.props.onLogin(data.user);

      const records = await ActionHelpers.getRecords(data.user);
      this.props.init(records);

      browserHistory.push('/chats');
    }
  }

  handleClickRegistrateHere = () => {
    this.props.goToRegistrationPage();
  }

  render () {
    const { login, password, isPasswordVisible } = this.props;

    return (
      <Container className="login">
        <Block style={{ textAlign: 'center' }}>
          <Heading>Log in</Heading>
        </Block>
        <Section style={{ padding: '1.5rem 2.5rem' }}>
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
                type={isPasswordVisible ? 'text' : 'password'}
                placeholder="Your password"
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
          <Button color="success" onClick={this.handleClickLogIn}>Go</Button>
        </Section>
        <Section style={{ padding: '1.5rem 2.5rem' }}>
          <Heading subtitle>Don't have an account yet?</Heading>
          <Heading size="4" onClick={this.handleClickRegistrateHere}>
            <Link to="/registration">Registrate here</Link>
          </Heading>
        </Section>
      </Container>
    )
  }
}
