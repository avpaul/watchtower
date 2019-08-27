import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GenericModal from '../../../../components/GenericModal';
import { CadreMainButton } from '../../../../components/Buttons';
import Loader from '../../../../components/Loader/Loader';

import './deleteVacancyModal.css';

class DeleteVacanciesModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      success: false,
      error: ''
    };
  }

  componentDidUpdate(prevProps) {
    const {
      loadingProject,
      errorProject,
      loadingCertification,
      errorCertification
    } = this.props;

    if (prevProps.loadingProject && !loadingProject) {
      this.updateSubmitState(errorProject);
    } else if (prevProps.loadingCertification && !loadingCertification) {
      this.updateSubmitState(errorCertification);
    }
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
      deleteProjectVacancies,
      projectVacanciesOnFocus,
      deleteCertificationVacancies
    } = this.props;
    const { project, certification } = projectVacanciesOnFocus;

    if (project) {
      deleteProjectVacancies(projectVacanciesOnFocus);
    }
    if (certification) {
      deleteCertificationVacancies(projectVacanciesOnFocus);
    }
  };

  /**
   * The onClick handler for the modal close buttons which include
   * the cancel and the return buttons
   */
  handleClose = () => {
    const {
      setProjectVacanciesOnFocus,
      history,
      projectVacanciesOnFocus
    } = this.props;
    const { certification } = projectVacanciesOnFocus;
    setProjectVacanciesOnFocus({});
    this.setState({ success: false });
    const query = certification ? '?certification' : '';
    history.replace(`/cadre/vacancies${query}`);
  };

  renderButton = ({ label, buttonProps }) => (
    <CadreMainButton buttonProps={buttonProps} label={label} />
  );

  renderFooter = () => {
    const { loadingProject, loadingCertification } = this.props;
    const { success } = this.state;
    let button = null;

    switch (true) {
      case loadingProject || loadingCertification:
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
    const { projectVacanciesOnFocus } = this.props;
    const type = projectVacanciesOnFocus.project ? 'Project' : 'Certification';
    const { success, error } = this.state;
    const message = `${type} vacancy have been deleted!`;
    return (
      <GenericModal
        id="deleteVacanciesModal"
        title={`Delete ${type} Vacancy`}
        successMessage={message}
        success={success}
        footer={this.renderFooter()}
      >
        <React.Fragment>
          <p>
            Are you sure you want to delete this {type.toLowerCase()} vacancy?
          </p>
          {error ? (
            <span className="alert alert-danger" role="alert">
              Failed to delete the {type.toLowerCase()} vacancy. Please try
              again later!
            </span>
          ) : null}
        </React.Fragment>
      </GenericModal>
    );
  }
}

DeleteVacanciesModal.propTypes = {
  deleteProjectVacancies: PropTypes.func.isRequired,
  deleteCertificationVacancies: PropTypes.func.isRequired,
  setProjectVacanciesOnFocus: PropTypes.func.isRequired,
  projectVacanciesOnFocus: PropTypes.shape().isRequired,
  loadingProject: PropTypes.bool.isRequired,
  errorProject: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  loadingCertification: PropTypes.bool.isRequired,
  errorCertification: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  history: PropTypes.shape().isRequired
};

DeleteVacanciesModal.defaultProps = {
  errorProject: null,
  errorCertification: null
};

export default DeleteVacanciesModal;
