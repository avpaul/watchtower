import React from 'react';
import PropTypes from 'prop-types';
import ProfileCard from './profileCard';
import ProjectCards from './ProjectCards';

const EngineerDetails = ({ fellow }) => (
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

EngineerDetails.propTypes = {
  fellow: PropTypes.instanceOf(Object).isRequired
};

export default EngineerDetails;
