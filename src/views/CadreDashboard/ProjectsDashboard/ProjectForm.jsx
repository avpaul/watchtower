import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Title from '../../../components/Title';
import FormInputs from '../../../components/FormInputs';
import ReturnIcon from '../../../static/BackIcon.png';
import { urlRegex } from '../../../utils/regex';

import './projectForm.css';

const projectTypes = [
  {
    value: 'internal',
    label: 'Internal'
  },
  {
    value: 'external',
    label: 'External'
  }
];

class ProjectForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inputs: {}
    };
  }

  componentDidUpdate(prevProps) {
    const { createProject, history } = this.props;
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
  }

  handleSubmissionError = error => {
    const { inputs } = this.state;
    if (error.name) inputs.name.setStatus('invalid', error.name[0]);
  };

  /**
   * Handles the validation and submission of project details
   */
  handleSubmit = e => {
    e.preventDefault();
    const { inputs } = this.state;
    const { project, createNewProject } = this.props;

    const invalidInput = Object.values(inputs).find(input => {
      if (input.props.name === 'mockups' && input.getValue() === '')
        return false;
      return !input.isValid();
    });

    if (invalidInput) return invalidInput.focus();

    const projectDetails = {};

    Object.values(inputs).forEach(input => {
      if (input.getValue() !== '')
        projectDetails[input.props.name] = input.getValue();
    });

    return !project.name
      ? createNewProject({
          ...projectDetails,
          manager: 'test@andela.com'
        })
      : true;
  };

  /**
   * Renders a text input
   * @param object props TextInput props
   * @return JSX
   */
  renderTextInput = props => (
    <FormInputs.TextInput
      parent={this}
      defaultStatus={props.inputValue ? 6 : 0}
      {...props}
    />
  );

  renderLeftForm = project => (
    <div className="col-6">
      {this.renderTextInput({
        name: 'name',
        label: 'Project Name',
        inputValue: project.name
      })}
      <FormInputs.DropdownInput
        parent={this}
        defaultStatus={project.type ? 6 : 0}
        name="type"
        label="Project Type"
        inputValue={project.type || projectTypes[0].value}
        options={projectTypes}
      />
      {this.renderTextInput({
        name: 'technologies',
        label: 'Technologies (Separated by commas)',
        inputValue: project.technologies
      })}
      {this.renderTextInput({
        name: 'mockups',
        label: 'Invision Link',
        inputValue: project.mockups,
        testInput: input => urlRegex.test(input)
      })}
    </div>
  );

  renderRightForm = project => (
    <div className="col-6">
      {this.renderTextInput({
        name: 'tagline',
        label: 'Tagline',
        inputValue: project.tagline,
        length: 120
      })}
      {this.renderTextInput({
        name: 'about',
        label: 'About',
        inputValue: project.about,
        type: 'textarea'
      })}
    </div>
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

  render() {
    const { project, createProject } = this.props;
    const title = project.name ? 'Edit Project' : 'Add New Project';
    return (
      <div className="project-form row ml-0 ml-0">
        {this.renderReturnButton()}

        <div className="col-12 mb-4">
          <Title title={title} />
        </div>

        {this.renderLeftForm(project)}
        {this.renderRightForm(project)}

        <div className="col-12">
          <div className="row justify-content-end mr-0 mt-3">
            <button
              id="submit"
              type="button"
              className="col-2 btn btn-primary project-form__submit"
              onClick={this.handleSubmit}
              disabled={createProject.loading}
            >
              SUBMIT
            </button>
          </div>
        </div>
      </div>
    );
  }
}

ProjectForm.propTypes = {
  project: PropTypes.shape(),
  createProject: PropTypes.shape().isRequired,
  createNewProject: PropTypes.func.isRequired,
  history: PropTypes.shape().isRequired
};

ProjectForm.defaultProps = {
  project: {}
};

export default ProjectForm;
