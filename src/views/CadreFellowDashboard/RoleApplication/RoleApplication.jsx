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
      success: false
    };
  }

  componentDidUpdate(prevProps) {
    const { applications } = this.props;
    if (prevProps.applications.loading !== applications.loading) {
      this.applicationStatus(applications);
    }
  }

  applicationStatus = applications => {
    if (applications.data.message) {
      this.setState({ success: true });
    }
  };

  handleSubmit = () => {
    const { applyForRole, roleId, projectId } = this.props;
    const {
      inputs: { description }
    } = this.state;
    const data = {
      application_reason: description.getValue()
    };
    applyForRole(Number(projectId), Number(roleId), data);
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

  sendApplicationButton = () => {
    const { success } = this.state;
    const { applications } = this.props;
    let button = this.renderButton({
      label: 'Send Application',
      buttonProps: {
        onClick: this.handleSubmit,
        id: 'applicationBtn'
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

  renderBody = () => {
    const { roleInfo } = this.props;
    const { success } = this.state;
    const applicationUnits = {
      subtitle: `You are applying as a ${roleInfo.name}`,
      selfAdvocateTitle: `Sell yourself`,
      successTitle: 'Great! Thank you for applying',
      successSutitle: 'You should hear from us shortly'
    };

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
          <div className="advocacy">
            <p className="advocacy__label">{applicationUnits.subtitle}</p>
            <p className="advocacy__subtitle">
              {applicationUnits.selfAdvocateTitle}
            </p>
            <FormInputs.TextInput
              parent={this}
              name="description"
              type="textarea"
            />
          </div>
        )}
      </React.Fragment>
    );
  };

  render() {
    const { success } = this.state;
    const title = `Apply to WatchTower Extended Team`;

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
  roleId: PropTypes.string.isRequired
};

export default RoleApplication;
