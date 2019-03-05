import React from 'react';
import PropTypes from 'prop-types';

import profileDefaultPic from '../../static/profile.svg';

export const getFellowName = fellow =>
  fellow.user
    ? `${fellow.user.firstName} ${fellow.user.lastName}`
    : `${fellow.firstName} ${fellow.lastName}`;

const getFellowImage = fellow =>
  !fellow.picture ? profileDefaultPic : fellow.picture;

const FellowProfile = props => {
  const { fellow } = props;

  if (fellow === undefined || fellow.project === undefined) return <div />;

  let fellowName = getFellowName(fellow);
  fellowName =
    fellowName.length > 10 ? `${fellowName.substr(0, 10)}...` : fellowName;

  return (
    <div className="fellow-card">
      <div className="fellow-card__image">
        <img src={getFellowImage(fellow)} alt={`${fellowName} profile pic`} />
      </div>
      <div className="fellow-card__right">
        <div className="fellow-card__name">{fellowName}</div>
        <div className="fellow-card__project">{`${fellow.project}`}</div>
      </div>
    </div>
  );
};

FellowProfile.propTypes = {
  fellow: PropTypes.shape({
    image: PropTypes.string.isRequired,
    project: PropTypes.string.isRequired
  }).isRequired
};

export default FellowProfile;
