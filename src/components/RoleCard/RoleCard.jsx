import React from 'react';
import PropTypes from 'prop-types';
import More from '../../static/More.svg';
import Modal from '../LargeModal/LargeModal';
import MapRoleActiveEngineers from '../MapRoleActiveEngineers';
import Loader from '../Loader/Loader';
import { pluralizeCheck } from '../../utils';

import './RoleCard.scss';

class RoleCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showMore: false,
      openModal: false
    };
  }

  handleShowMoreClick = () =>
    this.setState(state => ({ showMore: !state.showMore }));

  roleActiveEngineer = () => {
    const { role, fetchActiveEngineers } = this.props;
    const { openModal } = this.state;

    this.setState({ openModal: !openModal });

    return fetchActiveEngineers(role.id);
  };

  closeModal = () => {
    const { openModal } = this.state;
    this.setState({ openModal: !openModal });
  };

  renderFullDescription = () => {
    const { showMore } = this.state;
    const { role } = this.props;
    return showMore
      ? role.description
      : `${role.description.substring(0, 150)}`;
  };

  renderShowMoreButton = showMore => {
    const { role } = this.props;
    return role.description.length < 100 ? (
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

  renderPositionsCount = role => (
    <div className="row">
      <div className="col-6">
        <div className="role-card__attributes">
          Applicants <br />{' '}
          <div className="text-left">
            <span className="role-card__attributes-count">
              {role.applications_count}
            </span>
          </div>
        </div>
      </div>
      <div className="col-6">
        <p className="role-card__attributes">
          Active Engrs. <br />
          {this.renderCount(
            role.active_engineers_count,
            this.roleActiveEngineer
          )}
        </p>
      </div>
    </div>
  );

  renderModal = (role, open, loading, data) => (
    <Modal
      show={open}
      handleClose={this.closeModal}
      title={`${role.active_engineers_count} ${pluralizeCheck(
        role.name,
        role.active_engineers_count
      )}`}
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

  render() {
    const { role, loading, activeEngineers } = this.props;
    const { showMore, openModal } = this.state;
    return (
      <div className="role-card">
        <div className="row">
          <div className="col-12">
            <div className="role-card__icon">
              <img src={More} alt="" />
            </div>
          </div>
        </div>
        <div className="role-card__title">{role.name}</div>
        <p className="role-card__attributes-sm">
          Vacancies{' '}
          <span className="role-card__attributes-count-sm">
            {role.vacancies_count}
          </span>
        </p>
        <hr />
        {this.renderPositionsCount(role)}
        {this.renderDescription(showMore)}
        {this.renderModal(role, openModal, loading, activeEngineers)}
      </div>
    );
  }
}

RoleCard.propTypes = {
  role: PropTypes.shape({}).isRequired,
  fetchActiveEngineers: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  activeEngineers: PropTypes.shape({}).isRequired
};
export default RoleCard;
