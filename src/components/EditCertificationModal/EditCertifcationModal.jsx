import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from '../LargeModal/LargeModal';
import EditInput from './EditInputs/EditInput';
import RadioButton from '../RadioButton/RadioButton';
import EditTextArea from './EditTextarea/EditTextarea';
import Loader from '../Loader/Loader';
import './EditCertificationModal.scss';

class EditCertificationModal extends Component {
  constructor(props) {
    super(props);
    const {
      data: { name, description, duration, exclusive }
    } = this.props;
    this.state = {
      name,
      description,
      duration,
      exclusive
    };
  }

  handleInput = e => {
    const { name, value } = e.target;
    this.setState(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  handleSwitch = () => {
    const { exclusive } = this.state;
    this.setState({
      exclusive: !exclusive
    });
  };

  clearForm = () => {
    const {
      data: { name, description, duration, exclusive },
      toggle
    } = this.props;
    this.setState({
      name,
      description,
      duration,
      exclusive
    });
    toggle();
  };

  renderRadio = exclusive => (
    <RadioButton
      name="exclusive"
      value={exclusive}
      handleChange={this.handleSwitch}
      placeholder={exclusive}
      options={
        exclusive ? 'Certicicate is Exclusive' : 'Certicicate is not Exclusive'
      }
    />
  );

  renderInput = (title, name, type, value, event) => (
    <EditInput
      title={title}
      name={name}
      inputType={type}
      value={value}
      handleChange={event}
      min="0"
    />
  );

  renderTextarea = (title, name, value, event) => (
    <EditTextArea
      title={title}
      name={name}
      value={value}
      handleChange={event}
    />
  );

  renderFooter = (event, text) => {
    const { loading } = this.props;
    return (
      <div className="form-footer">
        {loading ? (
          <Loader size="small" />
        ) : (
          <button type="submit" onClick={event} className="form-submit">
            {text}
          </button>
        )}
      </div>
    );
  };

  onClose = () => {
    const { history, toggle } = this.props;
    toggle();
    history.replace('/cadre/certifications');
  };

  handleSuccess = () => {
    const { name, description, duration, exclusive } = this.state;
    const {
      editCertification,
      data: { id },
      error
    } = this.props;
    const data = {
      name,
      description,
      duration,
      exclusive
    };
    editCertification(id, data);
    if (error === null) {
      toast.success('Certificate succesfully updated', {
        autoClose: 1300,
        onClose: () => this.onClose(),
        closeButton: false,
        pauseOnHover: false,
        hideProgressBar: true
      });
    } else {
      toast.error('Error Updating Certificate ', {
        autoClose: 1300,
        closeButton: false,
        pauseOnHover: false,
        hideProgressBar: true
      });
    }
  };

  render() {
    const { open } = this.props;
    const { name, description, duration, exclusive } = this.state;
    return (
      <Modal show={open} handleClose={this.clearForm} size="medium" showBtn>
        <ToastContainer />
        <div className="form-body">
          <p className="modal__title-md">Edit Certification</p>
          {this.renderInput('Name', 'name', 'text', name, this.handleInput)}
          {this.renderRadio(exclusive)}
          {this.renderInput(
            'Duration',
            'duration',
            'number',
            duration,
            this.handleInput
          )}
          {this.renderTextarea(
            'Description',
            'description',
            description,
            this.handleInput
          )}
          {this.renderFooter(this.handleSuccess, 'Update')}
        </div>
      </Modal>
    );
  }
}

EditCertificationModal.propTypes = {
  open: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  data: PropTypes.oneOfType([PropTypes.object]).isRequired,
  editCertification: PropTypes.func.isRequired,
  history: PropTypes.shape().isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.shape()
};

EditCertificationModal.defaultProps = {
  error: null
};

export default EditCertificationModal;
