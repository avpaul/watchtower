import React from 'react';
import PropTypes from 'prop-types';
import Modal from '../LargeModal/LargeModal';
import MapRoleActiveEngineers from '../MapRoleActiveEngineers';
import Loader from '../Loader/Loader';
import { pluralizeCheck, truncate } from '../../utils';
import EditCertificationModal from '../EditCertificationModal/EditCertificationModalContainer';

import './Card.scss';

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showMore: false,
      openModal: false,
      openCertification: false
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

  closeModal = () => {
    const { openModal, openCertification } = this.state;
    const {
      cardProps: { type }
    } = this.props;

    if (type === 'role') this.setState({ openModal: !openModal });
    else this.setState({ openCertification: !openCertification });
  };

  handleFocusRole = () => {
    const {
      focusRole,
      cardProps: { details }
    } = this.props;
    focusRole(details);
  };

  renderFullDescription = () => {
    const { showMore } = this.state;
    const {
      cardProps: { details }
    } = this.props;
    return showMore
      ? details.description
      : `${details.description.substring(0, 150)}`;
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
        ...{showMore ? ' hide' : ' see more'}
      </span>
    );
  };

  renderDescription = showMore => (
    <React.Fragment>
      <p className="role-card__description-title mt-2 mb-1">Description</p>
      <p className="role-card__description">
        {this.renderFullDescription()}
        {this.renderShowMoreButton(showMore)}
      </p>
    </React.Fragment>
  );

  renderCount = (count, event) => (
    <div className="text-left">
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
            <div className="text-left">
              <span className="role-card__attributes-count">
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

  renderProjectCardOptions = details => (
    <>
      <button
        type="button"
        data-toggle="modal"
        data-target="#editRoleModal"
        className="dropdown-item"
        onClick={this.handleFocusRole}
      >
        Edit Role
      </button>
      <button
        type="button"
        data-toggle="modal"
        data-target="#delete-role-modal"
        className="dropdown-item"
        onClick={this.handleFocusRole}
        disabled={details.active_engineers_count}
      >
        Delete Role
      </button>
    </>
  );

  renderCertificationCardOptions = () => (
    <>
      <button
        type="button"
        className="dropdown-item"
        onClick={this.openCertificationModal}
      >
        Edit Certification
      </button>
    </>
  );

  renderDropdown = type => {
    const {
      cardProps: { details }
    } = this.props;

    return (
      <div className="dropdown-menu dropdown-menu-right">
        {type === 'role'
          ? this.renderProjectCardOptions(details)
          : this.renderCertificationCardOptions()}
      </div>
    );
  };

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

  render() {
    const {
      cardProps: { details, loading, activeParticipants, type }
    } = this.props;
    const { showMore, openModal } = this.state;
    return (
      <div className="role-card">
        <div className="role-card__icon" data-toggle="dropdown" />
        {this.renderDropdown(type)}
        <div className="role-card__title">{truncate(details.name, 22)}</div>
        <p className="role-card__attributes-sm">
          Vacancies{' '}
          <span className="role-card__attributes-count-sm">
            {details.vacancies_count}
          </span>
        </p>
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
        {this.renderEditCertificationModal()}
      </div>
    );
  }
}

Card.propTypes = {
  cardProps: PropTypes.shape({}).isRequired,
  focusRole: PropTypes.func.isRequired
};

export default Card;
