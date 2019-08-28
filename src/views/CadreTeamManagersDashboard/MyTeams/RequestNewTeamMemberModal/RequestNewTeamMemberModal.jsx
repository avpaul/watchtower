import React, { Component } from 'react';
import PropTypes from 'prop-types';
import 'react-datepicker/dist/react-datepicker.css';
import FormInputs from '../../../../components/FormInputs';
import { processDropdownOptions } from '../../../../components/FormInputs/helpers';
import GenericModal from '../../../../components/GenericModal';
import { CadreMainButton } from '../../../../components/Buttons';
import { numberRegex } from '../../../../utils/regex';
import './RequestNewTeamMemberModal.scss';
import FeedbackDuration from '../../../../components/FeedbackDuration';

class RequestNewTeamMemberModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inputs: {},
      success: false,
      error: '',
      startDate: this.defaultDate(),
      currentDate: this.defaultDate(),
      errors: {}
    };
  }

  componentDidMount() {
    const { fetchAllRoles, allProjectRoles } = this.props;
    if (allProjectRoles.data.length === 0) fetchAllRoles();
  }

  /**
   * The onClick handler for the modal submit button
   *
   * @return boolean
   */
  handleClick = () => {
    const { inputs, startDate, currentDate } = this.state;
    const { requestNewTeamMembers } = this.props;

    const inputsToCheck = inputs;

    const invalidInput = Object.values(inputsToCheck).find(
      input => !input.isValid()
    );

    if (invalidInput) {
      invalidInput.setStatus('invalid', 'Input is invalid!');
      invalidInput.focus();
      return false;
    }
    this.compareDates(startDate, currentDate);

    const inputData = {
      project_id: inputs.project.getValue().id,
      project_role_id: inputs.role.getValue().id,
      slots: parseInt(inputs.slots.getValue(), 10),
      start_date: startDate
    };
    requestNewTeamMembers(inputData);
    const {
      newTeamMemberRequest: { data }
    } = this.props;
    if (data) {
      this.setState({ success: true });
    } else {
      this.setState({ error: 'There was a problem sending your request.' });
    }
    return false;
  };

  /**
   * The onClick handler for the modal close buttons which include
   * the cancel and the return buttons
   */
  handleClose = () => {
    const { inputs } = this.state;
    inputs.project.setState({ inputValue: {} });
    inputs.project.setStatus('normal');

    inputs.role.setState({ inputValue: {} });
    inputs.role.setStatus('normal');

    inputs.slots.setState({ inputValue: '' });
    inputs.slots.setStatus('normal');

    this.setState({ success: false, error: '' });
  };

  /**
   * Renders a dropdown input
   * @param object props TextInput props
   * @return JSX
   */
  renderDropdown = props => (
    <FormInputs.DropdownInput
      parent={this}
      defaultStatus={props.inputValue ? 6 : 0}
      {...props}
    />
  );

  /**
   * @method defaultDate
   * @description Sets the default date which is now
   */
  defaultDate = () => new Date();

  renderError = () => {
    const { error, success } = this.state;
    return error !== '' && !success ? (
      <span className="alert alert-danger" role="alert">
        {error}
      </span>
    ) : null;
  };

  /**
   * Handles the start
   */
  handleStartChange = date => {
    this.setState({ startDate: date });
    const { currentDate } = this.state;
    this.compareDates(date, currentDate);
  };

  compareDates = (startDate, currentDate) => {
    if (+startDate <= +currentDate) {
      this.setState({
        errors: {
          startDate: 'The start date must be a date after the current date'
        }
      });
    } else {
      this.setState({
        errors: {
          startDate: ''
        }
      });
    }
  };

  /**
   * Renders the role vacancy
   * form
   * @return jsx
   */
  renderVacancyForm = project => {
    const { allProjects, allProjectRoles } = this.props;
    return (
      <>
        {this.renderDropdown({
          name: 'project',
          label: 'Select Project',
          options: processDropdownOptions(project, 'name'),
          placeholder: 'Select Project',
          loading: allProjects.loading
        })}
        {this.renderDropdown({
          name: 'role',
          label: 'Select Role',
          options: processDropdownOptions(allProjectRoles.data, 'name'),
          placeholder: 'Select Role',
          loading: allProjectRoles.loading
        })}
      </>
    );
  };

  /**
   * Renders the datepickers
   * @return jsx
   */
  renderDatePickers = calenderType => {
    const { startDate, currentDate, errors, success } = this.state;
    return (
      <div className="form-date-picker">
        <FeedbackDuration
          startDate={startDate}
          currentDate={currentDate}
          handleStartDateChange={this.handleStartChange}
          calenderType={calenderType}
          managerType="Team Manager"
          errors={errors}
          success={success}
        />
      </div>
    );
  };

  renderModalBody = project => (
    <>
      {this.renderVacancyForm(project)}
      <FormInputs.TextInput
        parent={this}
        name="slots"
        label="Vacancy Slots"
        placeholder="Enter no. of slots"
        testInput={input => numberRegex.test(input) && input !== '0'}
        alertText="Please input a valid number of slots!"
      />
      {this.renderDatePickers('single')}
      {this.renderError()}
    </>
  );

  renderButton = ({ label, buttonProps = {} }) => (
    <CadreMainButton buttonProps={buttonProps} label={label} />
  );

  renderFooter = () => {
    const { success } = this.state;
    let button = null;
    switch (true) {
      case success:
        button = this.renderButton({
          label: 'CLOSE',
          buttonProps: {
            'data-dismiss': 'modal',
            onClick: this.handleClose
          }
        });
        break;
      default:
        button = this.renderButton({
          label: 'SUBMIT',
          buttonProps: { onClick: this.handleClick }
        });
    }

    return <div className="modal-footer">{button}</div>;
  };

  getModelTitle = () => 'Request Team Member';

  render() {
    const { success } = this.state;
    const {
      allProjects,
      newTeamMemberRequest: { loading }
    } = this.props;
    const message = 'Request for new team member submitted';

    return (
      <GenericModal
        id="requestNewTeamMemberModal"
        title={this.getModelTitle()}
        successMessage={message}
        success={success}
        submitLoading={loading}
        footer={this.renderFooter()}
      >
        {this.renderModalBody(allProjects.data[0].projects)}
      </GenericModal>
    );
  }
}
RequestNewTeamMemberModal.propTypes = {
  fetchAllProjects: PropTypes.func.isRequired,
  fetchAllRoles: PropTypes.func.isRequired,
  requestNewTeamMembers: PropTypes.func.isRequired,
  newTeamMemberRequest: PropTypes.shape().isRequired,
  allProjects: PropTypes.shape().isRequired,
  allProjectRoles: PropTypes.shape().isRequired,
  project: PropTypes.shape().isRequired,
  history: PropTypes.shape({}).isRequired
};

export default RequestNewTeamMemberModal;
