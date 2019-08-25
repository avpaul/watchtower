import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Modal from '../LargeModal/LargeModal';
import MapRoleActiveEngineers from '../MapRoleActiveEngineers';
import Loader from '../Loader/Loader';
import { pluralizeCheck, truncate } from '../../utils';
import EditCertificationModal from '../EditCertificationModal/EditCertificationModalContainer';
import ViewRoleApplicantsModal from '../../views/CadreDashboard/RolesDashboard/ViewRoleApplicants';

import './Card.scss';
import ViewCertificationApplicantsModal from '../../views/CadreDashboard/CertificatesDashboard/ViewCertificationApplicants';
import ViewCertifiedEngineersModal from '../../views/CadreDashboard/CertificatesDashboard/ViewCertifiedEngineers';

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showMore: false,
      modals: {
        openModal: false,
        openCertification: false,
        showCertificationApplicants: false,
        showRoleApplicants: false,
        showCertifiedEngineers: false
      }
    };
  }

  handleShowMoreClick = () =>
    this.setState(state => ({ showMore: !state.showMore }));

  roleActiveEngineer = () => {
    this.modalHandler('openModal');
    const {
      cardProps: { details, fetcher }
    } = this.props;
    fetcher(details.id);
    const { modals } = this.state;
    this.setState({ modals: { ...modals, openModal: !modals.openModal } });
  };

  handleFocusDetails = () => {
    const {
      focusRole,
      cardProps: { details, type },
      setCertificationOnFocus
    } = this.props;
    return type === 'role'
      ? focusRole(details)
      : setCertificationOnFocus(details);
  };

  modalHandler = slice => () => {
    this.setState(prevState => ({
      modals: {
        ...prevState.modals,
        [slice]: !prevState.modals[slice]
      }
    }));
  };

  getModalState = slice => {
    const { modals } = this.state;
    return modals[slice];
  };

  renderRoleApplicantsModal = () => {
    const {
      cardProps: {
        details: { id, name }
      }
    } = this.props;

    const showRoleApplicants = this.getModalState('showRoleApplicants');
    return (
      <ViewRoleApplicantsModal
        id="roleApplicantsModal"
        open={showRoleApplicants}
        toggle={this.modalHandler('showRoleApplicants')}
        roleId={id}
        title={name}
      />
    );
  };

  renderFullDescription = () => {
    const { showMore } = this.state;
    const {
      cardProps: { details }
    } = this.props;
    return showMore
      ? details.description
      : `${details.description.substring(0, 100)}`;
  };

  renderShowMoreButton = showMore => {
    const {
      cardProps: { details }
    } = this.props;
    return details.description.length < 100 ? (
      ''
    ) : (
      <span
        className="role-card__attributes-seemore"
        onClick={this.handleShowMoreClick}
        onKeyPress={this.handleShowMoreClick}
        role="button"
        tabIndex="-1"
      >
        {showMore ? ' hide' : ' ...see more'}
      </span>
    );
  };

  renderDescription = showMore => (
    <React.Fragment>
      <p className="role-card__description-title mt-3 mb-2">Description</p>
      <p className="role-card__description">
        {this.renderFullDescription()}
        {this.renderShowMoreButton(showMore)}
      </p>
    </React.Fragment>
  );

  renderCount = (count, handler) => (
    <div className="text-left pt-2">
      <span
        className="role-card__attributes-count"
        onClick={count > 0 ? handler : undefined}
        onKeyPress={count > 0 ? handler : undefined}
        role="button"
        tabIndex="-1"
      >
        {count}
      </span>
    </div>
  );

  renderPositionsCount = (details, type) => {
    const count =
      type === 'role'
        ? details.active_engineers_count
        : details.certified_engineers;

    return (
      <div className="row">
        <div className="col-6">
          <div className="role-card__attributes">
            Applicants <br />{' '}
            <div className="text-left pt-2">
              <span
                tabIndex="0"
                role="button"
                className="role-card__attributes-count"
                id="applicants_count"
                onClick={
                  type === 'role'
                    ? this.modalHandler('showRoleApplicants')
                    : this.modalHandler('showCertificationApplicants')
                }
                onKeyPress={
                  type === 'role'
                    ? this.modalHandler('showRoleApplicants')
                    : this.modalHandler('showCertificationApplicants')
                }
              >
                {details.applications_count}
              </span>
            </div>
          </div>
        </div>
        <div className="col-6">
          <div className="role-card__attributes">
            {type === 'role' ? 'Active engrs.' : 'Cert Engrs.'} <br />
            {this.renderCount(count, () => {
              if (type === 'role') {
                return this.roleActiveEngineer();
              }
              const { modals } = this.state;
              return this.setState({
                modals: {
                  ...modals,
                  showCertifiedEngineers: !modals.showCertifiedEngineers
                }
              });
            })}
          </div>
        </div>
      </div>
    );
  };

  renderModal = (details, open, loading, data, type, projects) => {
    const count =
      type === 'role'
        ? details.active_engineers_count
        : details.certified_engineers;
    const modalToHandle = type === 'role' ? 'openModal' : 'openCertification';

    return (
      <Modal
        show={open}
        handleClose={this.modalHandler(modalToHandle)}
        title={`${count} ${pluralizeCheck(details.name, count)}`}
      >
        {loading ? (
          <Loader />
        ) : (
          <div className="modal__body-card">
            <MapRoleActiveEngineers roleData={data} projects={projects} />
          </div>
        )}
      </Modal>
    );
  };

  renderDropdownButton = (modalTarget, label, onClick, details) => (
    <button
      type="button"
      data-toggle="modal"
      className="dropdown-item"
      data-target={modalTarget}
      onClick={onClick}
      disabled={details ? details.active_engineers_count : null}
    >
      {label}
    </button>
  );

  renderDropdown = (type, details) => (
    <div className="dropdown-menu dropdown-menu-right">
      {type === 'role' ? (
        <Fragment>
          {this.renderDropdownButton(
            '#editRoleModal',
            'Edit Role',
            this.handleFocusDetails
          )}
          {this.renderDropdownButton(
            '#delete-role-modal',
            'Delete Role',
            this.handleFocusDetails,
            details
          )}
        </Fragment>
      ) : (
        <Fragment>
          {this.renderDropdownButton(
            null,
            'Edit Certification',
            this.modalHandler('openCertification')
          )}
          {this.renderDropdownButton(
            '#deleteCertificationModal',
            'Delete  Certification',
            this.handleFocusDetails
          )}
        </Fragment>
      )}
    </div>
  );

  renderEditCertificationModal = () => {
    const {
      cardProps: { details }
    } = this.props;
    const openCertification = this.getModalState('openCertification');

    return (
      <EditCertificationModal
        open={openCertification}
        data={details}
        toggle={this.modalHandler('openCertification')}
      />
    );
  };

  renderViewCertificationApplicantsModal = () => {
    const {
      cardProps: {
        details: { id, name }
      }
    } = this.props;
    const showCertificationApplicants = this.getModalState(
      'showCertificationApplicants'
    );

    return (
      <ViewCertificationApplicantsModal
        open={showCertificationApplicants}
        toggle={this.modalHandler('showCertificationApplicants')}
        certificationId={id}
        title={name}
      />
    );
  };

  renderViewCertifiedEngineersModal = () => {
    const {
      cardProps: {
        details: { id, name }
      }
    } = this.props;

    const showCertifiedEngineers = this.getModalState('showCertifiedEngineers');

    return (
      <ViewCertifiedEngineersModal
        open={showCertifiedEngineers}
        toggle={this.modalHandler('showCertifiedEngineers')}
        certificationId={id}
        title={name}
      />
    );
  };

  render() {
    const {
      cardProps: { details, loading, activeParticipants, type, projects }
    } = this.props;
    const {
      showMore,
      modals: {
        openModal,
        openCertification,
        showCertificationApplicants,
        showRoleApplicants,
        showCertifiedEngineers
      }
    } = this.state;

    return (
      <div className="role-card">
        <div className="px-4">
          <div className="role-card__icon" data-toggle="dropdown" />
          {this.renderDropdown(type)}
          <div className="role-card__title">{truncate(details.name, 22)}</div>
          <p className="role-card__attributes-sm">
            Vacancies:
            <span className="role-card__attributes-count-sm">
              {' '.concat(details.vacancies_count)}
            </span>
          </p>
          <p className="role-card__attributes-sm">
            Duration:
            <span className="role-card__attributes-count-sm">
              {' '.concat(
                details.duration,
                type === 'certificates' ? ' Days' : ' Months'
              )}
            </span>
          </p>
        </div>
        <hr />
        <div className="ml-2 mr-2 px-3">
          {this.renderPositionsCount(details, type)}
          {this.renderDescription(showMore)}
        </div>
        {this.renderModal(
          details,
          openModal,
          loading,
          activeParticipants,
          type,
          projects
        )}
        {openCertification && this.renderEditCertificationModal()}
        {showCertificationApplicants &&
          this.renderViewCertificationApplicantsModal()}
        {showCertifiedEngineers && this.renderViewCertifiedEngineersModal()}
        {showRoleApplicants && this.renderRoleApplicantsModal()}
      </div>
    );
  }
}

Card.defaultProps = {
  setCertificationOnFocus: false
};

Card.propTypes = {
  cardProps: PropTypes.shape({}).isRequired,
  focusRole: PropTypes.func.isRequired,
  setCertificationOnFocus: PropTypes.bool
};

export default Card;
