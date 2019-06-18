import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AddIcon from '../../../../static/plus.png';
import { urlRegex } from '../../../../utils/regex';
import { projectTypes } from '../helpers';
import arrayOfObjectsSorter from '../../../../utils/sortArray';

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
    let {
      fetchProjectManagers: { data }
    } = this.props;
    if (newManager.name) data = [...data, newManager];
    return this.renderInputWithAddition(
      {
        name: 'manager',
        label: 'Team Manager',
        options: data.sort(arrayOfObjectsSorter('name')).map(manager => ({
          ...manager,
          label: manager.name
        })),
        placeholder: 'Select Team Manager',
        inputValue: project.manager,
        enableSearch: data.length !== 0
      },
      '#addManagerModal',
      'Add team manager'
    );
  };

  renderTechnologiesInput = () => {
    const { project, fetchProjectTechnologies } = this.props;
    return this.renderInputWithAddition(
      {
        name: 'technologies',
        label: 'Technologies',
        inputValue: project.technologies,
        options: fetchProjectTechnologies.data
          .sort(arrayOfObjectsSorter('name'))
          .map(tech => ({ ...tech, label: tech.name })),
        multipleSelection: true,
        placeholder: 'Add Technologies',
        enableSearch: fetchProjectTechnologies.data.length !== 0
      },
      '#addTechnologyModal',
      'Add project technology'
    );
  };

  renderSlackChannelInput = () => {
    const { project, renderDropdown, fetchSlackChannels } = this.props;

    return (
      <React.Fragment>
        {renderDropdown({
          name: 'channels',
          label: 'Slack Channel',
          inputValue: project.slackChannel,
          options: fetchSlackChannels.data
            .sort(arrayOfObjectsSorter('name'))
            .map(channel => ({ ...channel, label: channel.name })),
          placeholder: 'Add Slack Channel',
          enableSearch: fetchSlackChannels.data.length !== 0
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
  fetchSlackChannels: PropTypes.shape().isRequired
};

export default ProjectFormLeft;
