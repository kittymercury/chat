import React from 'react';
import { browserHistory } from 'react-router';

import './styles/base.scss';
import './styles/aqua.css';
import './styles/purple.css';

export default class Footer extends React.Component {
  render () {
    const currentPage = window.location.pathname;

    if ([ '/authentication', '/registration' ].includes(currentPage)) {
      return null;
    }

    return (
      <div className="footer">
        <button onClick={() => browserHistory.push('/contacts')}>
          <i className="far fa-address-book"></i>
        </button>
        <button onClick={() => browserHistory.push('/chats')}>
          <i className="far fa-comments"></i>
        </button>
        <button onClick={() => browserHistory.push('/settings')}>
          <i className="fas fa-cog"></i>
        </button>
      </div>
    )
  }
}
