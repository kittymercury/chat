import React from 'react';

import './styles.scss';

export default class InputSearch extends React.Component {

  render () {
    const { value, onChange, onCancel } = this.props;

    return (
      <div className="search-wrapper">
        <div>
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
        <div className="cancel-searching" onClick={onCancel}>Cancel</div>
      </div>
    )
  }
}
