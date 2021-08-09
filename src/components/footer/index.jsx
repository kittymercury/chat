import React from 'react';
import './styles/base.css';
import './styles/aqua.css';
import './styles/purple.css';

export default class Footer extends React.Component {
  render () {
    return (
      <div className="footer">
        <button onClick={() => this.props.onButtonClick('Contacts')}>
          <i className="far fa-address-book"></i>
        </button>
        <button onClick={() => this.props.onButtonClick('Chats')}>
          <i className="far fa-comments"></i>
        </button>
        <button onClick={() => this.props.onButtonClick('Settings')}>
          <i className="fas fa-cog"></i>
        </button>
      </div>
    )
  }
}
