import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../FellowBio/FellowBio.scss';
import './EngineerBio.scss';
import EngineerCard from './EngineerCard';
/**
 * Class representing the dashboard page
 * @class
 */

export default function EngineerBio({ d1Fellow }) {
  return <EngineerCard data={d1Fellow} />;
}

EngineerBio.propTypes = {
  d1Fellow: PropTypes.shape().isRequired
};

const mapStateToProps = ({ d1Fellow }) => ({
  d1Fellow
});

export const EngineerBioConnected = connect(mapStateToProps)(EngineerBio);
