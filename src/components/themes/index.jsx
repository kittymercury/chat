import React from 'react';

import './styles.scss';

export default class Themes extends React.Component {
  handleSelectTheme = (id) => {
    this.props.app.setState({ theme: id });
  }

  renderCheck = (state, prop) => {
    if (state === prop) {
      return <i className="fas fa-check"></i>
    }
  }

  render() {
    return (
      <div className={`change-theme ${this.props.activeMenuItem === 'change-theme' ? 'active' : ''}`}>
        <div className="headline" onClick={() => this.props.onClick('change-theme')}>
          <span>Themes</span>
          <i className="fas fa-angle-down"></i>
        </div>
        <div className="submenu">
          <div className="theme" onClick={() => this.handleSelectTheme('dark')}>
            <span>Dark</span>
            {this.renderCheck(this.props.app.state.theme, 'dark')}
          </div>
          <div className="theme" onClick={() => this.handleSelectTheme('purple')}>
            <span>Purple</span>
            {this.renderCheck(this.props.app.state.theme, 'purple')}
          </div>
          <div className="theme" onClick={() => this.handleSelectTheme('banana')}>
            <span>Banana</span>
            {this.renderCheck(this.props.app.state.theme, 'banana')}
          </div>
        </div>
      </div>
    )
  }
}
