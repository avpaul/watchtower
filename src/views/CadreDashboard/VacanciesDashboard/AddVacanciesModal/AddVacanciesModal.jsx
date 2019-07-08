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
      success: false
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
    const { createProjectVacancies } = this.props;
    if (
      prevProps.createProjectVacancies.loading &&
      !createProjectVacancies.loading
    )
      this.updateSubmitState(createProjectVacancies.error);
  }

  updateSubmitState = error => this.setState({ success: error === null });

  /**
   * The onClick handler for the modal submit button
   *
   * @return boolean
   */
  handleClick = () => {
    const { createNewProjectVacancies } = this.props;
    const { inputs } = this.state;

    const invalidInput = Object.values(inputs).find(input => !input.isValid());
    if (invalidInput) {
      invalidInput.setStatus('invalid', 'Input is invalid!');
      invalidInput.focus();
      return false;
    }
    createNewProjectVacancies({
      project_id: inputs.project.getValue().id,
      project_role_id: inputs.role.getValue().id,
      slots: parseInt(inputs.slots.getValue(), 10)
    });
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

    this.setState({ success: false });
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

  renderModalBody = () => {
    const { allProjects, allProjectRoles } = this.props;
    return (
      <React.Fragment>
        {this.renderDropdown({
          name: 'project',
          label: 'Select Project',
          options: processDropdownOptions(allProjects.data, 'name'),
          placeholder: 'Select Project',
          enableSearch: allProjects.data.length !== 0,
          loading: allProjects.loading
        })}
        {this.renderDropdown({
          name: 'role',
          label: 'Select Role',
          options: processDropdownOptions(allProjectRoles.data, 'name'),
          placeholder: 'Select Role',
          loading: allProjectRoles.loading
        })}
        <FormInputs.TextInput
          parent={this}
          name="slots"
          label="Vacancy Slots"
          testInput={input => numberRegex.test(input) && input !== '0'}
          alertText="Please input a valid number of slots!"
        />
      </React.Fragment>
    );
  };

  renderButton = ({ label, buttonProps = {} }) => (
    <CadreMainButton buttonProps={buttonProps} label={label} />
  );

  renderFooter = () => {
    const {
      createProjectVacancies: { loading }
    } = this.props;
    const { success } = this.state;
    const buttonProps = { 'data-dismiss': 'modal', onClick: this.handleClose };
    let button = null;
    switch (true) {
      case loading:
        button = <Loader size="small" />;
        break;
      case success:
        button = this.renderButton({ label: 'CLOSE', buttonProps });
        break;
      default:
        button = this.renderButton({
          label: 'CREATE',
          buttonProps: { onClick: this.handleClick }
        });
    }

    return <div className="modal-footer">{button}</div>;
  };

  render() {
    const {
      createProjectVacancies: { loading }
    } = this.props;
    const { success } = this.state;
    const message = 'New project vacancies have been created!';
    return (
      <GenericModal
        id="addProjectVacanciesModal"
        title="Create Vacancies"
        handleSubmit={this.handleClick}
        handleClose={this.handleClose}
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
  allProjectRoles: PropTypes.shape().isRequired
};

export default AddVacanciesModal;
