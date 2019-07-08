import React from 'react';
import PropTypes from 'prop-types';
import ProfileCard from './profileCard';
import ProjectCards from './ProjectCards';

import './EngineerBio.scss';

const renderEngineerDetails = fellow => (
  <React.Fragment>
    <ProfileCard
      firstName={fellow.first_name}
      lastName={fellow.last_name}
      picture={fellow.picture}
    />
    <ProjectCards
      startDate={fellow.apprenticeship_start_date}
      projectName={fellow.apprenticeship_project}
      endDate={fellow.apprenticeship_end_date}
      picture={fellow.picture}
      projectLevel="Apprenticeship"
      technologies={fellow.apprenticeship_technology}
    />
    <ProjectCards
      startDate={fellow.sims_start_date}
      endDate={fellow.sims_end_date}
      projectLevel="Simulations"
      picture={fellow.picture}
      projectName={fellow.sims_project}
      technologies={fellow.sims_project_technology}
    />
  </React.Fragment>
);

const EngineerCard = ({ data }) => {
  const { fellow } = data;
  return (
    <div className="engineer-bio-wrapper">
      <h3 className="profile-card-header">My Profile</h3>
      <div className="bio-card text-center">
        {fellow ? renderEngineerDetails(fellow) : null}
      </div>
    </div>
  );
};

EngineerCard.propTypes = {
  data: PropTypes.shape().isRequired
};

export default EngineerCard;
