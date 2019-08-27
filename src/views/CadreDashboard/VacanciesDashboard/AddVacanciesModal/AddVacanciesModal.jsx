import React, { Component } from 'react';
import PropTypes from 'prop-types';
import 'react-datepicker/dist/react-datepicker.css';
import FormInputs from '../../../../components/FormInputs';
import { processDropdownOptions } from '../../../../components/FormInputs/helpers';
import GenericModal from '../../../../components/GenericModal';
import { CadreMainButton } from '../../../../components/Buttons';
import { numberRegex, emailRegex } from '../../../../utils/regex';
import calculateEndDate from '../../../../utils/formatDate';
import check from '../../../../static/check-mark.svg';
import './addVacancyModal.scss';
import Loader from '../../../../components/Loader/Loader';
import FeedbackDuration from '../../../../components/FeedbackDuration';

class AddVacanciesModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inputs: {},
      success: false,
      error: '',
      certificationInputs: {},
      vacancyType: 'Role vacancy',
      requester: false,
      startDate: this.defaultDate(),
      endDate: this.defaultDate(),
      currentDate: this.defaultDate(),
      errors: {}
    };
  }

  componentDidMount() {
    const {
      fetchAllProjects,
      allProjects,
      fetchAllRoles,
      allProjectRoles,
      fetchAllCertifications,
      allCertifications
    } = this.props;
    if (allProjects.data.length === 0) fetchAllProjects();
    if (allProjectRoles.data.length === 0) fetchAllRoles();
    if (allCertifications.data.length === 0) fetchAllCertifications();
  }

  componentWillReceiveProps(nextProps) {
    const { projectVacanciesOnFocus } = nextProps;

    if (
      Object.prototype.hasOwnProperty.call(projectVacanciesOnFocus, 'project')
    ) {
      const { vacancy } = projectVacanciesOnFocus;
      this.setState({
        startDate: new Date(vacancy.start_date),
        endDate: new Date(vacancy.closing_date)
      });
    }
  }

  componentDidUpdate(prevProps) {
    const {
      editMode,
      editProjectVacanciesState,
      createProjectVacancies,
      createCertificactionVacancies
    } = this.props;
    const { vacancyType } = this.state;
    if (editMode)
      this.checkSubmitState(
        prevProps.editProjectVacanciesState,
        editProjectVacanciesState
      );
    else if (vacancyType === 'Certification vacancy')
      this.checkSubmitState(
        prevProps.createCertificactionVacancies,
        createCertificactionVacancies
      );
    else
      this.checkSubmitState(
        prevProps.createProjectVacancies,
        createProjectVacancies
      );
  }

  checkSubmitState = (oldState, newState) => {
    if (oldState.loading && !newState.loading)
      this.setState({ success: newState.error === null });
  };

  /**
   * The onClick handler for the modal submit button
   *
   * @return boolean
   */
  handleClick = () => {
    const {
      createNewProjectVacancies,
      projectVacanciesOnFocus,
      editMode,
      editProjectVacancies,
      createNewCertificationVacancy,
      user
    } = this.props;
    const {
      inputs,
      vacancyType,
      certificationInputs,
      startDate,
      endDate,
      requester
    } = this.state;

    const certificationInputsWithSlot = {
      ...certificationInputs,
      slots: { ...inputs.slots }
    };

    const inputsToCheck =
      vacancyType === 'Certification vacancy'
        ? certificationInputsWithSlot
        : inputs;

    const invalidInput = Object.values(inputsToCheck).find(
      input => !input.isValid()
    );

    if (invalidInput) {
      invalidInput.setStatus('invalid', 'Input is invalid!');
      invalidInput.focus();
      return false;
    }
    this.compareDates(startDate, endDate);

    const newDetails = {
      project_id: inputs.project.getValue().id,
      project_role_id: inputs.role.getValue().id,
      start_date: startDate,
      closing_date: endDate,
      requester_email: inputs.email.getValue(),
      slots: parseInt(inputs.slots.getValue(), 10)
    };

    if (editMode) {
      const {
        vacancy: { cycle_id: cycleId }
      } = projectVacanciesOnFocus;
      const details = this.filterPayload(projectVacanciesOnFocus, newDetails);
      if (Object.keys(details).length === 2)
        return this.setState({
          error:
            'No updated information has been provided. Please provide an updated input!'
        });
      editProjectVacancies(details, cycleId);
    } else if (vacancyType === 'Certification vacancy') {
      const certificationDuration = certificationInputs.certification.getValue()
        .duration;
      const value = calculateEndDate(certificationDuration, startDate);
      const certificationRequester = requester
        ? user.email
        : inputs.email.getValue();
      createNewCertificationVacancy({
        certification_id: certificationInputs.certification.getValue().id,
        slots: parseInt(inputs.slots.getValue(), 10),
        requester: certificationRequester,
        start_date: startDate,
        end_date: value,
        closing_date: endDate
      });
      this.setState({ success: false });
    } else createNewProjectVacancies(newDetails);
    return false;
  };

  filterPayload = (oldDetails, newDetails) => {
    const details = {
      project_id: oldDetails.project.id,
      project_role_id: oldDetails.role.id,
      old_project_id: oldDetails.project.id,
      old_project_role_id: oldDetails.role.id,
      start_date: oldDetails.vacancy.start_date,
      closing_date: oldDetails.vacancy.closing_date,
      requester_email: oldDetails.vacancy.requester_email,
      slots: parseInt(oldDetails.available_slots, 10)
    };

    if (details.old_project_id !== newDetails.project_id)
      details.project_id = newDetails.project_id;
    if (details.old_project_role_id !== newDetails.project_role_id)
      details.project_role_id = newDetails.project_role_id;
    if (oldDetails.available_slots !== newDetails.slots)
      details.slots = newDetails.slots;
    if (details.start_date !== newDetails.start_date)
      details.start_date = newDetails.start_date;
    if (details.closing_date !== newDetails.closing_date)
      details.closing_date = newDetails.closing_date;
    if (oldDetails.vacancy.requester_email !== newDetails.requester_email)
      details.requester_email = newDetails.requester_email;

    return details;
  };

  /**
   * The onClick handler for the modal close buttons which include
   * the cancel and the return buttons
   */
  handleClose = () => {
    const { history } = this.props;
    const { inputs } = this.state;
    inputs.project.setState({ inputValue: {} });
    inputs.project.setStatus('normal');

    inputs.role.setState({ inputValue: {} });
    inputs.role.setStatus('normal');

    inputs.slots.setState({ inputValue: '' });
    inputs.slots.setStatus('normal');

    this.setState({ success: false, error: '', vacancyType: 'Role vacancy' });
    history.replace('/cadre/vacancies');
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
   * handles clicking of the
   * checkbox
   */
  clickCheckbox = () => {
    const { requester } = this.state;
    const value = !requester;
    this.setState({ requester: value });
  };

  /**
   * @method defaultDate
   * @description Sets the default date which is now
   */
  defaultDate = () => new Date();

  /**
   * Renders the checkbox text
   * @return jsx
   */
  renderText = () => <p>I am the requester</p>;

  /**
   * Renders the checkbox
   * @return jsx
   */
  renderCheckBox = () => {
    const { requester } = this.state;
    return (
      <div
        className="checkbox"
        id="checkbox"
        onClick={() => {
          this.clickCheckbox();
        }}
        role="button"
        tabIndex="0"
        onKeyDown={() => {
          this.clickCheckbox();
        }}
      >
        {requester ? <img src={check} alt="clicked" className="ticksvg" /> : ''}
      </div>
    );
  };

  renderError = () => {
    const { error, success } = this.state;
    return error !== '' && !success ? (
      <span className="alert alert-danger" role="alert">
        {error}
      </span>
    ) : null;
  };

  /**
   * Toggles between
   * Certification vacancies form and
   * Role vacancies form
   */
  toogleVacanciesToDisplay = e => {
    const { inputs } = this.state;

    inputs.slots.setState({ inputValue: '' });
    inputs.slots.setStatus('normal');
    inputs.email.setState({ inputValue: '' });
    inputs.email.setStatus('normal');

    this.setState({
      vacancyType: e.target.value,
      success: false,
      startDate: this.defaultDate(),
      endDate: this.defaultDate(),
      currentDate: this.defaultDate(),
      errors: { startDate: '' }
    });
  };

  /**
   * Handles the start
   */
  handleStartChange = date => {
    this.setState({ startDate: date });
    const { endDate } = this.state;
    this.compareDates(date, endDate);
  };

  /**
   * Handles the enddate
   */
  handleEndChange = date => {
    this.setState({ endDate: date });
    const { startDate } = this.state;
    this.compareDates(startDate, date);
  };

  compareDates = (startDate, closeDate) => {
    const { currentDate } = this.state;
    if (+startDate <= +closeDate) {
      this.setState({
        errors: {
          startDate: 'The start date must be a date after the close date',
          closeDate: ''
        }
      });
    } else if (+startDate <= +currentDate || +closeDate <= +currentDate) {
      this.setState({
        errors: {
          startDate:
            'The start/close date must be a date after the current date',
          closeDate: ''
        }
      });
    } else {
      this.setState({
        errors: {
          startDate: '',
          closeDate: ''
        }
      });
    }
  };

  /**
   * Renders the role vacancy
   * form
   * @return jsx
   */
  renderVacancyForm = projectVacanciesOnFocus => {
    const { allProjects, allProjectRoles } = this.props;
    const { vacancy } = projectVacanciesOnFocus;
    return (
      <>
        {this.renderDropdown({
          name: 'project',
          label: 'Select Project',
          options: processDropdownOptions(allProjects.data, 'name'),
          placeholder: 'Select Project',
          enableSearch: allProjects.data.length !== 0,
          loading: allProjects.loading,
          inputValue: projectVacanciesOnFocus.project
            ? {
                ...projectVacanciesOnFocus.project,
                label: projectVacanciesOnFocus.project.name
              }
            : {}
        })}
        {this.renderDropdown({
          name: 'role',
          label: 'Select Role',
          options: processDropdownOptions(allProjectRoles.data, 'name'),
          placeholder: 'Select Role',
          loading: allProjectRoles.loading,
          inputValue: projectVacanciesOnFocus.role
            ? {
                ...projectVacanciesOnFocus.role,
                label: projectVacanciesOnFocus.role.name
              }
            : {}
        })}
        <FormInputs.TextInput
          parent={this}
          name="email"
          label="Enter Requester Email"
          placeholder="Enter email"
          defaultStatus={vacancy ? 6 : 0}
          testInput={input => emailRegex.test(input)}
          alertText="Please input a valid email!"
          inputValue={vacancy ? `${vacancy.requester_email}` : ''}
        />
      </>
    );
  };

  /**
   * Renders the certification vacancy
   * form
   * @return jsx
   */
  renderCertificationForm = () => {
    const { allCertifications, projectVacanciesOnFocus } = this.props;
    const { available_slots: availableSlots } = projectVacanciesOnFocus;
    const { requester } = this.state;
    return (
      <>
        {this.renderDropdown({
          name: 'certification',
          key: 3,
          componentStateKey: 'certificationInputs',
          label: 'Select Certification',
          options: processDropdownOptions(allCertifications.data, 'name'),
          placeholder: 'Select Certification',
          enableSearch: allCertifications.data.length !== 0,
          loading: allCertifications.loading
        })}
        <div className="container">
          {this.renderCheckBox()}
          {this.renderText()}
        </div>
        {requester ? (
          ''
        ) : (
          <FormInputs.TextInput
            parent={this}
            name="email"
            label="Enter Requester Email"
            placeholder="Enter email"
            defaultStatus={availableSlots ? 6 : 0}
            testInput={input => emailRegex.test(input)}
            alertText="Please input a valid email!"
            inputValue={availableSlots ? `${availableSlots}` : ''}
          />
        )}
      </>
    );
  };

  /**
   * Renders the toggle buttons
   * @return jsx
   */
  renderToggleButtons = () => {
    const { vacancyType } = this.state;
    return (
      <div className="form-toggle-buttons">
        <button
          type="button"
          value="Role vacancy"
          className={
            vacancyType === 'Role vacancy'
              ? 'form-vacancy-toggle-button--active'
              : 'form-vacancy-toggle-button'
          }
          id="project-role-button"
          onClick={this.toogleVacanciesToDisplay}
        >
          Project Vacancies
        </button>
        <button
          type="button"
          value="Certification vacancy"
          className={
            vacancyType === 'Certification vacancy'
              ? 'form-vacancy-toggle-button--active'
              : 'form-vacancy-toggle-button'
          }
          id="certification-button"
          onClick={this.toogleVacanciesToDisplay}
        >
          Certification Vacancies
        </button>
      </div>
    );
  };

  /**
   * Renders the datepickers
   * @return jsx
   */
  renderDatePickers = calenderType => {
    const {
      startDate,
      endDate,
      currentDate,
      vacancyType,
      errors,
      success
    } = this.state;
    const {
      createProjectVacancies: add,
      editProjectVacanciesState: edit
    } = this.props;
    return (
      <div className="form-date-picker">
        <FeedbackDuration
          startDate={startDate}
          endDate={endDate}
          currentDate={currentDate}
          handleStartDateChange={this.handleStartChange}
          handleEndDateChange={this.handleEndChange}
          vacancyType={vacancyType}
          calenderType={calenderType}
          errors={errors}
          success={success}
          add={add}
          edit={edit}
        />
      </div>
    );
  };

  renderModalBody = () => {
    const { projectVacanciesOnFocus, editMode } = this.props;
    const { available_slots: availableSlots } = projectVacanciesOnFocus;
    const { vacancyType } = this.state;

    return (
      <>
        {editMode ? '' : this.renderToggleButtons()}
        {vacancyType === 'Certification vacancy' && !editMode
          ? this.renderCertificationForm()
          : this.renderVacancyForm(projectVacanciesOnFocus)}
        <FormInputs.TextInput
          parent={this}
          name="slots"
          label="Vacancy Slots"
          placeholder="Enter no. of slots"
          testInput={input => numberRegex.test(input) && input !== '0'}
          alertText="Please input a valid number of slots!"
          inputValue={availableSlots ? `${availableSlots}` : ''}
        />
        {this.renderDatePickers('horizontal')}
        {this.renderError()}
      </>
    );
  };

  renderButton = ({ label, buttonProps = {} }) => (
    <CadreMainButton buttonProps={buttonProps} label={label} />
  );

  renderFooter = () => {
    const {
      createProjectVacancies: add,
      editProjectVacanciesState: edit,
      editMode,
      createCertificactionVacancies
    } = this.props;
    const { success } = this.state;
    let button = null;
    switch (true) {
      case add.loading:
      case edit.loading:
      case createCertificactionVacancies.loading:
        button = <Loader size="small" />;
        break;
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
          label: editMode ? 'UPDATE' : 'CREATE',
          buttonProps: { onClick: this.handleClick }
        });
    }

    return <div className="modal-footer">{button}</div>;
  };

  getModelTitle = (mode, modelType) => {
    if (mode) return 'Update Vacancies';
    if (modelType === 'Role vacancy') return 'Create Vacancies';
    return 'Create Certifications';
  };

  render() {
    const {
      createProjectVacancies: { loading },
      editMode
    } = this.props;
    const { success, vacancyType } = this.state;
    const addSuccessMessage =
      vacancyType === 'Role vacancy'
        ? 'New project vacancies have been created!'
        : 'New certification vacancies have been created';
    const message = editMode
      ? 'Project vacancies have been updated!'
      : addSuccessMessage;

    return (
      <GenericModal
        id="addProjectVacanciesModal"
        title={this.getModelTitle(editMode, vacancyType)}
        successMessage={message}
        success={success}
        submitLoading={loading}
        footer={this.renderFooter()}
      >
        {this.renderModalBody()}
      </GenericModal>
    );
  }
}
AddVacanciesModal.defaultProps = {
  allCertifications: { loading: false, data: [], error: null }
};
AddVacanciesModal.propTypes = {
  createNewProjectVacancies: PropTypes.func.isRequired,
  createNewCertificationVacancy: PropTypes.func.isRequired,
  fetchAllProjects: PropTypes.func.isRequired,
  fetchAllCertifications: PropTypes.func.isRequired,
  fetchAllRoles: PropTypes.func.isRequired,
  createProjectVacancies: PropTypes.shape().isRequired,
  createCertificactionVacancies: PropTypes.shape().isRequired,
  allProjects: PropTypes.shape().isRequired,
  allCertifications: PropTypes.shape(),
  allProjectRoles: PropTypes.shape().isRequired,
  projectVacanciesOnFocus: PropTypes.shape().isRequired,
  editProjectVacanciesState: PropTypes.shape().isRequired,
  editProjectVacancies: PropTypes.func.isRequired,
  editMode: PropTypes.bool.isRequired,
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    picture: PropTypes.string.isRequired
  }).isRequired,
  history: PropTypes.shape({}).isRequired
};

export default AddVacanciesModal;
