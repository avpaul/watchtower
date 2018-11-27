import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import FilterCard from '../../components/Filters/FilterCard';
import TTLFellowsProgress from './TtlFellowsProgress';
import getManagerFellowsAction from '../../redux/actionCreators/managerFellowsAction';
import './index.css';

export class TTLDashboardMain extends Component {
  componentDidMount() {
    const { getManagersFellows, user } = this.props;
    getManagersFellows({ email: user.email });
  }

  renderFellowTotalCard = cardDetails => (
    <FilterCard
      filterId="1"
      cardDetails={cardDetails}
      className="card"
      onClick={this.handleCardClick}
    />
  );

  render() {
    const {
      managerFellows: { managerFellows }
    } = this.props;
    const fellowCount = managerFellows.fellowCount
      ? managerFellows.fellowCount
      : 0;
    const cardDetails = {
      title: 'Total Fellows',
      subTitle: 'Click for details',
      totalFellows: fellowCount
    };
    const ttlDashboardStyle = {
      paddingLeft: '0',
      paddingRight: '0',
      paddingBottom: '49px'
    };
    return (
      <div className="container-fluid" style={ttlDashboardStyle}>
        <div className="ttl_fellow_summary">
          <h2 className="ttl_fellow_summary__title"> FELLOWS SUMMARY </h2>
          <div className="ttl_fellow_summary__cards">
            {this.renderFellowTotalCard(cardDetails)}
          </div>
        </div>
        <TTLFellowsProgress />
      </div>
    );
  }
}

const mapStateToProps = ({ managerFellows }) => ({
  managerFellows
});

TTLDashboardMain.propTypes = {
  managerFellows: PropTypes.shape({
    loading: PropTypes.bool
  }).isRequired,
  getManagersFellows: PropTypes.func.isRequired,
  user: PropTypes.shape({
    email: PropTypes.string.isRequired
  }).isRequired
};
export const TTLDashboardMainConnected = connect(
  mapStateToProps,
  {
    getManagersFellows: getManagerFellowsAction
  }
)(TTLDashboardMain);
