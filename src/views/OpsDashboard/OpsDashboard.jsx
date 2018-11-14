import React, { Component } from 'react';
import FellowsSummaryChart from '../../components/FellowsSummaryChart';

class OpsDashboardMain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ''
    };
  }

  render() {
    const { name } = this.state;

    // Add components here for opsdashboard
    return (
      <div className="container-fluid">
        {name}
        <FellowsSummaryChart />
      </div>
    );
  }
}

export default OpsDashboardMain;
