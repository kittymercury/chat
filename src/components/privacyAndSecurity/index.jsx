import React from 'react';
import { browserHistory } from 'react-router';
import { Dropdown, Icon, Form, Heading, Button, Block } from 'react-bulma-components';
import styled from 'styled-components';

import api from '../../api';
import ShowPasswordCheckbox from '../common/show-password-checkbox';

const StyledDropdownItem = styled(Dropdown.Item)`
  margin-bottom: 10px;
`;

export default class PrivacyAndSecurity extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      password: props.app.state.currentUser.password,
      currentPassword: '',
      newPassword: '',
      repeatNewPassword: '',
      isPasswordVisible: false,
      inputType: 'password'
    }
  }

  handleClickDeleteAccount = () => {
    this.props.openPopup({
      message: 'All your data will be deleted and it won\'t be possible to restore it. Do you want to continue??',
      type: 'confirm',
      callback: () => this.handleDeleteAccount(),
    });
  }

  handleDeleteAccount = async () => {
    const { currentUser, users, messages, chats } = this.props.app.state;
    const data = await api('delete_user', currentUser);

    if (data.error) {
      this.props.openPopup({
        message: data.error.description
      })
    }

    if (data.deleted) {
      this.props.app.setState({ currentUser: null });
      localStorage.removeItem('user');
      browserHistory.push('/authentication');
    }
  }

  handleChangeInputCheckbox = (e) => {
    this.props.app.setState({ isStatusVisible: e.target.checked });
  }

  handleChangePassword = (name, e) => {
    this.setState({ [name]: e.target.value })
  }

  changePasswordVisibility = (e) => {
    if (e.target.checked) {
      this.setState({ isPasswordVisible: true, inputType: 'text' })
    } else {
      this.setState({ isPasswordVisible: false, inputType: 'password' })
    }
  }

  handleConfirmNewPassword = () => {
    const {
      password,
      currentPassword,
      newPassword,
      repeatNewPassword
    } = this.state;

    if ((password === currentPassword) && (newPassword === repeatNewPassword)) {
      this.props.app.handleSubmitUser({ password: this.state.repeatNewPassword });
      this.props.openPopup({ message: 'Password was changed!' });
      this.setState({
        currentPassword: '',
        newPassword: '',
        repeatNewPassword: ''
      });
    } else {
      this.props.openPopup({ message: 'Ooops, wrong credentials! Try again :)' });
      this.setState({
        currentPassword: '',
        newPassword: '',
        repeatNewPassword: ''
      })
    }
  }

  render () {
    const {
      isPasswordVisible,
      password,
      currentPassword,
      newPassword,
      repeatNewPassword,
      inputType
    } = this.state;

    return (
      <Dropdown closeOnSelect={false} icon={<Icon><i aria-hidden="true" className="fas fa-angle-down"/></Icon>} label="Privacy and security">
        <StyledDropdownItem className="wrapper section" value="show-my-password">
          <Heading size="4">Status visibility:</Heading>
          <Form.Field>
            <Form.Control>
              <Form.Checkbox
                onChange={this.handleChangeInputCheckbox}
                checked={this.props.app.state.isStatusVisible}
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
                type={inputType}
                value={currentPassword}
                placeholder='Old password'
                onChange={(e) => this.handleChangePassword('currentPassword', e)}
              />
            </Form.Control>
          </Form.Field>
          <Form.Field>
            <Form.Control>
              <Form.Input
                type={inputType}
                value={newPassword}
                placeholder='New password'
                onChange={(e) => this.handleChangePassword('newPassword', e)}
              />
            </Form.Control>
          </Form.Field>
          <Form.Field>
            <Form.Control>
              <Form.Input
                type={inputType}
                value={repeatNewPassword}
                placeholder='Repeat new password'
                onChange={(e) => this.handleChangePassword('repeatNewPassword', e)}
              />
            </Form.Control>
          </Form.Field>
          <ShowPasswordCheckbox
          onChangeShowPassword={this.changePasswordVisibility}
          checked={isPasswordVisible}
          />
          <Button color="primary" className="security-button" onClick={this.handleConfirmNewPassword}>Confirm</Button>
        </StyledDropdownItem>
        <StyledDropdownItem value="delete-account" className="section">
          <Heading size="4">Deleting account</Heading>
            <Block>To delete your account press the button:</Block>
            <Button color="danger" onClick={this.handleClickDeleteAccount}>Delete account</Button>
        </StyledDropdownItem>
      </Dropdown>
      /* <div className={`security ${this.props.activeMenuItem === 'privacyAndSecurity' ? 'active' : ''}`}>
        <div className="menu-name" onClick={() => this.props.onClick('privacyAndSecurity')}>Privacy and security
          <i className="fas fa-angle-down"></i>
        </div>
        <div className="submenu">
          <div className="wrapper">
            <span>Show my status:</span>
            <input
              type="checkbox"
              id="checkbox"
              onChange={this.handleChangeInputCheckbox}
              checked={this.props.app.state.isStatusVisible}
            />
          </div>

          <div className="change-password wrapper">
            <span>Change password</span>
            <input
              type={inputType}
              value={currentPassword}
              placeholder='Old password'
              onChange={(e) => this.handleChangePassword('currentPassword', e)}
            />
            <input
              type={inputType}
              value={newPassword}
              placeholder='New password'
              onChange={(e) => this.handleChangePassword('newPassword', e)}
            />
            <input
              type={inputType}
              value={repeatNewPassword}
              placeholder='Repeat new password'
              onChange={(e) => this.handleChangePassword('repeatNewPassword', e)}
            />
            <ShowPasswordCheckbox
            onChangeShowPassword={this.changePasswordVisibility}
            checked={isPasswordVisible}
            />
            <div className="security-button" onClick={this.handleConfirmNewPassword}>Confirm</div>
          </div>

          <div className="delete-account wrapper">
            {/* <div>Delete account</div>
            <div>To delete your account press the button: </div> */
      //       <div onClick={this.handleClickDeleteAccount}>Delete account</div>
      //     </div>
      //   </div>
      // </div> */}
    )
  }
}
