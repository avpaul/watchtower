import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Modal from '../LargeModal/LargeModal';
import MapRoleActiveEngineers from '../MapRoleActiveEngineers';
import Loader from '../Loader/Loader';
import { pluralizeCheck, truncate } from '../../utils';
import EditCertificationModal from '../EditCertificationModal/EditCertificationModalContainer';

import './Card.scss';
import ViewCertificationApplicantsModal from '../../views/CadreDashboard/CertificatesDashboard/ViewCertificationApplicants';

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showMore: false,
      openModal: false,
      openCertification: false,
      showCertificationApplicants: false
    };
  }

  handleShowMoreClick = () =>
    this.setState(state => ({ showMore: !state.showMore }));

  roleActiveEngineer = () => {
    const {
      cardProps: { details, fetcher }
    } = this.props;
    const { openModal } = this.state;

    this.setState({ openModal: !openModal });
    return fetcher(details.id);
  };

  openCertificationModal = () => {
    const { openCertification } = this.state;
    this.setState({ openCertification: !openCertification });
  };

  certificationApplicantsModalHandler = () => {
    const {
      cardProps: { details }
    } = this.props;
    if (details.applications_count) {
      const { showCertificationApplicants } = this.state;
      this.setState({
        showCertificationApplicants: !showCertificationApplicants
      });
    }
  };

  closeModal = () => {
    const { openModal, openCertification } = this.state;
    const {
      cardProps: { type }
    } = this.props;

    if (type === 'role') this.setState({ openModal: !openModal });
    else this.setState({ openCertification: !openCertification });
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

  renderCount = (count, event) => (
    <div className="text-left pt-2">
      <span
        className="role-card__attributes-count"
        onClick={count > 0 ? event : ''}
        onKeyPress={count > 0 ? event : ''}
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
                className="role-card__attributes-count"
                tabIndex="0"
                role="button"
                id="certification_applicants_count"
                onClick={this.certificationApplicantsModalHandler}
                onKeyPress={this.certificationApplicantsModalHandler}
              >
                {details.applications_count}
              </span>
            </div>
          </div>
        </div>
        <div className="col-6">
          <p className="role-card__attributes">
            {type === 'role' ? 'Active Engrs.' : 'Certified Engrs.'} <br />
            {this.renderCount(count, this.roleActiveEngineer)}
          </p>
        </div>
      </div>
    );
  };

  renderModal = (details, open, loading, data, type) => {
    const count =
      type === 'role'
        ? details.active_engineers_count
        : details.certified_engineers;
    return (
      <Modal
        show={open}
        handleClose={this.closeModal}
        title={`${count} ${pluralizeCheck(details.name, count)}`}
      >
        {loading ? (
          <Loader />
        ) : (
          <div className="modal__body-card">
            <MapRoleActiveEngineers roleData={data} />
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
            this.openCertificationModal
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
    const { openCertification } = this.state;

    return (
      <EditCertificationModal
        open={openCertification}
        data={details}
        toggle={this.closeModal}
      />
    );
  };

  renderViewCertificationApplicantsModal = () => {
    const {
      cardProps: {
        details: { id, name }
      }
    } = this.props;
    const { showCertificationApplicants } = this.state;

    return (
      <ViewCertificationApplicantsModal
        open={showCertificationApplicants}
        toggle={this.certificationApplicantsModalHandler}
        certificationId={id}
        title={name}
      />
    );
  };

  render() {
    const {
      cardProps: { details, loading, activeParticipants, type }
    } = this.props;
    const {
      showMore,
      openModal,
      openCertification,
      showCertificationApplicants
    } = this.state;
    return (
      <div className="role-card">
        <div className="px-4">
          <div className="role-card__icon" data-toggle="dropdown" />
          {this.renderDropdown(type)}
          <div className="role-card__title">{truncate(details.name, 22)}</div>
          <p className="role-card__attributes-sm">
            Vacancies{' '}
            <span className="role-card__attributes-count-sm">
              {details.vacancies_count}
            </span>
          </p>
        </div>
        <hr />
        {this.renderPositionsCount(details, type)}
        {this.renderDescription(showMore)}
        {this.renderModal(
          details,
          openModal,
          loading,
          activeParticipants,
          type
        )}
        {openCertification && this.renderEditCertificationModal()}
        {showCertificationApplicants &&
          this.renderViewCertificationApplicantsModal()}
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
  setCertificationOnFocus: PropTypes.func
};

export default Card;
