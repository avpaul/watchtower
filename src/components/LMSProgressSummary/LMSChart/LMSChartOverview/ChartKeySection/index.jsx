import React from 'react';

const CharKeySection = () => (
  <div className="chart-keys">
    <div className="chart-keys__item">
      <div className="chart-keys__item--circle green" />
      <span>Scores 2 or more</span>
    </div>
    <div className="chart-keys__item">
      <div className="chart-keys__item--circle red" />
      <span>Scores less than 2</span>
    </div>
    <div className="chart-keys__item">
      <div className="chart-keys__item--circle orange" />
      <span>No submission</span>
    </div>
    <div className="chart-keys__item">
      <div className="chart-keys__item--circle grey" />
      <span>Not reviewed</span>
    </div>
  </div>
);

export default CharKeySection;
