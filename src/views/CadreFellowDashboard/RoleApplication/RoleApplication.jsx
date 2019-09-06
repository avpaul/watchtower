import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GenericModal from '../../../components/GenericModal';
import successImage from '../../../static/like.png';
import Loader from '../../../components/Loader/Loader';
import FormInputs from '../../../components/FormInputs';
import './RoleApplication.scss';

class RoleApplication extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputs: {},
      success: false,
      errorMessage: '',
      currentLength: 0,
      isValidLength: false
    };
  }

  componentDidUpdate(prevProps) {
    const { applications } = this.props;
    if (
      (prevProps.applications.loading !== applications.loading &&
        prevProps.applications.data !== applications.data) ||
      prevProps.applications.error !== applications.error
    ) {
      this.applicationStatus(applications);
    }
  }

  applicationStatus = applications => {
    const { error } = applications;

    if (!error) {
      this.setState({ success: true });
    } else if (error && error.application_reason) {
      const { application_reason: reason } = error;
      this.setState({ errorMessage: reason[0] });
    } else if (error && error === 'You have an active role') {
      this.setState({
        errorMessage: error,
        isValidLength: false
      });
    }
  };

  handleSubmit = () => {
    const { applyForRole, roleId, projectId, cycleId } = this.props;
    const {
      inputs: { description }
    } = this.state;

    const currentValue = description.getValue();
    const data = {
      application_reason: currentValue,
      cycle_id: cycleId
    };

    if (!this.evaluateLength(currentValue.trim())) {
      return this.setState({
        errorMessage: 'Spaces, really?',
        isValidLength: false
      });
    }

    return applyForRole(Number(projectId), Number(roleId), data);
  };

  handleClose = () => {
    const { history, roleId } = this.props;
    this.setState({ success: false });
    history.replace(`${roleId}`);
  };

  renderButton = ({ label, buttonProps = {} }) => (
    <button type="button" className="btn" {...buttonProps}>
      {label}
    </button>
  );

  footer = (success, button) => (
    <div className="modal-footer">
      {success
        ? ''
        : this.renderButton({
            label: 'Cancel',
            buttonProps: {
              'data-dismiss': 'modal'
            }
          })}
      {button}
    </div>
  );

  evaluateLength = value => {
    const isValidLength = value.length >= 50 && value.length <= 500;
    this.setState({
      isValidLength,
      currentLength: value.length,
      errorMessage: ''
    });
    return isValidLength;
  };

  sendApplicationButton = () => {
    const { success, isValidLength } = this.state;
    const { applications } = this.props;
    let button = this.renderButton({
      label: 'Send Application',
      buttonProps: {
        onClick: this.handleSubmit,
        id: 'applicationBtn',
        disabled: !isValidLength
      }
    });
    if (success) {
      button = this.renderButton({
        label: 'Close',
        buttonProps: {
          onClick: this.handleClose,
          'data-dismiss': 'modal'
        }
      });
    }

    return applications.loading ? (
      <Loader size="small" />
    ) : (
      this.footer(success, button)
    );
  };

  converToUnicode = hexValue => String.fromCodePoint(hexValue);

  renderBody = () => {
    const { roleInfo } = this.props;
    const { success, errorMessage, currentLength } = this.state;
    const applicationUnits = {
      subtitle: `You are applying as a ${roleInfo.name}`,
      selfAdvocateTitle: `Sell yourself [500 characters max]`,
      successTitle: 'Great! Thank you for applying',
      successSutitle: 'You should hear from us shortly'
    };

    let progressClass;
    let feedbackText;

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
      <React.Fragment>
        {success ? (
          <div className="success__application">
            <p className="success__title">{applicationUnits.successTitle}</p>
            <img className="success__image" src={successImage} alt="..." />
            <p className="success__sutitle">
              {applicationUnits.successSutitle}
            </p>
          </div>
        ) : (
          <>
            <div className="advocacy">
              <p className="advocacy__label">{applicationUnits.subtitle}</p>
              <p className="advocacy__subtitle">
                {applicationUnits.selfAdvocateTitle}
              </p>
              <FormInputs.TextInput
                parent={this}
                name="description"
                type="textarea"
                testInput={this.evaluateLength}
              />
              {errorMessage && (
                <span className="error-message text-danger">
                  {errorMessage}
                </span>
              )}
            </div>
            <div className="d-flex w-100 word-count justify-content-between">
              <p className="feedback-text">{feedbackText}</p>
              <div
                className={`rounded-circle count-wrapper d-flex justify-content-center align-items-center ml-3 border-${progressClass} ml-3`}
              >
                <p className="count">{currentLength}</p>
              </div>
            </div>
          </>
        )}
      </React.Fragment>
    );
  };

  render() {
    const { success } = this.state;
    const { projectTitle } = this.props;
    const title = `Apply to ${projectTitle}`;

    return (
      <GenericModal
        id="applyForRoleModal"
        title={success ? '' : title}
        footer={this.sendApplicationButton()}
      >
        {this.renderBody()}
      </GenericModal>
    );
  }
}

RoleApplication.propTypes = {
  applications: PropTypes.shape().isRequired,
  applyForRole: PropTypes.func.isRequired,
  roleInfo: PropTypes.shape().isRequired,
  history: PropTypes.shape().isRequired,
  engineer: PropTypes.shape().isRequired,
  projectId: PropTypes.string.isRequired,
  roleId: PropTypes.string.isRequired,
  projectTitle: PropTypes.string.isRequired,
  cycleId: PropTypes.number.isRequired
};

export default RoleApplication;
