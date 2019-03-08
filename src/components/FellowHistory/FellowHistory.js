import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

import HistoryCard from './FellowHistoryCard';
import FellowSummaryBreakdown from '../FellowSummaryBreakdown';
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

  /**
   ** Searches for the specific fellow using the name parameter provided in the url,
   ** then sets it to the state.
   */
  setFellow() {
    const { match, fellowSummaryDetails, history } = this.props;
    const fellowFound = fellowSummaryDetails.find(
      fellow => fellow.email === `${match.params.name.toLowerCase()}@andela.com`
    );

    if (fellowFound === undefined) history.push('/dashboard/fellows');

    this.setState({ fellow: fellowFound, updated: true });
  }

  mapDisplayslistData = fellow => {
    const fellowsListDisplayData = [
      {
        checkedBydefault: true,
        title: 'DevPulse',
        ratings: fellow.devPulseAverage === null ? '0' : fellow.devPulseAverage
      },
      {
        checkedBydefault: false,
        title: 'LMS',
        ratings: fellow.lmsOutput === null ? '0/0' : fellow.lmsOutput
      }
    ];
    return fellowsListDisplayData;
  };

  /**
   ** Renders the TTL/LF's card according to the roleId provided.
   * @param manager The fellow's manager details which should contain the firstname,
   * lastname and image.
   * @param fellow The fellow's bio details
   * @returns JSX object
   */
  renderManagerCard = (manager, fellow) => {
    if (!manager) return <div />;
    let managerRole = '';

    switch (manager.roleId) {
      case 2:
        managerRole = 'TTL';
        break;
      case 3:
        managerRole = 'LF';
        break;
      default:
        managerRole = 'Undefined';
        break;
    }

    return (
      <div className="col-md-6 col-xl-3 mb-3">
        <HistoryCard
          user={{
            name: `${manager.firstName} ${manager.lastName}`,
            image: manager.image,
            detail: `${fellow.firstName}'s ${managerRole}`
          }}
        />
      </div>
    );
  };

  /**
   ** Renders the fellow's bio card, manager's card as well as the fellow's
   ** summary data
   * @param fellow The specific fellow's details
   * @returns JSX object
   */
  renderCards = fellow => {
    if (!fellow || !fellow.project) return <div />;

    const fellowBio = fellow.user ? fellow.user : fellow;

    return (
      <React.Fragment>
        <div className="col-md-6 col-xl-3 mb-3">
          <HistoryCard
            user={{
              name: `${fellowBio.firstName} ${fellowBio.lastName}`,
              image: fellow.image,
              detail: fellow.project
            }}
          />
        </div>
        {this.renderManagerCard(fellow.manager, fellowBio)}

        <div className="col-xl-6 mt-3 mt-xl-0">
          <FellowSummaryBreakdown
            fellowSummaryBreakdown={this.mapDisplayslistData(fellow)}
          />
        </div>
      </React.Fragment>
    );
  };

  render() {
    const { fellow } = this.state;

    return (
      <div className="fellow-history container-fluid">
        <div className="fellow-history__top row">
          <div className="col">
            <div className="row">
              <span className="fellow-history__header col">
                DEVELOPER HISTORY
              </span>
            </div>
            <div className="row">{this.renderCards(fellow)}</div>
          </div>
        </div>
      </div>
    );
  }
}

FellowHistory.propTypes = {
  match: PropTypes.shape().isRequired,
  fellowSummaryDetails: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  history: PropTypes.shape().isRequired
};

export default withRouter(FellowHistory);
