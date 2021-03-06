import React from 'react';
import { Modal, Button } from 'react-bulma-components';

import styled from 'styled-components';

const StyledModal = styled(Modal)`
  .modal-close {
    display: none;
  }

  .modal-card {
    max-width: 70%;
    min-height: 30%;
    border-radius: 10px;

    section.modal-card-body {
      text-align: center;
      font-size: 20px;
      font-weight: bold;
    }

    footer.modal-card-foot {
      justify-content: space-evenly;
    }
  }
`;

export default class PopUp extends React.Component {
  handleClickConfirm = () => {
    this.props.callback();
    this.props.closePopup();
  }

  renderPlainPopup = () => {
    if (!this.props.type) {
      return (
        <Modal.Card>
          <Modal.Card.Body>{this.props.message}</Modal.Card.Body>
          <Modal.Card.Footer>
            <Button onClick={this.props.closePopup}>Ok</Button>
          </Modal.Card.Footer>
        </Modal.Card>
      )
    }
  }

  renderConfirmPopup = () => {
    if (this.props.type === 'confirm') {
      return (
        <Modal.Card>
          <Modal.Card.Body>{this.props.message}</Modal.Card.Body>
          <Modal.Card.Footer>
            <Button color="primary" onClick={this.handleClickConfirm}>Yes</Button>
            <Button color="danger" onClick={this.props.closePopup}>Cancel</Button>
          </Modal.Card.Footer>
        </Modal.Card>
      )
    }
  }

  render () {
    if (!this.props.visible) return null;

    return (
      <StyledModal className="main" show="true">
        {this.renderPlainPopup()}
        {this.renderConfirmPopup()}
      </StyledModal>
    )
  }
}
