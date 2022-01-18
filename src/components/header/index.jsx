import React from 'react';
import { browserHistory } from 'react-router';
import { Navbar, Heading, Icon } from 'react-bulma-components';
import lodash from 'lodash';

import DropdownSettings from '../../containers/dropdownSettings';
import DropdownMessages from '../dropdownMessages';

import { getImg } from '../../helpers';
import { DELETED_USERNAME } from '../../constants';
import './styles.scss';

export default class Header extends React.Component {
  handleClickSearch = () => {
    const page = this.props.location.pathname.split('/')[1];

    this.props.openSearch({ page });
  }

  handleCancelForwarding = () => {
    const { messageToForward, selectedMessages } = this.props.app.state;

    if (messageToForward) {
      this.props.app.setState({ messageToForward: null });
    }

    if (selectedMessages) {
      browserHistory.goBack();
    }
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
        return <Navbar.Item key={button.name}>Cancel</Navbar.Item>;

      case 'save-profile':
        // return <Navbar.Item key={button.name} onClick={this.handleSubmit}>Save</Navbar.Item>;
        return <Navbar.Item key={button.name}>Save</Navbar.Item>;
    }
  }

  renderButtonsLeft = () => {
    return this.props.buttons.left.map((button) => {
      return this.renderButton(button);
    })
  }

  renderButtonsRight = () => {
    return this.props.buttons.right.map((button) => {
      return this.renderButton(button);
    })
  }

  renderTitle = () => {
    return (
      <Navbar.Item className="page-title" fullhd={{ display: 'flex', alignItems: 'center' }}>
        <Heading size="4">{this.props.title}</Heading>
      </Navbar.Item>
    )
  }

  render() {
    console.log({ headerProps: this.props });
    if (!this.props.visible) return null;

    return (
      <Navbar className="header" renderAs="nav" style={{ top: 0 }}>
        {this.renderButtonsLeft()}
        {this.renderTitle()}
        {this.renderButtonsRight()}
      </Navbar>
    )
  }
}
