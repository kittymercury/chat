import React from 'react';
import './styles/base.css';
import './styles/aqua.css';
import './styles/purple.css';

export default class SettingsThemes extends React.Component {
  render () {
    return (
      <div className="content settings-themes">
        <h5>Choose theme</h5>
        <ul className="theme-menu">
          <li onClick={() => this.props.onClick('purple')}>purple</li>
          <li onClick={() => this.props.onClick('aqua')}>aqua</li>
        </ul>
      </div>
    )
  }
}
