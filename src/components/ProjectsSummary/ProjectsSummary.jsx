import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import { carouselOptions } from '../../utils';
import FilterCard from '../Filters/FilterCard';
import FellowSummaryLabel from '../FellowSummaryLabel';
import Loader from '../Loader/Loader';
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
    fellowsSummary: {
      fellowsSummaryToday: { latestWeekSummary = {} }
    },
    handleCardClick,
    loading
  } = props;
  const projectsCard = formatProjects(latestWeekSummary);

  return (
    <div className="ops-dashboard__fellows-summary">
      <FellowSummaryLabel />
      <Fragment>
        {!loading ? (
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
        ) : (
          <Loader />
        )}
      </Fragment>
    </div>
  );
};

ProjectsSummary.propTypes = {
  fellowsSummary: PropTypes.instanceOf(Object).isRequired,
  loading: PropTypes.bool.isRequired,
  handleCardClick: PropTypes.func.isRequired
};

export default ProjectsSummary;
