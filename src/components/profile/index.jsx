import React from 'react';
import { Modal, Container, Section, Block, Form, Icon } from 'react-bulma-components';

import './styles.scss';
import { getImg, getFileFormat } from '../../helpers';
import * as ActionHelpers from '../../actions/helpers';
import noAvatar from '../../images/no-avatar.png';

export default class Profile extends React.Component {
  getAvatar = () => {
    // const { currentUser } = this.props;
    // if (currentUser.avatar && (typeof currentUser.avatar === 'object')) {
    //   return window.URL.createObjectURL(currentUser.avatar);
    // }
    // return getImg(currentUser.avatar);
    const { avatar } = this.props.profile;
    console.log({avatar});
    if (avatar && (typeof avatar === 'object')) {
      return window.URL.createObjectURL(avatar);
    }
    return getImg(avatar);

  }

  handleChangeName = (type) => (e) => {
    this.props.changeInputValue({ type, page: 'profile', value: e.target.value });
  }

  // handleChangeLogin = (e) => {
  //   const allowedSymbols = /^[0-9a-z]+$/;
  //
  //   if (e.target.value === '' || allowedSymbols.test(e.target.value)) {
  //     // this.setState({ login: e.target.value });
  //     this.props.changeInputValue({ type: 'login', page: 'profile', value: e.target.value });
  //
  //     // const { users } = this.props.app.state;
  //     // const currentLogin = this.props.app.state.currentUser.login;
  //     const { users } = this.props.records;
  //     const { currentUser } = this.props;
  //
  //     const isLoginExist = users.find((user) => user.login === e.target.value);
  //     const isLoginShort = (e.target.value.length < 3);
  //     const isLoginAppropriate = (!isLoginExist && e.target.value && !isLoginShort);
  //     const isLoginEmpty = (!e.target.value || !e.target.value.trim());
  //     const isAlreadyMine = (e.target.value === currentLogin);
  //
  //     if (isAlreadyMine) {
  //       this.props.changeHelpMesage({ color: 'red', message: 'You have already had such login!' });
  //       // return this.setState({ errorMessage: 'You have already had such login!', messageColor: 'red' });
  //     }
  //     if (isLoginExist) {
  //       this.props.changeHelpMesage({ color: 'red', message: 'This login is already taken!' });
  //       // return this.setState({ errorMessage: 'This login is already taken!', messageColor: 'red' })
  //     };
  //     if (isLoginAppropriate) {
  //       this.props.changeHelpMesage({ color: 'green', message: 'Allowed login' });
  //       // return this.setState({ errorMessage: 'Allowed login', messageColor: 'green' })
  //     }
  //     if (isLoginShort) {
  //       this.props.changeHelpMesage({ color: 'red', message: 'Too short login!' });
  //       // return this.setState({ errorMessage: 'Too short login!', messageColor: 'red' });
  //     }
  //     if (isLoginEmpty) {
  //       this.props.changeHelpMesage({ color: 'red', message: 'Login cannot be empty!' });
  //       // return this.setState({ errorMessage: 'Login cannot be empty!', messageColor: 'red' });
  //     }
  //   }
  // }

  handleChangeAvatar = (type) => async (e) => {
    const file = e.target.files.item(0);
    console.log({file});
    if (!file) return;

    const formats = ['png', 'jpeg', 'jpg'];
    if (!formats.includes(getFileFormat(file.name))) {
      console.log('no format');
      return this.props.openPopup({
        message: `File format is not allowed. Please use ${formats}`,
      });
    }

    const maxSize = 5; // megabytes
    if ((file.size >> 20) > maxSize) {
      console.log('big size');

      return this.props.openPopup({
        message: `File size is not allowed. Please use less than ${maxSize}mb`,
      });
    }

    // this.setState({ avatar: file });
    this.props.changeInputValue({ type, page: 'profile', value: file })
    const data = await ActionHelpers.updateCurrentUser({ avatar: file}, this.props.currentUser.id);
    this.props.updateCurrentUser(data);
    //
    // if (data.error) {
    //   this.props.openPopup({ message: data.error.description })
    // }
    //
    // if (data.avatar) {
    //   this.props.updateCurrentUser(data.user);
    // }
  }

  // handleClickRemoveAvatar = async () => {
  //   console.log('remove avatar');
  //   return this.props.openPopup({
  //     message: 'Do you want to remove your avatar?',
  //     type: 'confirm',
  //     callback: () => this.removeAvatar()
        // this.setState({ avatar: null });
        // this.props.app.handleSubmitUser({ avatar: null });
        // await ActionHelpers.updateCurrentUser({ avatar: null , currentUser: this.props.currentUser });
        // this.props.updateCurrentUser();
      //
  //   });
  // }

  // make it with popup again
  handleClickRemoveAvatar = async () => {
    const data = await ActionHelpers.updateCurrentUser( { avatar: null }, this.props.currentUser.id);
    this.props.updateCurrentUser(data);
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

  renderInputs = () => {
    const { currentUser } = this.props;
    const helpMessage = this.props.profile.helpMessage;

    return (
      <Section className="options">
        <Form.Field>
          <Form.Label>Change username</Form.Label>
          <Form.Control>
            <Form.Input
              type="text"
              color="primary"
              // value={currentUser.name}
              placeholder={currentUser.name}
              onChange={this.handleChangeName('name')}
            />
            <Icon align="left" size="small">
              <i className="fas fa-user" />
            </Icon>
          </Form.Control>
        </Form.Field>
        <Form.Field>
          <Form.Label>Change login</Form.Label>
          <Form.Control>
            <Form.Input
              type="text"
              color="primary"
              // value={currentUser.login}
              placeholder={`@${currentUser.login}`}
              onChange={this.handleChangeLogin}
            />
            <Icon align="left" size="small">@</Icon>
          </Form.Control>
          <Form.Help style={{ color: helpMessage.color, fontSize: '10px', paddingLeft: '8px' }}>{helpMessage.message}</Form.Help>
        </Form.Field>
      </Section>
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
          <Block className="menu-name" onClick={() => this.props.openAvatarMenu()}>Change avatar</Block>
        </Section>
        {this.renderInputs()}
        {this.renderChangeAvatarModal()}
      </Container>
    )
  }
}
