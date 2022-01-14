import React from 'react';
import { browserHistory } from 'react-router';
// import { Tabs, Icon } from 'react-bulma-components';
import { Navbar, Icon } from 'react-bulma-components';
import { StyledNavbarItem } from './styles.js';


import './styles.scss';

export default class Footer extends React.Component {
  numberOfUnseenMessages = () => {
    const unseenMessages = _.filter(this.props.app.state.messages, (message) => {
      return (message.user !== this.props.app.state.currentUser.id)
        && (message.seen === false)
    });

    if (unseenMessages.length) {
      return (
        <div className="number-of-unseen-messages">+{unseenMessages.length}</div>
      )
    }
  }

  render () {
    const currentPage = window.location.pathname;

    //  || currentPage.includes('/messages')

    if ([ '/authentication', '/registration' ].includes(currentPage)) {
      return null;
    }

    return (
      <Navbar fixed="bottom" renderAs="nav" size="large">
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
      // <Tabs align="center" fullwidth="true" size="large">
      //   <Tabs.Tab renderAs="div" textColor={currentPage === '/contacts' ? 'primary' : 'text'} onClick={() => browserHistory.push('/contacts')}>
      //     <Icon>
      //       <i className="fas fa-user-friends"></i>
      //     </Icon>
      //   </Tabs.Tab>
      //   <Tabs.Tab renderAs="div" textColor={currentPage === '/chats' ? 'primary' : 'text'} onClick={() => browserHistory.push('/chats')}>
      //     <Icon>
      //       <i className="fas fa-comment"></i>
      //       {this.numberOfUnseenMessages()}
      //     </Icon>
      //   </Tabs.Tab>
      //   <Tabs.Tab renderAs="div" textColor={currentPage === '/settings' ? 'primary' : 'text'} onClick={() => browserHistory.push('/settings')}>
      //     <Icon>
      //       <i className="fas fa-cog"></i>
      //     </Icon>
      //   </Tabs.Tab>
      // </Tabs>
      // <div className="tabs is-centered is-toggle is-medium is-fullwidth">
      //   <ul>
      //     <li onClick={() => browserHistory.push('/contacts')}>
      //       <i className="fas fa-user-friends"></i>
      //     </li>
      //     <li onClick={() => browserHistory.push('/chats')}>
      //       <i className="far fa-comment"></i>
      //       {this.numberOfUnseenMessages()}
      //     </li>
      //     <li onClick={() => browserHistory.push('/settings')}>
      //       <i className="fas fa-cog"></i>
      //     </li>
      //   </ul>
      // </div>
    )
  }
}
