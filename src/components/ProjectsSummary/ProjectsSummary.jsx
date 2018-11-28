import React from 'react';
import PropTypes from 'prop-types';
import FilterCard from '../Filters/FilterCard';
import '../FellowsSummary/FellowsSummary.css';

const formatProjects = projects => {
  const keys = projects ? Object.keys(projects) : '';
  const result = keys.map(key => ({
    title: key,
    totalFellows: parseInt(projects[key], 10)
  }));

  return result;
};

const ProjectsSummary = props => {
  const {
    ttlProjects: { projects = {} },
    handleCardClick
  } = props;
  const projectsCard = formatProjects(projects);

  return (
    <div className="ops-dashboard__fellows-summary">
      <p className="text-uppercase mb-0 ops-dashboard__fellow-summary-text">
        FELLOWS SUMMARY
      </p>
      <div className="row ops-dashboard__filter">
        {projectsCard.map(projectCard => (
          <FilterCard
            key={projectCard.title}
            filterId={projectCard.title}
            cardDetails={projectCard}
            className="card"
            onClick={handleCardClick}
          />
        ))}
      </div>
    </div>
  );
};

ProjectsSummary.propTypes = {
  ttlProjects: PropTypes.instanceOf(Object).isRequired,
  handleCardClick: PropTypes.func.isRequired
};

export default ProjectsSummary;
