import React from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import { carouselOptions } from '../../utils';
import FilterCard, { generateFilterCardId } from '../Filters/FilterCard';
import FellowSummaryLabel from '../FellowSummaryLabel';
import Loader from '../Loader/Loader';
import '../FellowsSummary/FellowsSummary.css';

const formatProjects = projects =>
  projects.map(group => ({
    title: group.project,
    subTitle: 'Click to see details',
    totalFellows: parseInt(group.count, 10)
  }));

const renderProjectCards = (
  projectsCard,
  handleCardClick,
  ProjectsSummaryChartComponent
) =>
  projectsCard.map(projectCard => {
    const cardId = generateFilterCardId(projectCard.title);
    // eslint-disable-next-line no-param-reassign
    ProjectsSummaryChartComponent.filterCardRefs[cardId] = React.createRef();
    return (
      <div
        className="p-1"
        key={projectCard.title}
        ref={ProjectsSummaryChartComponent.filterCardRefs[cardId]}
      >
        <FilterCard
          key={projectCard.title}
          filterId={projectCard.title}
          cardDetails={projectCard}
          className="card"
          onClick={handleCardClick}
        />
      </div>
    );
  });

const ProjectsSummary = ({
  handleCardClick,
  manager: { data: managerData, loading },
  ProjectsSummaryChartComponent
}) => {
  const projectsCard = [
    {
      title: 'Total',
      subTitle: 'Click to see details',
      totalFellows: managerData.fellows ? managerData.fellows.length : 0
    },
    ...formatProjects(managerData.projects || [])
  ];

  return (
    <div className="ops-dashboard__fellows-summary">
      <FellowSummaryLabel />
      {!loading ? (
        <div className="row ops-dashboard__filter">
          <Slider {...carouselOptions(4)}>
            {renderProjectCards(
              projectsCard,
              handleCardClick,
              ProjectsSummaryChartComponent
            )}
          </Slider>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};

ProjectsSummary.propTypes = {
  fellowsSummary: PropTypes.instanceOf(Object).isRequired,
  manager: PropTypes.instanceOf(Object).isRequired,
  handleCardClick: PropTypes.func.isRequired,
  ProjectsSummaryChartComponent: PropTypes.instanceOf(Object).isRequired
};

export default ProjectsSummary;
