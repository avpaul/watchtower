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
    const { deleteProjectVacancies, projectVacanciesOnFocus } = this.props;
    deleteProjectVacancies(projectVacanciesOnFocus);
  };

  /**
   * The onClick handler for the modal close buttons which include
   * the cancel and the return buttons
   */
  handleClose = () => {
    const { setProjectVacanciesOnFocus, history } = this.props;
    setProjectVacanciesOnFocus({});
    this.setState({ success: false });
    history.replace('/cadre/vacancies');
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
    const message = 'Project vacancies have been deleted!';
    return (
      <GenericModal
        id="deleteProjectVacanciesModal"
        title="Delete Project Vacancies"
        successMessage={message}
        success={success}
        footer={this.renderFooter()}
      >
        <React.Fragment>
          <p>Are you sure you want to delete these project vacancies?</p>
          {error ? (
            <span className="alert alert-danger" role="alert">
              Failed to delete the project vacancies. Please try again later!
            </span>
          ) : null}
        </React.Fragment>
      </GenericModal>
    );
  }
}

DeleteVacanciesModal.propTypes = {
  deleteProjectVacancies: PropTypes.func.isRequired,
  setProjectVacanciesOnFocus: PropTypes.func.isRequired,
  projectVacanciesOnFocus: PropTypes.shape().isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  history: PropTypes.shape().isRequired,
};

DeleteVacanciesModal.defaultProps = {
  error: null
};

export default DeleteVacanciesModal;
