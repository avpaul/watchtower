import React, { Component } from 'react';
import ratings from '../../__mocks__/lmsRatings';
import LMSChart from './LMSChart';

class LMSProgressSummary extends Component {
  state = {
    lmsRatings: ratings
  };

  render() {
    const { lmsRatings } = this.state;
    return <LMSChart data={lmsRatings} />;
  }
}

export default LMSProgressSummary;
