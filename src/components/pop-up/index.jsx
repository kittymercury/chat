import React from 'react';

import './styles.scss';

export default class PopUp extends React.Component {
  render () {
    const { onClose, message } = this.props;
    const onConfirm = () => {
      this.props.onConfirm();
      this.props.onClose();
    }

    return (
      <div className="pop-up">
        {(this.props.onConfirm)
          ? (
            <div>
              <div className="pop-up-content">{message}</div>
              <button className="button-ok" onClick={onConfirm}>Yes</button>
              <button className="button-no" onClick={onClose}>Cancel</button>
            </div>
          )
          : (
            <div>
              <div className="pop-up-content">{message}</div>
              <button className="button-ok" onClick={onClose}>Ok</button>
            </div>
          )}
      </div>
    )
  }
}
