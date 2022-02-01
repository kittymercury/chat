import React from 'react';
import { Modal, Container, Section, Block, Form, Icon, Button } from 'react-bulma-components';

import './styles.scss';
import { getImg, getFileFormat, showError } from '../../helpers';
import * as ActionHelpers from '../../actions/helpers';
import noAvatar from '../../images/no-avatar.png';

export default class Profile extends React.Component {
  componentDidMount = () => {
    this.props.getCurrentUserData(this.props.currentUser);
  }

  getAvatar = () => {
    const { avatar } = this.props.profile;
    if (avatar && (typeof avatar === 'object')) {
      return window.URL.createObjectURL(avatar);
    }
    return getImg(avatar);
  }

  // handleChangeLogin = (e) => {
  //   const { users } = this.props.records;
  //   const { currentUser } = this.props;
  //
  //   // const isLoginExist = users.find((user) => user.login === e.target.value);
  //   // let isLoginExist;
  //   const data = await api('get_users', { login: e.target.value });
  //   const isLoginExist = data.users ? true : false;
  //   const isLoginShort = (e.target.value.length < 3);
  //   const isLoginAppropriate = (!isLoginExist && e.target.value && !isLoginShort);
  //   const isLoginEmpty = (!e.target.value || !e.target.value.trim());
  //   const isAlreadyMine = (e.target.value === currentUser.login);
  //
  //   if (isAlreadyMine) {
  //     this.props.changeHelpMessage({ color: 'red', message: 'You have already had such login!' });
  //   }
  //   if (isLoginExist) {
  //     this.props.changeHelpMessage({ color: 'red', message: 'This login is already taken!' });
  //     // return this.setState({ errorMessage: 'This login is already taken!', messageColor: 'red' })
  //   };
  //   if (isLoginAppropriate) {
  //     this.props.changeHelpMessage({ color: 'green', message: 'Allowed login' });
  //     // return this.setState({ errorMessage: 'Allowed login', messageColor: 'green' })
  //   }
  //   if (isLoginShort) {
  //     this.props.changeHelpMessage({ color: 'red', message: 'Too short login!' });
  //     // return this.setState({ errorMessage: 'Too short login!', messageColor: 'red' });
  //   }
  //   if (isLoginEmpty) {
  //     this.props.changeHelpMessage({ color: 'red', message: 'Login cannot be empty!' });
  //     // return this.setState({ errorMessage: 'Login cannot be empty!', messageColor: 'red' });
  //   }
  // }

  handleChangeAvatar = (type) => async (e) => {
    const file = e.target.files.item(0);
    if (!file) return;

    const formats = ['png', 'jpeg', 'jpg'];
    if (!formats.includes(getFileFormat(file.name))) {
      return this.props.openPopup({
        message: `File format is not allowed. Please use ${formats}`,
      });
    }

    const maxSize = 5; // megabytes
    if ((file.size >> 20) > maxSize) {

      return this.props.openPopup({
        message: `File size is not allowed. Please use less than ${maxSize}mb`,
      });
    }

    this.props.changeInputValue({ type, page: 'profile', value: file })
    const data = await ActionHelpers.updateCurrentUser({ avatar: file }, this.props.currentUser.id);
    this.props.updateCurrentUser(data);

  }

  handleClickRemoveAvatar = async () => {
    return this.props.openPopup({
      message: 'Do you want to remove your avatar?',
      type: 'confirm',
      callback: () => this.removeAvatar()
    });
  }

  // make it with popup again
  removeAvatar = async () => {
    const data = await ActionHelpers.updateCurrentUser( { avatar: null }, this.props.currentUser.id);
    this.props.updateCurrentUser(data);
  }

  handleChangeValue = (type) => (e) => {
    this.props.changeInputValue({ type, page: 'profile', value: e.target.value });
    // setTimeout(() => this.handleCheckValueValidation(type), 1500);
  }

