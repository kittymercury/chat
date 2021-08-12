import React from 'react';

import './styles.scss';

export default class Themes extends React.Component {
  render () {
    return (
      <div className="content settings-themes">
        <h5>Choose theme</h5>
        <ul className="theme-menu">
          <li onClick={() => this.props.app.setState({ theme: 'purple' })}>purple</li>
          <li onClick={() => this.props.app.setState({ theme: 'dark' })}>dark</li>
          <li onClick={() => this.props.app.setState({ theme: 'banana' })}>banana</li>
        </ul>
      </div>
    )
  }
}
