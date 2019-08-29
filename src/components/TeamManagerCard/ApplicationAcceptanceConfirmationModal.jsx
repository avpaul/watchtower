import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loader from '../Loader/Loader';
import Modal from '../LargeModal/LargeModal';
import Image from '../../static/like.png';
import errorImage from '../../static/red-report.png';
import './ApplicantCard.scss';

class ApplicationAcceptanceConfirmationModal extends Component {
  state = {
    successOpen: false
  };

  /**
   * toggle acceptance modal
   */
  toggle = () => {
    const { toggleModal } = this.props;
    toggleModal();
  };

  /**
   * handle click on accept button
   */
  applicationAcceptanceHandler = () => {
    const { acceptApplication, applicationId, showSuccess } = this.props;
    acceptApplication(applicationId);
    showSuccess();
    this.setState({ successOpen: true });
  };

  /**
   * close modal for successful or errored response
   */
  closeSuccessModal = () => {
    const { hideConfirmationResponse } = this.props;
    this.setState({ successOpen: false });
    this.toggle();
    hideConfirmationResponse();
  };

  /**
   * Handle occupied and remaining slots
   */

  handleSlots = (slots, role) =>
    slots === 0 ? (
      <p>Congratulation! you have filled all slots for {role} vacancy.</p>
    ) : (
      <p>
        You have{' '}
        <strong>
          {slots.active} active {slots.active > 1 ? `${role}s` : `${role}`}
        </strong>{' '}
        and{' '}
        <strong>
          {' '}
          {slots.remaining} remaining {slots.remaining > 1 ? 'slots' : 'slot'}
        </strong>{' '}
        for this vacancy.
      </p>
    );

  /**
   * show acceptance modal data
   */
  renderAcceptanceModal = () => {
    const { role, projectName, name, loading } = this.props;
    return (
      <div className="text-right">
        <p>
          Are you sure you want to accept {name} as {role} to {projectName}?
        </p>
        {loading ? (
          <Loader size="small" />
        ) : (
          <div className="text-white mt-5">
            <button
              type="button"
              onClick={this.applicationAcceptanceHandler}
              className="btn accepting-btns mr-4 py-2 text-uppercase px-4 accept-btn"
            >
              {' '}
              Accept{' '}
            </button>
            <button
              type="button"
              onClick={this.toggle}
              className="btn accepting-btns btn-secondary text-uppercase py-2 px-4 reject-btn"
            >
              {' '}
              Cancel{' '}
            </button>
          </div>
        )}
      </div>
    );
  };

  /**
   * show response of accept request
   */
  renderSuccessMessage = () => {
    const { name, error, loading, slots, role } = this.props;
    return (
      <>
        {loading ? (
          <Loader size="small" />
        ) : (
          <div className="success_application">
            {error ? (
              <>
                <img className="success__image" src={errorImage} alt="..." />
                <p className="success_title my-4">{error}</p>
                <button
                  type="button"
                  onClick={this.closeSuccessModal}
                  className="close-response"
                >
                  Close
                </button>
              </>
            ) : (
              <>
                <p className="success_title">
                  Great! You have added {name} to your team
                </p>
                {this.handleSlots(slots, role)}
                <img className="success__image" src={Image} alt="..." />
                <div className="mb-4" />
                <button
                  type="button"
                  onClick={this.closeSuccessModal}
                  className="close-response success-res"
                >
                  Continue
                </button>
              </>
            )}
          </div>
        )}
      </>
    );
  };

  render() {
    const { openModal, acceptanceSuccess } = this.props;

    const { successOpen } = this.state;

    return (
      <Modal
        handleClose={this.toggle}
        show={openModal}
        showBtn={false}
        size="small"
      >
        {acceptanceSuccess
          ? successOpen && this.renderSuccessMessage()
          : this.renderAcceptanceModal()}
      </Modal>
    );
  }
}

ApplicationAcceptanceConfirmationModal.propTypes = {
  hideConfirmationResponse: PropTypes.func.isRequired,
  toggleModal: PropTypes.func.isRequired,
  acceptApplication: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  applicationId: PropTypes.number.isRequired,
  showSuccess: PropTypes.func.isRequired,
  role: PropTypes.string.isRequired,
  slots: PropTypes.instanceOf(Object).isRequired,
  projectName: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  error: PropTypes.string.isRequired,
  openModal: PropTypes.bool.isRequired,
  acceptanceSuccess: PropTypes.bool.isRequired
};

export default ApplicationAcceptanceConfirmationModal;
