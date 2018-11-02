import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Header from '../../components/Header';
import comingSoon from '../../static/blue-coming-soon.png';


/**
 * Class representing the dashboard page
 * @class
 */

const FellowDashboardPage = (props) => (
    <Fragment>
    <Header {...props}/>
    <h1 style={{ marginTop: '5%', textAlign: 'center', color: '#0459E4' }}>
      <img src={comingSoon} alt="Coming soon" />
      <br />
    Something great coming here soon!
    </h1>

  </Fragment>
  );


export default FellowDashboardPage;

FellowDashboardPage.propTypes = {
  user: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
};
