import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

import FellowProfileCard from './FellowProfileCard';

import './FellowHistory.css';

export class FellowHistory extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fellow: {},
      updated: false
    };
  }

  componentDidMount() {
    const { fellowSummaryDetails } = this.props;

    if (fellowSummaryDetails.length !== 0) this.setFellow();
  }

  componentDidUpdate() {
    const { fellowSummaryDetails } = this.props;
    const { updated } = this.state;

    if (!updated && fellowSummaryDetails.length > 0) this.setFellow();
  }

  setFellow() {
    const { match, fellowSummaryDetails, history } = this.props;
    const fellowFound = fellowSummaryDetails.find(
      fellow => fellow.email === `${match.params.name.toLowerCase()}@andela.com`
    );

    if (fellowFound === undefined) history.push('/dashboard/fellows');

    this.setState({ fellow: fellowFound, updated: true });
  }

  render() {
    const { fellow } = this.state;
    return (
      <div className="fellow-history container">
        <div className="fellow-history__top row">
          <div className="col">
            <div className="row">
              <span className="fellow-history__header col">
                DEVELOPER HISTORY
              </span>
            </div>
            <div className="row">
              <div className="col-xs-12 col-md-4">
                <FellowProfileCard fellow={fellow} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

FellowHistory.propTypes = {
  match: PropTypes.shape().isRequired,
  fellowSummaryDetails: PropTypes.shape().isRequired,
  history: PropTypes.shape().isRequired
};

export default withRouter(FellowHistory);
