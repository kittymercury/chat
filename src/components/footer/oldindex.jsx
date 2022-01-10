import React from 'react';
import { browserHistory } from 'react-router';

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
      <div className="tabs is-centered is-toggle is-medium is-fullwidth">
        <ul>
          <li onClick={() => browserHistory.push('/contacts')}>
            <i className="fas fa-user-friends"></i>
          </li>
          <li onClick={() => browserHistory.push('/chats')}>
            <i className="far fa-comment"></i>
            {this.numberOfUnseenMessages()}
          </li>
          <li onClick={() => browserHistory.push('/settings')}>
            <i className="fas fa-cog"></i>
          </li>
        </ul>
      </div>
    )
  }
}
