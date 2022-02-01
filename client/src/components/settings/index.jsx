import React from 'react';
import { Link, browserHistory } from 'react-router';
import { Container, Section, Block } from 'react-bulma-components';

import Themes from '../../containers/themes';
import PrivacyAndSecurity from '../../containers/privacyAndSecurity';
import './styles.scss';
import { getImg, getFileFormat } from '../../helpers';
import noAvatar from '../../images/no-avatar.png';

export default class Settings extends React.Component {
  getAvatar = () => {
    const { currentUser } = this.props;
    if (currentUser.avatar && (typeof currentUser.avatar === 'object')) {
      return window.URL.createObjectURL(currentUser.avatar);
    }
    return getImg(currentUser.avatar);
  }

  // log out

  // handleClickLogOut = () => {
  //   this.props.openPopup({
  //     message: 'Do you want to log out?',
  //     type: 'confirm',
  //     callback: () => this.handleLogOut(),
  //   });
  // }
  //
  // handleLogOut = () => {
  //   this.props.app.ws.close();
  //   this.props.app.setState({ currentUser: null });
  //   // localStorage.removeItem('user');
  //   browserHistory.push('/authentication');
  // }

  render () {
    const { currentUser } = this.props;
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
            <div className="name">{currentUser.name}</div>
            <div className="login">@{currentUser.login}</div>
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
