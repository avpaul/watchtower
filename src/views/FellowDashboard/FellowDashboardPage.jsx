import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FellowBioConnected } from '../../components/FellowBio';
import getFellowBio from '../../redux/actionCreators/fellowBioActions';

export const FellowDashboardPage = props => (
  <Fragment>
    <FellowBioConnected {...props} />
  </Fragment>
);

const mapStateToProps = ({ fellow }) => ({
  fellow
});

FellowDashboardPage.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string.isRequired
  }).isRequired,
  getFellow: PropTypes.func.isRequired
};
export const FellowDashboardPageConnected = connect(
  mapStateToProps,
  {
    getFellow: getFellowBio
  }
)(FellowDashboardPage);
