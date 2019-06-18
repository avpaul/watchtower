import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './genericModal.css';

class GenericModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      success: false
    };
  }

  renderButton = ({ label, buttonProps = {} }) => (
    <button type="button" className="btn" {...buttonProps}>
      {label}
    </button>
  );

  handleClose = () => {
    const { handleClose } = this.props;
    this.setState({ success: false }, handleClose);
  };

  handleSubmit = () => {
    const { handleSubmit } = this.props;
    this.setState({ success: handleSubmit() });
  };

  renderModalFooter = () => {
    const { success } = this.state;
    const buttonProps = { 'data-dismiss': 'modal', onClick: this.handleClose };
    return (
      <div className="modal-footer">
        {this.renderButton({ label: 'Cancel', buttonProps })}
        {!success
          ? this.renderButton({
              label: 'Add',
              buttonProps: { onClick: this.handleSubmit }
            })
          : this.renderButton({ label: 'Save', buttonProps })}
      </div>
    );
  };

  renderBody = () => {
    const { children, successMessage } = this.props;
    const { success } = this.state;
    return (
      <div className="modal-body">
        <div className="row mr-0 ml-0">
          {children}
          {success ? (
            <span className="alert alert-success" role="alert">
              {successMessage}
            </span>
          ) : null}
        </div>
      </div>
    );
  };

  render() {
    const { id, title } = this.props;
    return (
      <div
        className="modal fade generic-modal"
        id={id}
        role="dialog"
        aria-labelledby={id}
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h1>{title}</h1>
            </div>
            {this.renderBody()}
            {this.renderModalFooter()}
          </div>
        </div>
      </div>
    );
  }
}

GenericModal.propTypes = {
  id: PropTypes.string.isRequired,
  children: PropTypes.shape().isRequired,
  title: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleClose: PropTypes.func,
  successMessage: PropTypes.string
};

GenericModal.defaultProps = {
  handleClose: () => {},
  successMessage: 'Success!'
};

export default GenericModal;
