import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FormInputs from '../../../../components/FormInputs';
import { processDropdownOptions } from '../../../../components/FormInputs/helpers';
import GenericModal from '../../../../components/GenericModal';
import { CadreMainButton } from '../../../../components/Buttons';
import { numberRegex } from '../../../../utils/regex';

import './addVacancyModal.scss';
import Loader from '../../../../components/Loader/Loader';

class AddVacanciesModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inputs: {},
      success: false,
      error: ''
    };
  }

  componentDidMount() {
    const {
      fetchAllProjects,
      allProjects,
      fetchAllRoles,
      allProjectRoles
    } = this.props;

    if (allProjects.data.length === 0) fetchAllProjects();
    if (allProjectRoles.data.length === 0) fetchAllRoles();
  }

  componentDidUpdate(prevProps) {
    const {
      editMode,
      editProjectVacanciesState,
      createProjectVacancies
    } = this.props;

    if (editMode)
      this.checkSubmitState(
        prevProps.editProjectVacanciesState,
        editProjectVacanciesState
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
      editProjectVacancies
    } = this.props;
    const { inputs } = this.state;
    const invalidInput = Object.values(inputs).find(input => !input.isValid());

    if (invalidInput) {
      invalidInput.setStatus('invalid', 'Input is invalid!');
      invalidInput.focus();
      return false;
    }

    const newDetails = {
      project_id: inputs.project.getValue().id,
      project_role_id: inputs.role.getValue().id,
      slots: parseInt(inputs.slots.getValue(), 10)
    };

    if (editMode) {
      const details = this.filterPayload(projectVacanciesOnFocus, newDetails);
      if (Object.keys(details).length === 2)
        return this.setState({
          error:
            'No updated information has been provided. Please provide an updated input!'
        });
      editProjectVacancies(details);
    } else createNewProjectVacancies(newDetails);
    return false;
  };

  filterPayload = (oldDetails, newDetails) => {
    const details = {
      old_project_id: oldDetails.project.id,
      old_project_role_id: oldDetails.role.id
    };

    if (details.old_project_id !== newDetails.project_id)
      details.project_id = newDetails.project_id;
    if (details.old_project_role_id !== newDetails.project_role_id)
      details.project_role_id = newDetails.project_role_id;
    if (oldDetails.vacancies.length !== newDetails.slots)
      details.slots = newDetails.slots;

    return details;
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

  renderError = () => {
    const { error, success } = this.state;
    return error !== '' && !success ? (
      <span className="alert alert-danger" role="alert">
        {error}
      </span>
    ) : null;
  };

  renderModalBody = () => {
    const {
      allProjects,
      allProjectRoles,
      projectVacanciesOnFocus
    } = this.props;
    const { vacancies } = projectVacanciesOnFocus;
    return (
      <React.Fragment>
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
          name="slots"
          label="Vacancy Slots"
          defaultStatus={vacancies ? 6 : 0}
          testInput={input => numberRegex.test(input) && input !== '0'}
          alertText="Please input a valid number of slots!"
          inputValue={vacancies ? `${vacancies.length}` : ''}
        />
        {this.renderError()}
      </React.Fragment>
    );
  };

  renderButton = ({ label, buttonProps = {} }) => (
    <CadreMainButton buttonProps={buttonProps} label={label} />
  );

  renderFooter = () => {
    const {
      createProjectVacancies: add,
      editProjectVacanciesState: edit,
      editMode
    } = this.props;
    const { success } = this.state;
    let button = null;
    switch (true) {
      case add.loading || edit.loading:
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

  render() {
    const {
      createProjectVacancies: { loading },
      editMode
    } = this.props;
    const { success } = this.state;
    const message = editMode
      ? 'Project vacancies have been updated!'
      : 'New project vacancies have been created!';
    const title = `${editMode ? 'Update' : 'Create'} Vacancies`;
    return (
      <GenericModal
        id="addProjectVacanciesModal"
        title={title}
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

AddVacanciesModal.propTypes = {
  createNewProjectVacancies: PropTypes.func.isRequired,
  fetchAllProjects: PropTypes.func.isRequired,
  fetchAllRoles: PropTypes.func.isRequired,
  createProjectVacancies: PropTypes.shape().isRequired,
  allProjects: PropTypes.shape().isRequired,
  allProjectRoles: PropTypes.shape().isRequired,
  projectVacanciesOnFocus: PropTypes.shape().isRequired,
  editProjectVacanciesState: PropTypes.shape().isRequired,
  editProjectVacancies: PropTypes.func.isRequired,
  editMode: PropTypes.bool.isRequired
};

export default AddVacanciesModal;
