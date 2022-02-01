import React from 'react';
import { browserHistory } from 'react-router';
import { Navbar, Icon } from 'react-bulma-components';

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
        <span className="number-of-unseen-messages">
          {unseenMessages.length <= 10
            ? unseenMessages.length
            : '10+'
          }
        </span>
      )
    }
  }

  render () {
    if (!this.props.footer.visible) return null;
    const currentPage = this.props.location.pathname.split('/')[1];
    const theme = this.props.settings.theme;

    return (
      <Navbar className="footer" renderAs="nav" size="large" style={{ bottom: 0 }}>
        <Navbar.Item
          renderAs="div"
          theme={theme}
          active={currentPage === 'contacts'}
          onClick={() => browserHistory.push('/contacts')}
        >
          <Icon size="medium">
            <i className="fas fa-user-friends"></i>
          </Icon>
        </Navbar.Item>
        <Navbar.Item
          renderAs="div"
          theme={theme}
          active={currentPage === 'chats'}
          onClick={() => browserHistory.push('/chats')}
        >
          <Icon size="medium">
            <i className="fas fa-comment"></i>
            {this.numberOfUnseenMessages()}
          </Icon>
        </Navbar.Item>
        <Navbar.Item
          renderAs="div"
          theme={theme}
          active={currentPage === 'settings'}
          onClick={() => browserHistory.push('/settings')}
        >
          <Icon size="medium">
            <i className="fas fa-cog"></i>
          </Icon>
        </Navbar.Item>
      </Navbar>
    )
  }
}
