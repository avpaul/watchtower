import React from 'react';
import PropTypes from 'prop-types';
import More from '../../static/More.svg';

import './RoleCard.css';

class RoleCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showMore: false
    };
  }

  handleShowMoreClick = () =>
    this.setState(state => ({ showMore: !state.showMore }));

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
        <div className="role-card__attributes">
          Active Engrs. <br />{' '}
          <div className="text-left">
            <span className="role-card__attributes-count">
              {role.active_engineers_count}
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  render() {
    const { role } = this.props;
    const { showMore } = this.state;
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
      </div>
    );
  }
}

RoleCard.propTypes = {
  role: PropTypes.shape({}).isRequired
};
export default RoleCard;
