import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GenericModal from '../../../../components/GenericModal';
import { CadreMainButton } from '../../../../components/Buttons';
import Loader from '../../../../components/Loader/Loader';

import './deleteCertificationModal.scss';

class DeleteCertificationModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      success: false,
      error: ''
    };
  }

  componentDidUpdate(prevProps) {
    const { loading, error } = this.props;
    if (prevProps.loading && !loading) this.updateSubmitState(error);
  }

  updateSubmitState = error =>
    this.setState({
      success: error === null,
      error
    });

  /**
   * The onClick handler for the modal submit button
   *
   * @return boolean
   */
  handleClick = () => {
    const {
      deleteCertification,
      certificationOnFocus: { id }
    } = this.props;
    deleteCertification(id);
  };

  /**
   * The onClick handler for the modal close buttons which include
   * the cancel and the return buttons
   */
  handleClose = () => {
    const { setCertificationOnFocus } = this.props;
    setCertificationOnFocus({});
    this.setState({ success: false });
  };

  renderButton = ({ label, buttonProps = {} }) => (
    <CadreMainButton buttonProps={buttonProps} label={label} />
  );

  renderFooter = () => {
    const { loading } = this.props;
    const { success } = this.state;
    let button = null;

    switch (true) {
      case loading:
        button = <Loader size="small" />;
        break;
      case success:
        button = this.renderButton({
          label: 'CLOSE',
          buttonProps: { 'data-dismiss': 'modal', onClick: this.handleClose }
        });
        break;
      default:
        button = this.renderButton({
          label: 'DELETE',
          buttonProps: { onClick: this.handleClick }
        });
    }

    return <div className="modal-footer">{button}</div>;
  };

  render() {
    const { success, error } = this.state;
    const message = 'Project certification have been deleted!';
    return (
      <GenericModal
        id="deleteCertificationModal"
        title="Delete Certification"
        successMessage={message}
        success={success}
        footer={this.renderFooter()}
      >
        <React.Fragment>
          <p>Are you sure you want to delete these Certification?</p>
          {error ? (
            <span className="alert alert-danger" role="alert">
              Failed to delete the Certification. Please try again later!
            </span>
          ) : null}
        </React.Fragment>
      </GenericModal>
    );
  }
}

DeleteCertificationModal.propTypes = {
  deleteCertification: PropTypes.func.isRequired,
  setCertificationOnFocus: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  certificationOnFocus: PropTypes.shape({}).isRequired
};

DeleteCertificationModal.defaultProps = {
  error: null
};

export default DeleteCertificationModal;
