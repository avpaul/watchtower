import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Header from '../../components/Header';


/**
 * Class representing the dashboard page
 * @class
 */

const FellowDashboardPage = (props) => {
  const { user, role } = props;
  return (
    <Fragment>
      <Header role={role} user={user} />
    </Fragment>
  );
};


export default FellowDashboardPage;

FellowDashboardPage.propTypes = {
  user: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
};
