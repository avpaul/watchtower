import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Loader from '../../../components/Loader/Loader';
import ReturnIcon from '../../../static/BackIcon.png';
import Title from '../../../components/Title';
import FormInputs from '../../../components/FormInputs';
import { ProjectFormLeft, ProjectFormRight } from './ProjectFormComponents';
import { errorMessage } from './helpers';

import './projectForm.css';

class ProjectForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inputs: {}
    };
  }

  componentDidUpdate(prevProps) {
    const { createProject, history, newTechnology, manager } = this.props;
    const { inputs } = this.state;

    if (
      createProject.error &&
      prevProps.createNewProject.error !== createProject.error
    )
      this.handleSubmissionError(createProject.error);

    if (
      prevProps.createProject.loading &&
      !createProject.loading &&
      !createProject.error
    )
      history.replace('/cadre/projects');

    if (prevProps.newTechnology !== newTechnology)
      inputs.technologies.addSelection(newTechnology);
    if (prevProps.manager !== manager) inputs.manager.setStatus('normal', '');
  }

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
    const { project, createNewProject } = this.props;

    const textInputs = this.getTextInputs(inputs);
    const invalidInput = this.checkInputs(textInputs);

    if (invalidInput) {
      invalidInput.focus();
      return invalidInput.setStatus('invalid', 'Please provide an input!');
    }

    const projectDetails = this.processFormData(inputs);
    return !project.name ? createNewProject(projectDetails) : true;
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
    const { manager } = this.props;
    const projectDetails = {};

    Object.values(inputs).forEach(input => {
      if (input.getValue()) projectDetails[input.props.name] = input.getValue();
    });

    if (manager.id === projectDetails.manager.id)
      projectDetails.manager = JSON.stringify(manager);
    else projectDetails.manager = projectDetails.manager.id;

    if (inputs.logo.hasContent())
      projectDetails.logo = projectDetails.logo[0].url;

    projectDetails.technologies = JSON.stringify(projectDetails.technologies);
    projectDetails.channels = JSON.stringify(projectDetails.channels);
    projectDetails.type = projectDetails.type.id;
    return projectDetails;
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

  renderReturnButton = () => {
    const { history } = this.props;
    return (
      <button
        type="button"
        className="project-form__back"
        onClick={() => history.goBack()}
      >
        <img src={ReturnIcon} alt="Return Icon" />
      </button>
    );
  };

  renderForm = () => {
    const { project } = this.props;
    const props = {
      project,
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

  renderSubmitButton = createProject => (
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
            SUBMIT
          </button>
        )}
      </div>
    </div>
  );

  render() {
    const { project, createProject } = this.props;
    const title = project.name ? 'Edit Project' : 'Add New Project';

    return (
      <div className="project-form row ml-0 ml-0 pl-2 pl-md-5 pr-2 pr-md-5">
        <div className="col-11 col-lg-12 mb-4 ml-4 ml-lg-0">
          {this.renderReturnButton()}
          <Title title={title} />
        </div>
        {this.renderForm()}
        {this.renderSubmitButton(createProject)}
      </div>
    );
  }
}

ProjectForm.propTypes = {
  project: PropTypes.shape(),
  manager: PropTypes.shape().isRequired,
  newTechnology: PropTypes.string.isRequired,
  createProject: PropTypes.shape().isRequired,
  createNewProject: PropTypes.func.isRequired,
  history: PropTypes.shape().isRequired
};

ProjectForm.defaultProps = {
  project: {}
};

export default ProjectForm;
