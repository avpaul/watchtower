import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import getTimeMessage from '../../utils/getTimeMessage';
import './index.scss';

const WelcomeMessage = props => {
  const { user } = props;
  const currentHour = parseFloat(moment().format('HH.mm'));

  const message = getTimeMessage(currentHour, user.first_name);

  return (
    <div>
      <span className="welcome-text">{message}</span>
    </div>
  );
};

WelcomeMessage.propTypes = {
  user: PropTypes.shape({}).isRequired
};

export default WelcomeMessage;
