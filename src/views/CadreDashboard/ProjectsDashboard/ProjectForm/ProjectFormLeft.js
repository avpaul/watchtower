import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AddIcon from '../../../../static/plus.png';
import { urlRegex } from '../../../../utils/regex';
import { projectTypes } from './helpers';
import { processDropdownOptions } from '../../../../components/FormInputs/helpers';

class ProjectFormLeft extends Component {
  componentDidMount() {
    const {
      fetchAllProjectTechnologies,
      fetchAllProjectManagers,
      fetchAllSlackChannels
    } = this.props;

    fetchAllProjectManagers();
    fetchAllProjectTechnologies();
    fetchAllSlackChannels();
  }

  renderInputWithAddition = (props, modalTarget, addButtonName) => {
    const { renderDropdown } = this.props;
    return (
      <div className="col-12 p-0">
        {renderDropdown({
          ...props,
          extras: (
            <div className="wt-dropdown__list__item project-form__add-input">
              <button
                type="button"
                data-toggle="modal"
                data-target={modalTarget}
              >
                <span>
                  <img src={AddIcon} alt="Add Icon" />
                </span>
                <p>{addButtonName}</p>
              </button>
            </div>
          )
        })}
      </div>
    );
  };

  renderTopInputs = () => {
    const { project, renderTextInput, renderDropdown } = this.props;
    return (
      <React.Fragment>
        {renderTextInput({
          name: 'name',
          label: 'Project Name',
          inputValue: project.name
        })}
        {renderDropdown({
          name: 'type',
          label: 'Project Type',
          inputValue: project.type || projectTypes[0],
          options: projectTypes
        })}
      </React.Fragment>
    );
  };

  renderManagerInput = () => {
    const { project, newManager } = this.props;
    const {
      fetchProjectManagers: { loading }
    } = this.props;
    let {
      fetchProjectManagers: { data }
    } = this.props;
    if (newManager.name) data = [...data, newManager];
    return this.renderInputWithAddition(
      {
        name: 'manager',
        label: 'Team Manager',
        options: processDropdownOptions(data, 'name'),
        placeholder: 'Select Team Manager',
        inputValue: project.manager,
        enableSearch: data.length !== 0,
        loading
      },
      '#addManagerModal',
      'Add team manager'
    );
  };

  renderTechnologiesInput = () => {
    const {
      project,
      fetchProjectTechnologies: { data, loading }
    } = this.props;
    return this.renderInputWithAddition(
      {
        name: 'technologies',
        label: 'Technologies',
        inputValue: project.technologies,
        options: processDropdownOptions(data, 'name'),
        multipleSelection: true,
        placeholder: 'Add Technologies',
        enableSearch: data.length !== 0,
        loading
      },
      '#addTechnologyModal',
      'Add project technology'
    );
  };

  renderSlackChannelInput = () => {
    const {
      project,
      renderDropdown,
      fetchSlackChannels: { loading, data }
    } = this.props;

    return (
      <React.Fragment>
        {renderDropdown({
          name: 'channels',
          label: 'Slack Channel',
          inputValue: project.slackChannel,
          options: processDropdownOptions(data, 'name'),
          placeholder: 'Add Slack Channel',
          enableSearch: data.length !== 0,
          loading
        })}
      </React.Fragment>
    );
  };

  renderUploadInputs = () => {
    const { project, renderUploadInput, renderAddLinksInput } = this.props;
    return (
      <React.Fragment>
        {renderUploadInput({
          name: 'documents',
          label: 'Relevant Documents',
          documents: project.documents,
          buttonLabel: 'Upload Document'
        })}
        {renderAddLinksInput({
          name: 'links',
          label: 'Relevant Links',
          documents: project.links,
          buttonLabel: 'Manage Links'
        })}
      </React.Fragment>
    );
  };

  render() {
    const { project, renderTextInput } = this.props;
    return (
      <div className="col-12 col-lg-6">
        <div className="row mr-0 ml-0">
          {this.renderTopInputs()}
          {this.renderManagerInput()}
          {this.renderTechnologiesInput()}
          {this.renderSlackChannelInput()}
          {renderTextInput({
            name: 'mockups',
            label: 'Invision Link',
            inputValue: project.mockups,
            testInput: input => urlRegex.test(input),
            alertText: 'Please provide a link!'
          })}
          {this.renderUploadInputs()}
        </div>
      </div>
    );
  }
}

ProjectFormLeft.propTypes = {
  project: PropTypes.shape().isRequired,
  newManager: PropTypes.shape().isRequired,
  renderTextInput: PropTypes.func.isRequired,
  renderDropdown: PropTypes.func.isRequired,
  fetchAllProjectManagers: PropTypes.func.isRequired,
  fetchAllProjectTechnologies: PropTypes.func.isRequired,
  fetchProjectTechnologies: PropTypes.shape().isRequired,
  fetchProjectManagers: PropTypes.shape().isRequired,
  fetchAllSlackChannels: PropTypes.func.isRequired,
  fetchSlackChannels: PropTypes.shape().isRequired,
  renderUploadInput: PropTypes.func.isRequired,
  renderAddLinksInput: PropTypes.func.isRequired
};

export default ProjectFormLeft;
