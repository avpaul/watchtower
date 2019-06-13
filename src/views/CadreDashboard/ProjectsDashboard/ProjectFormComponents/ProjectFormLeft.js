import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AddIcon from '../../../../static/plus.png';
import { urlRegex } from '../../../../utils/regex';
import { projectTypes } from '../helpers';

class ProjectFormLeft extends Component {
  componentDidMount() {
    const { fetchAllProjectTechnologies, fetchAllProjectManagers } = this.props;

    fetchAllProjectManagers();
    fetchAllProjectTechnologies();
  }

  renderInputWithAddition = (props, modalTarget) => {
    const { renderDropdown } = this.props;
    return (
      <div className="project-form__add-input col-12 p-0">
        <div className="row mr-0 ml-0">
          <div className="col-10 pl-0">{renderDropdown(props)}</div>
          <div className="col-2 pr-0">
            <button type="button" data-toggle="modal" data-target={modalTarget}>
              <img src={AddIcon} alt="Return Icon" />
            </button>
          </div>
        </div>
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
          inputValue: project.type || projectTypes[0].id,
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
        options: data.map(manager => ({
          ...manager,
          label: manager.name
        })),
        placeholder: 'Select Team Manager',
        inputValue: newManager.name || project.manager
      },
      '#addManagerModal'
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
          .sort(this.sortTechnologies)
          .map(tech => ({ ...tech, label: tech.name })),
        multipleSelection: true,
        placeholder: 'Add Technologies'
      },
      '#addTechnologyModal'
    );
  };

  /**
   * Sorts an array of technologies according to the name
   *
   * @param string a
   * @param string b
   * @return integer
   */
  sortTechnologies = (a, b) => {
    const nameA = a.name.toUpperCase();
    const nameB = b.name.toUpperCase();
    if (nameA < nameB) return -1;
    if (nameA > nameB) return 1;
    return 0;
  };

  render() {
    const { project, renderTextInput } = this.props;
    return (
      <div className="col-12 col-lg-6">
        <div className="row mr-0 ml-0">
          {this.renderTopInputs()}
          {this.renderManagerInput()}
          {this.renderTechnologiesInput()}
          {renderTextInput({
            name: 'mockups',
            label: 'Invision Link',
            inputValue: project.mockups,
            testInput: input => urlRegex.test(input)
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
  fetchProjectManagers: PropTypes.shape().isRequired
};

export default ProjectFormLeft;
