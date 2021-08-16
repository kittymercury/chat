import React from 'react';

import './styles.scss';

export default class Themes extends React.Component {
  constructor(props) {
    super(props);

    this.state = { active: null }
  }

  handleSelectTheme = (id) => {
    this.props.app.setState({ theme: id });
    this.setState({ active: id });
  }

  render() {
    const { active } = this.state;

    return (
      <div className={`change-theme ${this.props.activeMenuItem === 'change-theme' ? 'active' : ''}`}>
        <div className="headline" onClick={() => this.props.onClick('change-theme')}>Themes
          <i className="fas fa-angle-down"></i>
        </div>
        <div className="submenu">
          <div className={`theme ${this.state.active === 'dark' ? 'active' : ''}`} onClick={() => this.handleSelectTheme('dark')}>Dark</div>
          <div className={`theme ${this.state.active === 'purple' ? 'active' : ''}`} onClick={() => this.handleSelectTheme('purple')}>Purple</div>
          <div className={`theme ${this.state.active === 'banana' ? 'active' : ''}`} onClick={() => this.handleSelectTheme('banana')}>Banana</div>
        </div>
      </div>
    )
  }
}
