import React from 'react';
import { Link, browserHistory } from 'react-router';
import { Container, Form, Section, Heading, Icon, Box, Hero, Message, Button, Block } from 'react-bulma-components';
import api from '../../api';

import './styles.scss';
// import { StyledSection } from './styles.js';

import ShowPasswordCheckbox from '../common/show-password-checkbox';

export default class Login extends React.Component {
  changeInputValue = (type) => (e) => {
    this.props.changeInputValue({ type, value: e.target.value });
  }

  changePasswordVisibility = (e) => {
    if (e.target.checked) {
      this.props.changePasswordVisibility({ log_inputType: 'text' });
    } else {
      this.props.changePasswordVisibility({ log_inputType: 'password' });
    }
  }

  handleClickLogIn = async () => {
    const { log_login, log_password } = this.props;
    // this.props.onLogin({ login, password });
    await this.props.app.login({ log_password, log_login });
  }

  handleClickRegistrateHere = () => {
    this.props.goToRegistrationPage();
  }

  render () {
    const { log_login, log_password, log_inputType } = this.props;
    console.log({login: this.props});

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
                value={log_login}
                onChange={this.changeInputValue('log_login')}
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
                type={log_inputType}
                placeholder="Your password"
                value={log_password}
                onChange={this.changeInputValue('log_password')}
              />
              <Icon align="left" size="small">
                <i className="fas fa-lock" />
              </Icon>
              <Icon align="right" size="small">
                {log_inputType === "text"
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
        <Section>
          <Heading subtitle>Don't have an account yet?</Heading>
          <Heading size="4" onClick={this.handleClickRegistrateHere}>
            <Link to="registration">Registrate here</Link>
          </Heading>
        </Section>
      </Container>
    )
  }
}
