import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import FellowFilterCard from '../FellowFilterCard';
import TranslatorTable from '../../utils/TranslatorTable';

const FellowFeedback = ({
  noOfPrePipInstances,
  noOfPipInstances,
  isTicked,
  handleCardClick,
  filterKey,
  loading
}) => {
  const prePipCards = [
    {
      cardName: 'Pre-PIP',
      numberOfFellows: noOfPrePipInstances
    },
    {
      cardName: 'PIP',
      numberOfFellows: noOfPipInstances
    }
  ];
  return (
    <Fragment>
      <h5 className="page-title-big">MY PERFORMANCE - FELLOWS</h5>
      <div className="d-flex">
        {prePipCards.map(card => (
          <FellowFilterCard
            cardName={card.cardName}
            numberOfFellows={card.numberOfFellows}
            isTicked={isTicked}
            handleCardClick={handleCardClick}
            filterKey={filterKey}
            type={TranslatorTable[isTicked.type]}
            loading={loading}
          />
        ))}
      </div>
    </Fragment>
  );
};

FellowFeedback.propTypes = {
  noOfPrePipInstances: PropTypes.number.isRequired,
  noOfPipInstances: PropTypes.number.isRequired,
  isTicked: PropTypes.shape({}).isRequired,
  handleCardClick: PropTypes.func.isRequired,
  filterKey: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired
};

export default FellowFeedback;
