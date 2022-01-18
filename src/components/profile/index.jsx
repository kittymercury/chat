import React from 'react';
import { Link, browserHistory } from 'react-router';
import { Modal, Container, Section, Block, Navbar, Heading, Icon, Form, Dropdown } from 'react-bulma-components';

import './styles.scss';
import './change-avatar-menu.scss';
import { getImg, getFileFormat } from '../../helpers';
import noAvatar from '../../images/no-avatar.png';

export default class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: '',
      messageColor: 'red',
    }

    if (this.props.app.state.currentUser) {
      this.state.name = this.props.app.state.currentUser.name;
      this.state.avatar = this.props.app.state.currentUser.avatar;
      this.state.login = this.props.app.state.currentUser.login;
    }
  }

  getAvatar = () => {
    if (this.state.avatar && (typeof this.state.avatar === 'object')) {
      return window.URL.createObjectURL(this.state.avatar);
    }
    return getImg(this.state.avatar);
  }

  handleSubmit = () => {
    this.props.toggleEditProfileMode(false);
    this.props.app.handleSubmitUser({
      name: this.state.name,
      login: this.state.login,
      avatar: this.state.avatar,
    })
  }

  handleChangeName = (e) => {
    this.setState({ name: e.target.value });
  }

  handleChangeLogin = (e) => {
    const allowedSymbols = /^[0-9a-z]+$/;

    if (e.target.value === '' || allowedSymbols.test(e.target.value)) {
      this.setState({ login: e.target.value });

      const { users } = this.props.app.state;
      const currentLogin = this.props.app.state.currentUser.login;

      const isLoginExist = users.find((user) => user.login === e.target.value);
      const isLoginShort = (e.target.value.length < 3);
      const isLoginAppropriate = (!isLoginExist && e.target.value && !isLoginShort);
      const isLoginEmpty = (!e.target.value || !e.target.value.trim());
      const isAlreadyMine = (e.target.value === currentLogin);

      if (isAlreadyMine) return this.setState({ errorMessage: 'You have already had such login!', messageColor: 'red' });
      if (isLoginExist) return this.setState({ errorMessage: 'This login is already taken!', messageColor: 'red' });
      if (isLoginAppropriate) return this.setState({ errorMessage: 'Allowed login', messageColor: 'green' })
      if (isLoginShort) return this.setState({ errorMessage: 'Too short login!', messageColor: 'red' });
      if (isLoginEmpty) return this.setState({ errorMessage: 'Login cannot be empty!', messageColor: 'red' });
    }
  }

  handleChangeAvatar = (e) => {
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

    this.setState({ avatar: file });
  }

  handleClickRemoveAvatar = () => {
    this.props.openPopup({
      message: 'Do you want to remove your avatar?',
      callback: () => {
        this.setState({ avatar: null });
        this.props.app.handleSubmitUser({ avatar: null });
      },
    });
  }

  renderChangeAvatarModal = () => {
    return (
      <Modal className="settings" onClose={() => this.setState({ activeMenuItem: null })} show={this.state.activeMenuItem === 'avatar-menu'}>
        <Modal.Content>
          <Form.Field className="input-avatar">
            <Form.Control>
              <Form.InputFile
                label="Load avatar"
                type="file"
                id="avatar"
                name="avatar"
                accept=".jpg, .jpeg, .png"
                onChange={this.handleChangeAvatar}
              />
            </Form.Control>
          </Form.Field>
          <Block className="input-avatar" onClick={this.handleClickRemoveAvatar}>Remove</Block>
        </Modal.Content>
      </Modal>
    )
  }

  renderFeatures = () => {
    return (
      <div className="options">
        <div className="input-menu">
          <Form.Field>
            <Form.Control>
              <Form.Input
                type="text"
                value={this.state.name}
                onChange={this.handleChangeName}
              />
            </Form.Control>
          </Form.Field>
          <Form.Field>
            <Form.Control>
              <Form.Input
                type="text"
                value={this.state.login}
                placeholder={`@${this.props.app.state.currentUser.login}`}
                onChange={this.handleChangeLogin}
              />
            </Form.Control>
            <Form.Help style={{ color: this.state.messageColor, fontSize: '10px', paddingLeft: '8px' }}>{this.state.errorMessage}</Form.Help>
          </Form.Field>
        </div>
      </div>
    )
  }

  render () {
    const { currentUser } = this.props.app.state;

    if (!currentUser) return null;

    return (
      <Container
        fullhd={{ display: 'contents' }}
        breakpoint="fullhd"
        className="profile"
      >
        <Section>
          <Block className="current-user-img" style={{ backgroundImage: `url(${this.getAvatar()})` }}></Block>
          <Block className="menu-name" onClick={() => this.setState({ activeMenuItem: 'avatar-menu'})}>Change avatar</Block>
        </Section>
        {this.renderFeatures()}
        {this.renderChangeAvatarModal()}
      </Container>
    )
  }
}