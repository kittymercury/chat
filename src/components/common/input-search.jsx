import React from 'react';

import './styles.scss';

export default class InputSearch extends React.Component {

  render () {
    const { value, onChange } = this.props;

    return (
      <div className="search-wrapper">
          <i className="fas fa-search"></i>
          <input
            autoFocus
            className="search"
            type="text"
            placeholder="Search"
            value={value}
            onChange={onChange}
          />
      </div>
    )
  }
}
