import React from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import { carouselOptions } from '../../utils';
import FilterCard from '../Filters/FilterCard';
import FellowSummaryLabel from '../FellowSummaryLabel';
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
      <FellowSummaryLabel />
      <div className="row ops-dashboard__filter">
        <Slider {...carouselOptions(4)}>
          {projectsCard.map(projectCard => (
            <div className="p-1">
              <FilterCard
                key={projectCard.title}
                filterId={projectCard.title}
                cardDetails={projectCard}
                className="card"
                onClick={handleCardClick}
              />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

ProjectsSummary.propTypes = {
  ttlProjects: PropTypes.instanceOf(Object).isRequired,
  handleCardClick: PropTypes.func.isRequired
};

export default ProjectsSummary;
