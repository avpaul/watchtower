import React from 'react';
import PropTypes from 'prop-types';
import ProfileCard from './profileCard';
import ProjectCards from './ProjectCards';
import Button from '../Buttons/CadreMainButton';

const EngineerDetails = ({ fellow, rollOffHandler }) => (
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
    <Button
      buttonProps={{ onClick: rollOffHandler }}
      label="Roll Off Engineer"
    />
  </React.Fragment>
);

EngineerDetails.propTypes = {
  fellow: PropTypes.instanceOf(Object).isRequired,
  rollOffHandler: PropTypes.func.isRequired
};

export default EngineerDetails;
