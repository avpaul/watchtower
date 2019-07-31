import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AddIcon from '../../../../static/plus.png';
import FormInputs from '../../../../components/FormInputs';
import GenericModal from '../../../../components/GenericModal';
import Loader from '../../../../components/Loader/Loader';
import { numberRegex } from '../../../../utils/regex';

import './AddRoleModal.scss';

class AddRoleModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inputs: {},
      skills: [],
      newSkill: '',
      success: false
    };
  }

  componentDidMount() {
    const { getRoleSkills } = this.props;
    getRoleSkills();
  }

  componentDidUpdate(prevProps) {
    const { createRole, roleSkills } = this.props;
    if (roleSkills.loading !== prevProps.roleSkills.loading) {
      this.addRoleSkills();
    }
    if (createRole.error && prevProps.createRole.error !== createRole.error) {
      this.handleSubmissionError(createRole.error);
    }
    if (prevProps.createRole.loading && !createRole.loading) {
      this.createRoleStatus(createRole);
    }
  }

  createRoleStatus = roleStatus => {
    if (!roleStatus.error && roleStatus.data.name !== undefined) {
      this.setState({ success: true });
    }
  };

  handleSubmissionError = error => {
    const { inputs } = this.state;
    if (typeof error === 'object')
      Object.keys(error).forEach(key =>
        inputs[key].setStatus('invalid', error[key][0])
      );
  };

  getSkills = skillsObject => {
    const skills = skillsObject.map(skill => skill.label);
    return skills;
  };

  /**
   * The onClick handler for the modal submit button
   *
   * @return boolean
   */
  handleSubmit = () => {
    const { createNewRole } = this.props;
    const {
      inputs: { name, description, skills, duration }
    } = this.state;

    if (!name.isValid()) {
      name.setStatus('invalid', 'Please provide an input!');
      return false;
    }
    if (!duration.isValid()) {
      duration.setStatus('invalid', 'Please provide an input!');
      return false;
    }
    if (!description.isValid()) {
      description.setStatus('invalid', 'Please provide an input!');
      return false;
    }
    const roleData = {
      name: name.getValue(),
      description: description.getValue(),
      skills: this.getSkills(skills.getValue()),
      duration: duration.getValue()
    };
    createNewRole(roleData);
    return false;
  };

  handleSkillChange = e => this.setState({ newSkill: e.target.value });

  prepareSkills = () => {
    const { skills } = this.state;
    return skills.map(skill => ({
      ...skill,
      label: skill.name
    }));
  };

  addRoleSkills = () => {
    const { roleSkills } = this.props;
    this.setState({ skills: roleSkills.data });
  };

  addNewSkill = () => {
    const { inputs, newSkill } = this.state;
    if (newSkill.trim() === '') return;
    inputs.skills.addSelection(newSkill);
    inputs.skills.setState({ show: false });
    this.setState({ newSkill: '' });
  };

  /**
   * The onClick handler for the modal close buttons which include
   * the cancel and the return buttons
   */
  handleClose = () => {
    const { history } = this.props;
    this.setState({ success: false });
    history.replace('/cadre/roles');
  };

  dropdownProps = () => ({
    name: 'skills',
    label: 'Skills',
    inputValue: [],
    options: this.prepareSkills(),
    multipleSelection: true,
    placeholder: 'Add skills',
    enableSearch: true,
    dropDownFor: 'skills'
  });

  dropdownExtras = () => {
    const { newSkill } = this.state;
    return (
      <div className="add-skills wt-dropdown__list__item">
        <input
          type="text"
          placeholder="Add skills ..."
          value={newSkill}
          onChange={this.handleSkillChange}
          id="addSkillsInput"
        />
        <button type="button" id="addSkillsButton" onClick={this.addNewSkill}>
          <span id="addSkillsButtonImage">
            <img src={AddIcon} alt="Add Icon" />
          </span>
        </button>
      </div>
    );
  };

  saveRoleButton = () => {
    const { success } = this.state;
    const { createRole } = this.props;
    let button = (
      <button
        type="button"
        className="btn"
        id="saveRoleButton"
        onClick={this.handleSubmit}
      >
        CREATE
      </button>
    );
    if (success) {
      button = (
        <button
          type="button"
          className="btn"
          id="closeRoleModal"
          data-dismiss="modal"
          onClick={this.handleClose}
        >
          CLOSE
        </button>
      );
    }
    if (createRole.loading) {
      button = <Loader size="small" />;
    }
    return <div className="modal-footer">{button}</div>;
  };

  renderBody = () => (
    <React.Fragment>
      <FormInputs.TextInput
        parent={this}
        name="name"
        label="Role Name"
        placeholder="Enter Role Name"
        testInput={value => value.trim() !== ''}
      />
      <FormInputs.TextInput
        parent={this}
        name="duration"
        label="Role Duration (months)"
        placeholder="Enter duration"
        testInput={input => numberRegex.test(input) && input !== '0'}
        alertText="Please input a valid duration!"
      />
      <FormInputs.DropdownInput
        parent={this}
        {...this.dropdownProps()}
        extras={this.dropdownExtras()}
      />
      <FormInputs.TextInput
        parent={this}
        name="description"
        label="Role Description"
        type="textarea"
        placeholder="Enter description"
        testInput={value => value.trim() !== ''}
      />
    </React.Fragment>
  );

  render() {
    const message = 'New role created sucessfully';
    const { success } = this.state;

    return (
      <GenericModal
        id="addRoleModal"
        title="Create Role"
        footer={this.saveRoleButton()}
        success={success}
        successMessage={message}
      >
        {this.renderBody()}
      </GenericModal>
    );
  }
}

AddRoleModal.propTypes = {
  createNewRole: PropTypes.func.isRequired,
  createRole: PropTypes.shape().isRequired,
  history: PropTypes.shape().isRequired,
  roleSkills: PropTypes.shape().isRequired,
  getRoleSkills: PropTypes.func.isRequired
};

export default AddRoleModal;
