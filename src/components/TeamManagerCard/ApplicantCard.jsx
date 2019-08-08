import React from 'react';
import PropTypes from 'prop-types';
import ApplicantProfileCard from './ApplicantProfileCard';
import ApplicantProjectCard from './ApplicantProjectCard';
import dateCountDown, { formatCountDown } from '../../utils/dateCountDown';

import './ApplicantCard.scss';

const ApplicantCard = ({
  application,
  acceptApplicationHandler,
  hideDrawer
}) => {
  const {
    vacancy: { closing_date: closingDate }
  } = application;
  const vacancyCloseCountDown = dateCountDown(closingDate);
  const isVacancyClosed = vacancyCloseCountDown === -1;
  const VacancyCloseCountdown =
    vacancyCloseCountDown >= 1
      ? `close in ${formatCountDown(vacancyCloseCountDown)}`
      : 'close today';

  return (
    <React.Fragment>
      <ApplicantProfileCard
        firstName={application.applicant.first_name}
        lastName={application.applicant.last_name}
        picture={application.applicant.picture}
        roleName={application.role.name}
        projectId={application.project.name}
        applicationReason={application.application_reason}
        acceptApplicationHandler={acceptApplicationHandler}
        applicationId={application.id}
        fellowAvailability={application.fellow_availability}
        hideDrawer={hideDrawer}
        isVacancyClosed={isVacancyClosed}
        VacancyCloseCountdown={VacancyCloseCountdown}
      />
      <div>
        <ApplicantProjectCard
          startDate={application.applicant.apprenticeship_start_date}
          projectName={application.applicant.apprenticeship_project}
          endDate={application.applicant.apprenticeship_end_date}
          picture={application.picture}
          projectLevel="Apprenticeship"
          technologies={application.applicant.apprenticeship_technology}
        />
      </div>
      <div>
        <ApplicantProjectCard
          startDate={application.applicant.sims_start_date}
          endDate={application.applicant.sims_end_date}
          projectLevel="Simulations"
          picture={application.picture}
          projectName={application.applicant.sims_project}
          technologies={application.applicant.sims_project_technology}
        />
      </div>
    </React.Fragment>
  );
};

ApplicantCard.propTypes = {
  application: PropTypes.instanceOf(Object).isRequired,
  acceptApplicationHandler: PropTypes.func.isRequired,
  hideDrawer: PropTypes.func.isRequired
};

export default ApplicantCard;