  // handleBlurInput = (type) => (e) => {
  //   this.props.clearHelpMessage();
  // }
  //
  // handleFocusInput = (e) => {
  //   this.props.changeHelpMessage({
  //     message: 'Login can contain only numbers and letters and cannot be shorter than 3 symbols'
  //   });
  // }
  //
  // handleCheckValueValidation = (type) => () => {
  //   const { name, login } = this.props.profile;
  //
  //   switch (type) {
  //     case 'name':
  //       if (name.length && name.trim()) {
  //         this.props.changeHelpMessage({ color: '', message: ''})
  //       } else {
  //         this.props.changeHelpMessage({
  //           color: 'danger',
  //           message: 'Name cannot be empty'
  //         })
  //       }
  //   }
  // }

  handleBlurInput = (type) => (e) => {
    this.handleCheckValueValidation(type);
  }

  handleFocusInput = (type) => (e) => {
    setTimeout(() => this.handleCheckValueValidation(type), 1500);
  }

  handleCheckValueValidation = (type) => () => {
    switch (type) {
      case 'name':
        if (this.props.profile.name.trim().length) {
          this.props.clearErrorMessage(type)
        } else {
          this.props.changeErrorMessage({
            type,
            color: 'red',
            text: 'Name cannot be empty'
          })
        }
    }
  }

  renderInputs = () => {
    const { currentUser } = this.props;
    const { profile } = this.props;
    const errors = profile.errors;
    console.log({errors});
    // const helpMessage = this.props.profile.helpMessage;

    return (
      <Section className="options">
        <Form.Field>
          <Form.Label>Change username</Form.Label>
          <Form.Control>
            <Form.Input
              type="text"
              color={errors.name.text ? 'danger' : 'primary'}
              value={profile.name}
              onChange={this.handleChangeValue('name')}
              onBlur={this.handleBlurInput('name')}
              onFocus={this.handleFocusInput('name')}
            />
            <Icon align="left" size="small">
              <i className="fas fa-user" />
            </Icon>
          </Form.Control>
          <Form.Help style={{ color: errors.name.color, fontSize: '0.8rem' }}>{errors.name.text}</Form.Help>
          {/* <Form.Help style={{ fontSize: '0.8rem' }}>{helpMessage.message}</Form.Help> */}
        </Form.Field>
        <Form.Field>
          <Form.Label>Change login</Form.Label>
          <Form.Control>
            <Form.Input
              type="text"
              color="primary"
              value={profile.login}
              onChange={this.handleChangeValue('login')}
              onBlur={this.handleBlurInput('login')}
              onFocus={this.handleFocusInput('login')}
            />
            <Icon align="left" size="small">
              <i className="fas fa-at"></i>
            </Icon>
          </Form.Control>
          <Form.Help style={{ color: errors.login.color, fontSize: '0.8rem' }}>{errors.login.text}</Form.Help>
          {/* <Form.Help color={helpMessage.color || 'text'} style={{ fontSize: '0.8rem' }}>{helpMessage.message}</Form.Help> */}
        </Form.Field>
      </Section>
    )
  }

  renderChangeAvatarModal = () => {
    return (
      <Modal className="avatar-menu" onClose={() => this.props.closeAvatarMenu()} show={this.props.profile.isAvatarMenuVisible}>
        <Modal.Content>
          <Form.Field className="input-avatar">
            <Form.Control>
              <Form.InputFile
                label="Load avatar"
                type="file"
                id="avatar"
                name="avatar"
                accept=".jpg, .jpeg, .png"
                onChange={this.handleChangeAvatar('avatar')}
              />
            </Form.Control>
          </Form.Field>
          <Block className="input-avatar" onClick={this.handleClickRemoveAvatar}>Remove</Block>
        </Modal.Content>
      </Modal>
    )
  }

  render () {
    const { currentUser } = this.props;

    if (!currentUser) return null;

    return (
      <Container
        fullhd={{ display: 'contents' }}
        breakpoint="fullhd"
        className="profile"
      >
        <Section>
          <Block className="current-user-img" style={{ backgroundImage: `url(${this.getAvatar()})` }}></Block>
          <Button onClick={() => this.props.openAvatarMenu()}>Change avatar</Button>
        </Section>
        {this.renderInputs()}
        {this.renderChangeAvatarModal()}
      </Container>
    )
  }
}
