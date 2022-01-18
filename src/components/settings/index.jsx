import React from 'react';
import { Link, browserHistory } from 'react-router';
import { Container, Section, Block } from 'react-bulma-components';

import Themes from '../themes';
import PrivacyAndSecurity from '../privacyAndSecurity';
import './styles.scss';
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

  // log out

  handleClickLogOut = () => {
    this.props.openPopup({
      message: 'Do you want to log out?',
      type: 'confirm',
      callback: () => this.handleLogOut(),
    });
  }

  handleLogOut = () => {
    this.props.app.ws.close();
    this.props.app.setState({ currentUser: null });
    localStorage.removeItem('user');
    browserHistory.push('/authentication');
  }

  render () {
    console.log({settingsProps: this.props});
    const { currentUser } = this.props.app.state;

    if (!currentUser) return null;

    return (
      <Container
        fullhd={{ display: 'contents' }}
        breakpoint="fullhd"
        className="settings"
      >
        <Section>
          <Block className="current-user-img" style={{ backgroundImage: `url(${this.getAvatar()})` }}></Block>
          <Block>
            <div className="name">{this.props.app.state.currentUser.name}</div>
            <div className="login">@{this.props.app.state.currentUser.login}</div>
          </Block>
        </Section>
        <div className="settings-dropdowns">
          <Themes
            app={this.props.app}
          />
          <PrivacyAndSecurity
            app={this.props.app}
          />
        </div>
      </Container>
    )
  }
}
