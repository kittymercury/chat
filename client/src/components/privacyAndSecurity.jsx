import React from 'react';
import { browserHistory } from 'react-router';
import { Dropdown, Icon, Form, Heading, Button, Block } from 'react-bulma-components';
import styled from 'styled-components';

import api from '../api';
import ShowPasswordCheckbox from './common/show-password-checkbox';

const StyledDropdownItem = styled(Dropdown.Item)`
  margin-bottom: 10px;
`;

export default class PrivacyAndSecurity extends React.Component {
  handleClickDeleteAccount = () => {
    this.props.openPopup({
      message: 'All your data will be deleted and it won\'t be possible to restore it. Do you want to continue??',
      type: 'confirm',
      callback: () => this.handleDeleteAccount(),
    });
  }

  handleDeleteAccount = async () => {
    // const { currentUser, users, messages, chats } = this.props.app.state;
    const { currentUser } = this.props;
    const { users, chats, messages } = this.props.records;
    const data = await api('delete_user', currentUser);

    if (data.error) {
      this.props.openPopup({
        message: data.error.description
      })
    }

    if (data.deleted) {
      // this.props.app.setState({ currentUser: null });
      // localStorage.removeItem('user');
      browserHistory.push('/authentication');
    }
  }

  handleChangeInputCheckbox = (e) => {
    this.props.app.setState({ isStatusVisible: e.target.checked });
  }

  changePasswordVisibility = (e) => {
    this.props.changePasswordVisibility(e.target.checked);
  }

  changeInputValue = (type) => (e) => {
    this.props.changeInputValue({ type, page: 'settings', value: e.target.value });
  }

  handleConfirmNewPassword = () => {
    const password = this.props.currentUser.password;
    const { currentPassword, newPassword, repeatNewPassword } = this.props;

    if ((password === currentPassword) && (newPassword === repeatNewPassword)) {
      // this.props.app.handleSubmitUser({ password: this.state.repeatNewPassword });
      // this.props.updateCurrentUser();
      this.props.openPopup({ message: 'Password was changed!' });
      // this.setState({
      //   currentPassword: '',
      //   newPassword: '',
      //   repeatNewPassword: ''
      // });
    } else {
      this.props.openPopup({ message: 'Ooops, wrong credentials! Try again :)' });
      // this.setState({
      //   currentPassword: '',
      //   newPassword: '',
      //   repeatNewPassword: ''
      // })                       // anyway inputs are cleared in the same way
    }

    this.props.confirmNewPassword();
  }

  render () {
    const { password } = this.props.currentUser;
    const {
      currentPassword,
      newPassword,
      repeatNewPassword,
      isPasswordVisible,
    } = this.props;

    return (
      <Dropdown className="privacy-and-security" closeOnSelect={false} icon={<Icon><i aria-hidden="true" className="fas fa-angle-down"/></Icon>} label="Privacy and security">
        <StyledDropdownItem className="wrapper section" value="show-my-password">
          <Heading size="4">Status visibility:</Heading>
          <Form.Field>
            <Form.Control>
              <Form.Checkbox
                onChange={this.handleChangeInputCheckbox}
                // checked={this.props.app.state.isStatusVisible}
              >
              Share my status with other users
            </Form.Checkbox>
              <Form.Help>If you choose to hide your status from other users, you couldn't see their status as well</Form.Help>
            </Form.Control>
          </Form.Field>
        </StyledDropdownItem>
        <StyledDropdownItem className="section" value="change-password">
          <Heading size="4">Change password</Heading>
          <Form.Field>
            <Form.Control>
              <Form.Input
                type={isPasswordVisible ? 'text' : 'password'}
                value={currentPassword}
                placeholder='Old password'
                onChange={this.changeInputValue('currentPassword')}
              />
            </Form.Control>
          </Form.Field>
          <Form.Field>
            <Form.Control>
              <Form.Input
                type={isPasswordVisible ? 'text' : 'password'}
                value={newPassword}
                placeholder='New password'
                onChange={this.changeInputValue('newPassword')}
              />
            </Form.Control>
          </Form.Field>
          <Form.Field>
            <Form.Control>
              <Form.Input
                type={isPasswordVisible ? 'text' : 'password'}
                value={repeatNewPassword}
                placeholder='Repeat new password'
                onChange={this.changeInputValue('repeatNewPassword')}
              />
            </Form.Control>
          </Form.Field>
          <ShowPasswordCheckbox
          onChangeShowPassword={this.changePasswordVisibility}
          // checked={isPasswordVisible}
          />
          <Button color="primary" className="security-button" onClick={this.handleConfirmNewPassword}>Confirm</Button>
        </StyledDropdownItem>
        <StyledDropdownItem value="delete-account" className="section">
          <Heading size="4">Deleting account</Heading>
            <Block>To delete your account press the button:</Block>
            <Button color="danger" onClick={this.handleClickDeleteAccount}>Delete account</Button>
        </StyledDropdownItem>
      </Dropdown>
    )
  }
}
