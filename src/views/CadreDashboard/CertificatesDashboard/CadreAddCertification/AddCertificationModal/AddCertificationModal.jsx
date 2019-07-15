import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FormInputs from '../../../../../components/FormInputs';
import GenericModal from '../../../../../components/GenericModal';
import Loader from '../../../../../components/Loader/Loader';
import './AddCertificationModal.scss';
import RadioButton from '../../../../../components/RadioButton/RadioButton';

class AddCertificationModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inputs: {},
      success: false,
      exclusive: false
    };
  }

  componentDidUpdate(prevProps) {
    const { certifications } = this.props;
    if (
      certifications.error &&
      prevProps.certifications.error !== certifications.error
    ) {
      this.handleSubmissionError(certifications.error);
    }
    if (prevProps.certifications.loading && !certifications.loading) {
      this.createCertificationStatus(certifications);
    }
  }

  createCertificationStatus = certificationStatus => {
    if (
      !certificationStatus.error &&
      certificationStatus.data.name !== undefined
    ) {
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

  handleClose = () => {
    const { history } = this.props;
    this.setState({ success: false });
    history.replace('/cadre/certifications');
  };

  handleSubmit = () => {
    const { addCertification } = this.props;
    const {
      inputs: { name, description, duration },
      exclusive
    } = this.state;

    if (!name.isValid()) {
      name.setStatus(
        'invalid',
        'A valid name is required for the certification'
      );
      return false;
    }

    if (!description.isValid()) {
      description.setStatus(
        'invalid',
        'Description is required for the certification'
      );
      return false;
    }

    if (!duration.isValid()) {
      duration.setStatus(
        'invalid',
        'A duration is required for the certification'
      );
      return false;
    }

    const CertificationData = {
      name: name.getValue(),
      description: description.getValue(),
      duration: duration.getValue(),
      exclusive
    };

    addCertification(CertificationData);
    return false;
  };

  saveCertificationButton = () => {
    const { success } = this.state;
    const { certifications } = this.props;
    let button = (
      <button
        type="button"
        className="btn"
        id="saveCertificationButton"
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
          id="closeCertificationModal"
          data-dismiss="modal"
          onClick={this.handleClose}
        >
          CLOSE
        </button>
      );
    }
    if (certifications.loading) {
      button = <Loader size="small" />;
    }
    return <div className="modal-footer">{button}</div>;
  };

  handleChange = () => {
    const { exclusive } = this.state;
    this.setState({
      exclusive: !exclusive
    });
  };

  renderRadioButton = exclusive => (
    <RadioButton
      name="exclusive"
      value={exclusive}
      handleChange={this.handleChange}
      placeholder={exclusive}
      options={
        exclusive
          ? 'Certification is Exclusive'
          : 'Certification is not Exclusive'
      }
    />
  );

  renderBody = () => {
    const { exclusive } = this.state;
    return (
      <React.Fragment>
        <FormInputs.TextInput
          parent={this}
          name="name"
          label="Certification Name"
          placeholder="Certification Name"
          testInput={value => value.trim() !== ''}
        />
        <FormInputs.TextInput
          parent={this}
          name="description"
          label="Certification Description"
          type="textarea"
          placeholder="Description"
          testInput={value => value.trim() !== ''}
        />
        <FormInputs.TextInput
          parent={this}
          name="duration"
          label="Duration"
          placeholder="Days"
          testInput={value => value.trim() !== ''}
        />
        {this.renderRadioButton(exclusive)}
      </React.Fragment>
    );
  };

  render() {
    const message = 'New Certification created Successfully';
    const { success } = this.state;

    return (
      <GenericModal
        id="addCertificationModal"
        title="Create Certification"
        footer={this.saveCertificationButton()}
        success={success}
        successMessage={message}
      >
        {this.renderBody()}
      </GenericModal>
    );
  }
}

AddCertificationModal.propTypes = {
  allCertifications: PropTypes.shape({}).isRequired,
  addCertification: PropTypes.shape().isRequired,
  certifications: PropTypes.shape().isRequired,
  history: PropTypes.shape({}).isRequired
};

export default AddCertificationModal;
