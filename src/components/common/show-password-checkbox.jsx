import React from 'react';

import './styles.scss';

export default class ShowPasswordCheckbox extends React.Component {
  render () {
    return (
      <div className="checkbox-wrapper">
        <input
          type="checkbox"
          id="checkbox"
          onChange={this.props.onChangeShowPassword}
          checked={this.props.isPasswordVisible}
        />
        <span className="show-password">Show password</span>
      </div>
    )
  }
}
