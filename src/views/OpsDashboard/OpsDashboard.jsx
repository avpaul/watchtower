import React, { Component } from 'react';

class OpsDashboardMain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'Main Ops Dashboard to be added'
    };
  }

  render() {
    const { name } = this.state;
    // Add components here for opsdashboard
    return <div className="container">{name}</div>;
  }
}

export default OpsDashboardMain;
