import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Loader from '../../../../components/Loader/Loader';
import Title from '../../../../components/Title';
import FormInputs from '../../../../components/FormInputs';
import ProjectFormLeft from './ProjectFormLeftContainer';
import ProjectFormRight from './ProjectFormRight';
import ReturnButton from '../../../../components/Buttons/ReturnButton';
import { errorMessage } from './helpers';
import AddManagerModal from '../AddManagerModal';
import AddTechnologyModal from '../AddTechnologyModal';

import './projectForm.css';

class ProjectForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inputs: {}
    };
  }

  componentDidMount() {
    const { location, match, history } = this.props;

    if (!location.projectDetails && location.pathname.includes('edit')) {
      return history.push(`/cadre/projects/${match.params.id}`);
    }

    return true;
  }

  componentDidUpdate(prevProps) {
    const {
      newTechnology,
      manager,
      location,
      editSingleProject,
      createProject
    } = this.props;
    const { inputs } = this.state;

    if (location.projectDetails)
      this.handleAPISubmissionStatus(
        prevProps.editSingleProject,
        editSingleProject
      );
    else this.handleAPISubmissionStatus(prevProps.createProject, createProject);

    if (prevProps.newTechnology !== newTechnology)
      inputs.technologies.addSelection(newTechnology);
    if (prevProps.manager !== manager) inputs.manager.setStatus('normal', '');
  }

  handleAPISubmissionStatus = (oldState, newState) => {
    const { history } = this.props;
    if (oldState.loading && !newState.loading) {
      if (newState.error && oldState.error !== newState.error)
        this.handleSubmissionError(newState.error);
      else {
        let projectId;
        if (newState.data.id) projectId = newState.data.id;
        if (typeof projectId === 'number')
          return history.push(`/cadre/projects/${projectId}`);
      }
    }
    return true;
  };

  /**
   * Handles the submission response errors
   *
   * @param var The error response returned from the errorHandler helper
   */
  handleSubmissionError = error => {
    const { inputs } = this.state;
    if (typeof error === 'object')
      Object.keys(error).forEach(key =>
        inputs[key].setStatus('invalid', error[key][0])
      );
    if (error === errorMessage[0]) inputs.manager.setStatus('invalid', error);
  };

  /**
   * Handles the validation and submission of project details
   */
  handleSubmit = e => {
    e.preventDefault();
    const { inputs } = this.state;
    const { createNewProject, editProject, location } = this.props;

    const textInputs = this.getTextInputs(inputs);
    const invalidInput = this.checkInputs(textInputs);

    if (invalidInput) {
      invalidInput.focus();
      return invalidInput.setStatus('invalid', 'Please provide an input!');
    }

    const projectDetails = this.processFormData(inputs);
    return !location.projectDetails
      ? createNewProject(projectDetails)
      : editProject(projectDetails, this.props);
  };

  /**
   * Checks the required form inputs for input values and returns a required input with no value
   * which is an invalid input
   *
   * @param object inputs The form inputs
   * @param object filter The filter parameters
   * @return Component Invalid input component
   */
  checkInputs = inputs =>
    Object.values(inputs).find(input => {
      if (input.props.name === 'mockups' && input.getValue() === '')
        return false;
      return !input.isValid();
    });

  getTextInputs = inputs => {
    const { documents, logo, links, ...textInputs } = inputs;
    return textInputs;
  };

  /**
   * Goes through all the form inputs and extracts the input values into an object
   *
   * @param object inputs The form inputs
   * @return object An object containing the input values
   */
  processFormData = inputs => {
    const { manager, location } = this.props;
    const projectId = location.projectDetails
      ? location.projectDetails.id
      : null;
    const projectInformation = {};

    Object.values(inputs).forEach(input => {
      if (input.getValue())
        projectInformation[input.props.name] = input.getValue();
    });

    if (manager.id === projectInformation.manager.id)
      projectInformation.manager = JSON.stringify(manager);
    else projectInformation.manager = projectInformation.manager.id;

    if (inputs.logo.hasContent())
      projectInformation.logo = projectInformation.logo[0].url;

    projectInformation.technologies = JSON.stringify(
      projectInformation.technologies
    );
    projectInformation.channels = JSON.stringify(projectInformation.channels);
    projectInformation.type = projectInformation.type.id;
    projectInformation.id = projectId || null;
    return projectInformation;
  };

  renderInput = (InputComponent, props) => (
    <InputComponent
      parent={this}
      defaultStatus={props.inputValue ? 6 : 0}
      {...props}
    />
  );

  /**
   * Renders a text input
   * @param object props TextInput props
   * @return JSX
   */
  renderTextInput = props => this.renderInput(FormInputs.TextInput, props);

  /**
   * Renders a dropdown input
   * @param object props TextInput props
   * @return JSX
   */
  renderDropdown = props => this.renderInput(FormInputs.DropdownInput, props);

  /**
   * Renders a upload input
   * @param object props UploadInput props
   * @return JSX
   */
  renderUploadInput = props => (
    <FormInputs.FileUploadInput parent={this} {...props} />
  );

  /**
   * Renders a upload input
   * @param object props UploadInput props
   * @return JSX
   */
  renderAddLinksInput = props => (
    <FormInputs.LinksUploadInput parent={this} {...props} />
  );

  renderForm = (projectDetails = null) => {
    const props = {
      projectDetails,
      renderTextInput: this.renderTextInput,
      renderDropdown: this.renderDropdown,
      renderUploadInput: this.renderUploadInput,
      renderAddLinksInput: this.renderAddLinksInput
    };

    return (
      <React.Fragment>
        <ProjectFormLeft {...props} />
        <ProjectFormRight {...props} />
      </React.Fragment>
    );
  };

  renderSubmitButton = createProject => {
    const { location } = this.props;
    const currentPath = location.pathname;
    const buttonName = currentPath.includes('create') ? 'SUBMIT' : 'SAVE';

    return (
      <div className="col-12">
        <div className="row justify-content-end mr-0 mt-3">
          {createProject.loading ? (
            <Loader size="small" />
          ) : (
            <button
              id="submit"
              type="button"
              className="col-6 col-md-4 col-lg-2 btn btn-primary project-form__submit"
              onClick={this.handleSubmit}
            >
              {buttonName}
            </button>
          )}
        </div>
      </div>
    );
  };

  render() {
    const { createProject, history, location } = this.props;
    const projectDetails = location.projectDetails
      ? location.projectDetails
      : {};
    const title = projectDetails.name ? 'Edit Project' : 'Add New Project';

    return (
      <div className="project-form row ml-0 ml-0 pl-2 pl-md-5 pr-2 pr-md-5">
        <AddManagerModal />
        <AddTechnologyModal />
        <div className="col-11 col-lg-12 mb-4 ml-4 ml-lg-0">
          <ReturnButton history={history} />
          <Title title={title} />
        </div>
        {this.renderForm(projectDetails)}
        {this.renderSubmitButton(createProject)}
      </div>
    );
  }
}

ProjectForm.propTypes = {
  manager: PropTypes.shape().isRequired,
  newTechnology: PropTypes.string.isRequired,
  createProject: PropTypes.shape().isRequired,
  createNewProject: PropTypes.func.isRequired,
  history: PropTypes.shape().isRequired,
  match: PropTypes.shape().isRequired,
  editProject: PropTypes.func.isRequired,
  editSingleProject: PropTypes.shape().isRequired,
  location: PropTypes.shape().isRequired
};

export default ProjectForm;
