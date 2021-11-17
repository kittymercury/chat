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
      <div className="pop-up-wrapper">
        <div className="pop-up">
          {(this.props.onConfirm)
          ? (
            <div>
              <div className="pop-up-content">{message}</div>
              <div className="popup-btns">
                <div className="button-ok" onClick={onConfirm}>Yes</div>
                <div className="button-no" onClick={onClose}>Cancel</div>
              </div>
            </div>
          )
          : (
            <div>
              <div className="pop-up-content">{message}</div>
              <div className="popup-btns">
                <div className="button-ok" onClick={onClose}>Ok</div>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }
}
