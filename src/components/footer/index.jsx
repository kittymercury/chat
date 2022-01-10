import React from 'react';
import { browserHistory } from 'react-router';
import { Tabs, Icon } from 'react-bulma-components';

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

    if ([ '/authentication', '/registration' ].includes(currentPage)) {
      return null;
    }

    return (
      <Tabs align="center" fixed="bottom" fullwidth="true" size="large">
        <Tabs.Tab textColor={currentPage === '/contacts' ? 'primary' : 'text'} onClick={() => browserHistory.push('/contacts')}>
          <Icon>
            <i className="fas fa-user-friends"></i>
          </Icon>
        </Tabs.Tab >
        <Tabs.Tab textColor={currentPage === '/chats' ? 'primary' : 'text'} onClick={() => browserHistory.push('/chats')}>
          <Icon>
            <i className="fas fa-comment"></i>
            {this.numberOfUnseenMessages()}
          </Icon>
        </Tabs.Tab>
        <Tabs.Tab textColor={currentPage === '/settings' ? 'primary' : 'text'} onClick={() => browserHistory.push('/settings')}>
          <Icon>
            <i className="fas fa-cog"></i>
          </Icon>
        </Tabs.Tab>
      </Tabs>
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
