import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

import Modal from '../LargeModal/LargeModal';
import Loader from '../Loader/Loader';
import './SellYourselfModal.scss';
import Image from '../../static/like.png';

class SellYourselfModal extends Component {
  state = {
    reason: null,
    errorMessage: '',
    isSuccess: false
  };

  handleInputChange = event => {
    this.setState({
      reason: event.target.value,
      errorMessage: ''
    });
  };

  onClose = () => {
    const { modalHandler } = this.props;
    modalHandler();
  };

  handleSubmit = async () => {
    const { id, submitHandler } = this.props;
    const { reason } = this.state;
    await submitHandler(id, reason);
    this.showNotification();
  };

  showNotification = () => {
    const {
      certificationApplication: { error }
    } = this.props;
    if (error) {
      const errorToDisplay = error.reason_for_applying
        ? error.reason_for_applying[0]
        : error;
      this.setState({ errorMessage: errorToDisplay });

      return toast.error(errorToDisplay, {
        autoClose: 1500,
        closeButton: false,
        pauseOnHover: false,
        hideProgressBar: true
      });
    }
    return this.setState({ isSuccess: true });
  };

  renderSuccessNotification = () => (
    <div className="success_application">
      <p className="success_title">Great! Thank You For Applying</p>
      <img className="success__image" src={Image} alt="..." />
      <p className="success__sutitle">You should hear from us shortly</p>
    </div>
  );

  renderFormBody = (title, reason) => (
    <>
      <p className="form-header">Apply for {title} certification</p>
      <p className="form-title">
        Sell yourself in one sentence [500 characters max]
      </p>
      <textarea
        className="form-control"
        value={reason}
        onChange={this.handleInputChange}
        required
      />
    </>
  );

  render() {
    const {
      title,
      buttonLabel,
      modalHandler,
      showModal,
      certificationApplication: { loading }
    } = this.props;
    const { reason, errorMessage, isSuccess } = this.state;

    return (
      <div className="container" id="sell-yourself">
        <Modal show={showModal} handleClose={modalHandler} size="small">
          {!isSuccess ? (
            <>
              {this.renderFormBody(title, reason)}
              {errorMessage && (
                <span className="error-message text-danger">
                  {errorMessage}
                </span>
              )}
              {loading ? (
                <Loader size="small" />
              ) : (
                <button
                  className="btn btn-primary text-uppercase apply-btn"
                  type="button"
                  onClick={this.handleSubmit}
                >
                  {buttonLabel}
                </button>
              )}
            </>
          ) : (
            this.renderSuccessNotification()
          )}
        </Modal>
      </div>
    );
  }
}

SellYourselfModal.defaultProps = {
  certificationApplication: {
    loading: false,
    error: '',
    data: {}
  }
};

SellYourselfModal.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  buttonLabel: PropTypes.string.isRequired,
  submitHandler: PropTypes.func.isRequired,
  modalHandler: PropTypes.func.isRequired,
  showModal: PropTypes.bool.isRequired,
  certificationApplication: PropTypes.shape({
    loading: PropTypes.bool,
    error: PropTypes.object,
    data: PropTypes.object
  })
};

export default SellYourselfModal;
