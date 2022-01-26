import React from 'react';
import { browserHistory } from 'react-router';
import { Navbar, Heading, Icon } from 'react-bulma-components';
import lodash from 'lodash';

import DropdownSettings from '../../containers/dropdownSettings';
import DropdownMessages from '../../containers/dropdownMessages';

import * as ActionHelpers from '../../actions/helpers';
import { getImg } from '../../helpers';
import noAvatar from '../../images/no-avatar.png';
import { DELETED_USERNAME } from '../../constants';
import './styles.scss';

export default class Header extends React.Component {
  handleClickSearch = () => {
    const page = this.props.location.pathname.split('/')[1];

    this.props.openSearch({ page });
  }

  cancelForwardMessage = () => {
    // this.props.cancelForward();
    browserHistory.goBack();
  }


  handleSaveProfileChanges = async () => {
    const { name, login, avatar } = this.props.profile;
    const { currentUser } = this.props;

    const data = await ActionHelpers.updateCurrentUser({ name, login, avatar }, currentUser.id);
    this.props.updateCurrentUser(data);

    browserHistory.push('/settings');
  }

  handleCancelProfileChanges = () => {
    // logics that clears inputs name and logic
    browserHistory.push('/settings');
  }

  renderButton = (button) => {
    switch (button.name) {
      case 'invisible':
        return <Navbar.Item key={button.name}></Navbar.Item>
      case 'turn-off-select-mode':
        return <Navbar.Item key={button.name} onClick={() => this.props.turnOffSelectMode()}>Cancel</Navbar.Item>
      case 'number-of-selected-messages':
        const number = this.props.settings.selectedMessages.length;
        return (
          <Navbar.Item style={{ flex: '1' }} key={button.name} className="number-of-selected-messages">
            {number} {number !== 1 ? 'messages' : 'message'} selected
          </Navbar.Item>
        )
      case 'search':
        return (
          <Navbar.Item key={button.name} className="search" onClick={this.handleClickSearch}>
            <i className="fas fa-search"></i>
          </Navbar.Item>
        );
      case 'back':
        return (
          <Navbar.Item key={button.name} className="back" onClick={() => browserHistory.push('/chats')}>
            <i className="fas fa-angle-left"></i>
            <span>Back</span>
          </Navbar.Item>
        );
      case 'settings':
        return (
          <Navbar.Item key={button.name}>
            <DropdownSettings />
          </Navbar.Item>
        );
      case 'messages':
        return (
          <Navbar.Item className="avatar-in-msgs" key={button.name}>
            <DropdownMessages label={this.props.header.avatar}/>
          </Navbar.Item>
        );
      case 'cancel-profile':
        return <Navbar.Item key={button.name} onClick={this.handleCancelProfileChanges}>Cancel</Navbar.Item>;
      case 'save-profile':
        return <Navbar.Item key={button.name} onClick={this.handleSaveProfileChanges}>Save</Navbar.Item>;
      case 'cancel-forward':
        return <Navbar.Item key={button.name} onClick={this.cancelForwardMessage}>Cancel</Navbar.Item>;
      case 'number-of-messages-to-forward':
        const numberOfMessagesToForward = this.props.settings.selectedMessages.length;
        return (
          <Navbar.Item style={{ flex: '1' }} key={button.name}>
            <span>{numberOfMessagesToForward} {numberOfMessagesToForward !== 1 ? 'messages' : 'message'} selected</span>
          </Navbar.Item>
        )
    }
  }

  renderButtonsLeft = () => {
    return _.map(this.props.header.buttons.left, button => this.renderButton(button));
  }

  renderButtonsRight = () => {
    return _.map(this.props.header.buttons.right, button => this.renderButton(button));
  }

  renderTitle = () => {
    if (!this.props.header.title) return null;
    const page = this.props.location.pathname.split('/')[1];
    if (['messages', 'contact-info'].includes(page)) {
      return (
        <Navbar.Item className="page-title user-info" fullhd={{ display: 'flex', alignItems: 'center' }}>
          <div>{this.props.header.title}</div>
          <div>{this.props.header.subtitle}</div>
        </Navbar.Item>
      )
    }

    return (
      <Navbar.Item className="page-title" fullhd={{ display: 'flex', alignItems: 'center' }}>
        <Heading size="4">{this.props.header.title}</Heading>
      </Navbar.Item>
    )
  }

  render() {
    if (!this.props.header.visible) return null;

    return (
      <Navbar className="header" renderAs="nav" style={{ top: 0 }}>
        {this.renderButtonsLeft()}
        {this.renderTitle()}
        {this.renderButtonsRight()}
      </Navbar>
    )
  }
}
