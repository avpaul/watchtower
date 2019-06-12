import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FormInputs from '../../../../components/FormInputs';
import GenericModal from '../../../../components/GenericModal';

class AddTechnologyModal extends Component {
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
    const { addProjectTechnology } = this.props;
    const { inputs } = this.state;

    if (!inputs.technology.isValid()) {
      inputs.technology.setStatus('invalid', 'Input is empty!');
      inputs.technology.focus();
      return false;
    }

    addProjectTechnology(inputs.technology.getValue());
    return true;
  };

  /**
   * The onClick handler for the modal close buttons which include
   * the cancel and the return buttons
   */
  handleClose = () => {
    const { inputs } = this.state;
    inputs.technology.setState({ inputValue: '' });
    inputs.technology.setStatus('normal');
  };

  render() {
    return (
      <GenericModal
        id="addTechnologyModal"
        title="Add Technology"
        handleSubmit={this.handleClick}
        handleClose={this.handleClose}
      >
        <FormInputs.TextInput
          parent={this}
          name="technology"
          label="Technology"
        />
      </GenericModal>
    );
  }
}

AddTechnologyModal.propTypes = {
  addProjectTechnology: PropTypes.func.isRequired
};

export default AddTechnologyModal;
