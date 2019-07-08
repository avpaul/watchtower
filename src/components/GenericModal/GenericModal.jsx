/* eslint-disable react/no-did-update-set-state */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './genericModal.scss';
import Loader from '../Loader/Loader';

class GenericModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      success: false
    };
  }

  componentDidUpdate(prevProps) {
    const { success } = this.props;
    if (prevProps.success !== success) this.setState({ success });
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
    const { submitLoading, footer } = this.props;

    if (footer) return footer;

    const buttonProps = { 'data-dismiss': 'modal', onClick: this.handleClose };
    let button = null;
    switch (true) {
      case submitLoading:
        button = <Loader size="small" />;
        break;
      case success:
        button = this.renderButton({ label: 'Save', buttonProps });
        break;
      default:
        button = this.renderButton({
          label: 'Add',
          buttonProps: { onClick: this.handleSubmit }
        });
    }

    return (
      <div className="modal-footer">
        {this.renderButton({ label: 'Cancel', buttonProps })}
        {button}
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
        <div
          className={`modal-dialog modal-dialog-centered ${
            id === 'addRoleModal' ? 'modal-lg' : ''
          }`}
          role="document"
        >
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
  handleSubmit: PropTypes.func,
  handleClose: PropTypes.func,
  successMessage: PropTypes.string,
  success: PropTypes.bool,
  submitLoading: PropTypes.bool,
  footer: PropTypes.shape()
};

GenericModal.defaultProps = {
  handleClose: () => {},
  handleSubmit: () => {},
  successMessage: 'Success!',
  success: false,
  submitLoading: false,
  footer: null
};

export default GenericModal;
