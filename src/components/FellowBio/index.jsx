import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './FellowBio.css';
import BioCard from './BioCard';
import ProjectCard from './ProjectCard';
/**
 * Class representing the dashboard page
 * @class
 */

export default function FellowBio({ fellow }) {
  return (
    <Fragment>
      <div className="row m-0 fellow-bio-container justify-content-between">
        <BioCard data={fellow} />
        <ProjectCard data={fellow} />
      </div>
    </Fragment>
  );
}

FellowBio.propTypes = {
  fellow: PropTypes.shape().isRequired
};

const mapStateToProps = ({ fellow }) => ({
  fellow
});

export const FellowBioConnected = connect(mapStateToProps)(FellowBio);
