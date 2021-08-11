import React from 'react';

import './styles/base.scss';
import './styles/aqua.css';
import './styles/purple.css';

export default class Themes extends React.Component {
  render () {
    return (
      <div className="content settings-themes">
        <h5>Choose theme</h5>
        <ul className="theme-menu">
          <li onClick={() => this.props.app.setState({ theme: 'purple' })}>purple</li>
          <li onClick={() => this.props.app.setState({ theme: 'aqua' })}>aqua</li>
          <li onClick={() => this.props.app.setState({ theme: 'banana' })}>banana</li>
        </ul>
      </div>
    )
  }
}
