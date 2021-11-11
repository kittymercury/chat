import React from 'react';
import { lock, unlock } from 'tua-body-scroll-lock';

import './styles.scss';

export default class InputSearch extends React.Component {
  componentDidMount = () => {
    const searchWrapper = document.querySelector('.search-wrapper');
    lock(searchWrapper);
  }

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
