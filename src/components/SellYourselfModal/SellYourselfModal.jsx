import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

import Modal from '../LargeModal/LargeModal';
import Loader from '../Loader/Loader';
import './SellYourselfModal.scss';
import Image from '../../static/like.png';

class SellYourselfModal extends Component {
  state = {
    reason: '',
    errorMessage: '',
    operationSuccessful: false,
    inputIsValid: false
  };

  handleInputChange = event => {
    const { value } = event.target;
    const isValid = value.length >= 50 && value.length <= 500;
    this.setState({
      reason: event.target.value,
      errorMessage: '',
      inputIsValid: isValid
    });
  };

  onClose = () => {
    const { modalHandler } = this.props;
    modalHandler();
  };

  handleSubmit = async () => {
    const { id, submitHandler } = this.props;
    const { reason } = this.state;

    if (reason.trim().length < 50 || reason.trim().length > 500)
      return this.setState({
        reason: reason.trim(),
        errorMessage: 'Spaces, really?',
        inputIsValid: false
      });

    await submitHandler(id, reason);
    return this.showNotification();
  };

  showNotification = () => {
    const { error } = this.props;

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
    return this.setState({ operationSuccessful: true });
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
        onChange={this.handleInputChange}
        required
        value={reason}
      />
    </>
  );

  converToUnicode = hexValue => String.fromCodePoint(hexValue);

  render() {
    const { title, buttonLabel, modalHandler, showModal, loading } = this.props;
    const {
      reason,
      errorMessage,
      operationSuccessful,
      inputIsValid
    } = this.state;

    let progressClass;
    let feedbackText;
    const currentLength = reason.length;

    if (currentLength >= 0 && currentLength < 50) {
      progressClass = 'danger';
      feedbackText = `C'mon, don't sell yourself short!. ${this.converToUnicode(
        128527
      )}`;
    } else if (currentLength > 500) {
      progressClass = 'danger';
      feedbackText = `OK, maybe not your full CV, 10x Engineer. ${this.converToUnicode(
        128540
      )}`;
    } else {
      progressClass = 'success';
      feedbackText = `Yeah! Keep it nice, short and simple. ${this.converToUnicode(
        128076
      )}`;
    }

    return (
      <div className="container" id="sell-yourself">
        <Modal show={showModal} handleClose={modalHandler} size="small">
          {!operationSuccessful ? (
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
                <>
                  <div className="d-flex w-100 word-count justify-content-between mt-3">
                    <p className="feedback-text">{feedbackText}</p>
                    <div
                      className={`rounded-circle count-wrapper d-flex justify-content-center align-items-center ml-3 border-${progressClass} ml-3`}
                    >
                      <p className="count">{currentLength}</p>
                    </div>
                  </div>
                  <button
                    className="btn btn-primary text-uppercase apply-btn"
                    type="button"
                    onClick={this.handleSubmit}
                    disabled={!inputIsValid}
                  >
                    {buttonLabel}
                  </button>
                </>
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
  loading: false,
  error: {}
};

SellYourselfModal.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  buttonLabel: PropTypes.string.isRequired,
  submitHandler: PropTypes.func.isRequired,
  modalHandler: PropTypes.func.isRequired,
  showModal: PropTypes.bool.isRequired,
  loading: PropTypes.bool,
  error: PropTypes.instanceOf(Object)
};

export default SellYourselfModal;
