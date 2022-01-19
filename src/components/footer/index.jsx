import React from 'react';
import { browserHistory } from 'react-router';
import { Navbar, Icon } from 'react-bulma-components';

import { StyledNavbarItem } from './styles.js';

import './styles.scss';

export default class Footer extends React.Component {
  numberOfUnseenMessages = () => {
    const { messages, currentUser } = this.props;
    const unseenMessages = _.filter(messages, (message) => {
      return (message.user !== currentUser.id)
        && (message.seen === false)
    });

    if (unseenMessages.length) {
      return (
        <div className="number-of-unseen-messages">+{unseenMessages.length}</div>
      )
    }
  }

  render () {
    const currentPage = this.props.location.pathname.split('/')[1];

    //  || currentPage.includes('/messages')

    if ([ '/authentication', '/registration' ].includes(currentPage)) {
      return null;
    }

    return (
      <Navbar className="footer-nav" renderAs="nav" size="large" style={{ bottom: 0 }}>
        <StyledNavbarItem renderAs="div" active={currentPage === '/contacts'} onClick={() => browserHistory.push('/contacts')}>
          <Icon size="medium">
            <i className="fas fa-user-friends"></i>
          </Icon>
        </StyledNavbarItem>
        <StyledNavbarItem renderAs="div" active={currentPage === '/chats'} onClick={() => browserHistory.push('/chats')}>
          <Icon size="medium">
            <i className="fas fa-comment"></i>
            {this.numberOfUnseenMessages()}
          </Icon>
        </StyledNavbarItem>
        <StyledNavbarItem renderAs="div" active={currentPage === '/settings'} onClick={() => browserHistory.push('/settings')}>
          <Icon size="medium">
            <i className="fas fa-cog"></i>
          </Icon>
        </StyledNavbarItem>
      </Navbar>
    )
  }
}
