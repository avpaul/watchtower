import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FormInputs from '../../../../components/FormInputs';
import GenericModal from '../../../../components/GenericModal';
import { emailRegex } from '../../../../utils/regex';

class AddManagerModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inputs: {}
    };
  }

  /**
   * The onClick handler for the modal submit button
   *
   * @return boolean
   */
  handleClick = () => {
    const { addProjectManager } = this.props;
    const { inputs } = this.state;

    const invalidInput = Object.values(inputs).find(input => !input.isValid());
    if (invalidInput) {
      invalidInput.setStatus('invalid', 'Input is invalid!');
      invalidInput.focus();
      return false;
    }

    if (this.checkForExistingManager()) return false;

    addProjectManager({
      id: 0,
      name: inputs.managerName.getValue(),
      email: inputs.managerEmail.getValue()
    });
    return true;
  };

  /**
   * The onClick handler for the modal close buttons which include
   * the cancel and the return buttons
   */
  handleClose = () => {
    const { inputs } = this.state;
    inputs.managerName.setState({ inputValue: '' });
    inputs.managerEmail.setState({ inputValue: '' });
    inputs.managerName.setStatus('normal');
    inputs.managerEmail.setStatus('normal');
  };

  /**
   * Checks for the existence of a manager with the currently inputted email. The form should not allow
   * the creation of the project manager with an existing email.
   */
  checkForExistingManager() {
    const { inputs } = this.state;
    const { fetchProjectManagers } = this.props;
    const emailExists = fetchProjectManagers.data.find(
      manager => manager.email === inputs.managerEmail.getValue()
    );
    if (emailExists) {
      inputs.managerEmail.setStatus('invalid', 'Manager email already exists!');
      inputs.managerEmail.focus();
    }
    return !!emailExists;
  }

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

  renderModalBody = () => (
    <React.Fragment>
      {this.renderTextInput({
        name: 'managerName',
        label: 'Name'
      })}
      {this.renderTextInput({
        name: 'managerEmail',
        label: 'Email',
        testInput: input => emailRegex.test(input)
      })}
    </React.Fragment>
  );

  renderModalContent = () => (
    <div className="modal-content">
      <div className="modal-header">
        <h1>Add Project Manager</h1>
      </div>
      {}
      {this.renderModalFooter()}
    </div>
  );

  render() {
    const message = 'This team manager has been added to the project form!';
    return (
      <GenericModal
        id="addManagerModal"
        title="Add Team Manager"
        handleSubmit={this.handleClick}
        handleClose={this.handleClose}
        successMessage={message}
      >
        {this.renderModalBody()}
      </GenericModal>
    );
  }
}

AddManagerModal.propTypes = {
  addProjectManager: PropTypes.func.isRequired,
  fetchProjectManagers: PropTypes.shape().isRequired
};

export default AddManagerModal;
