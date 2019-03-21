import React from 'react';
import PropTypes from 'prop-types';

import profileDefaultPic from '../../static/profile.svg';

const getImage = user => (!user.picture ? profileDefaultPic : user.picture);

const HistoryCard = props => {
  const { user } = props;

  if (!user) return <div />;

  return (
    <div className="fellow-history-card">
      <div className="fellow-history-card__image">
        <img src={getImage(user)} alt={`${user.name} profile pic`} />
      </div>
      <div className="fellow-history-card__right">
        <div className="fellow-history-card__name">{user.name}</div>
        <div className="fellow-history-card__detail">{`${user.detail}`}</div>
      </div>
    </div>
  );
};

HistoryCard.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    detail: PropTypes.string.isRequired
  }).isRequired
};

export default HistoryCard;
