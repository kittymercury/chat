import React from 'react';
import { browserHistory } from 'react-router';
import { Navbar, Heading, Icon } from 'react-bulma-components';
import lodash from 'lodash';

import DropdownSettings from '../../containers/dropdownSettings';
import DropdownMessages from '../dropdownMessages';

import * as ActionHelpers from '../../actions/helpers';
import { getImg } from '../../helpers';
import { DELETED_USERNAME } from '../../constants';
import './styles.scss';

export default class Header extends React.Component {
  handleClickSearch = () => {
    const page = this.props.location.pathname.split('/')[1];

    this.props.openSearch({ page });
  }

  handleCancelForwarding = () => {
    const { messageToForward, selectedMessages } = this.props;

    if (messageToForward) {
      this.props.cancelForwardMessage();
    }

    if (selectedMessages) {
      browserHistory.goBack();
    }
  }

  // moved from Profile

  handleSaveProfileChanges = async () => {
    const { name, login, avatar } = this.props.profile;
    const { currentUser } = this.props;
    console.log(this.props);

    const data = await ActionHelpers.updateCurrentUser({ name, avatar }, currentUser.id);
    console.log({data});
    this.props.updateCurrentUser(data);

    // this.props.app.handleSubmitUser({
    //   name: this.state.name,
    //   login: this.state.login,
    //   avatar: this.state.avatar,
    // })
    browserHistory.push('/settings');
  }

  renderButton = (button) => {
    switch (button.name) {
      case 'invisible':
        return <Navbar.Item key={button.name}></Navbar.Item>
      case 'search':
        return (
          <Navbar.Item key={button.name} className="search" onClick={this.handleClickSearch}>
            <i className="fas fa-search"></i>
          </Navbar.Item>
        );
      case 'back':
        return (
          <Navbar.Item key={button.name} className="back" onClick={() => browserHistory.goBack()}>
            <i className="fas fa-angle-left"></i>
            <span>Back</span>
          </Navbar.Item>
        );
      case 'settings':
        return <DropdownSettings key={button.name} />;
      case 'messages':
        return <DropdownMessages key={button.name} />;
      case 'cancel-profile':
        // return <Navbar.Item key={button.name} onClick={() => this.props.toggleEditProfileMode({ isEditMode: false })}>Cancel</Navbar.Item>;
        return <Navbar.Item key={button.name} onClick={() => browserHistory.push('/settings')}>Cancel</Navbar.Item>;
      case 'save-profile':
        return <Navbar.Item key={button.name} onClick={this.handleSaveProfileChanges}>Save</Navbar.Item>;
      case 'cancel-forward':
        return <Navbar.Item key={button.name} onClick={this.handleCancelForwarding}>Cancel</Navbar.Item>;
      case 'number-of-messages-to-forward':
        const { selectedMessages } = this.props;
        return (
          <Navbar.Item key={button.name}>
            <span>Forward {selectedMessages.length} {selectedMessages.length > 1 ? 'messages' : 'message'}</span>
          </Navbar.Item>
        )
    }
  }

  renderButtonsLeft = () => {
    return this.props.header.buttons.left.map((button) => {
      return this.renderButton(button);
    })
  }

  renderButtonsRight = () => {
    return this.props.header.buttons.right.map((button) => {
      return this.renderButton(button);
    })
  }

  renderTitle = () => {
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
