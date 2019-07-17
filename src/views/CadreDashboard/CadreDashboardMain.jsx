import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import fuzzy from 'fuzzy';
import CadreSideCard from './CadreSideCard';
import { EngineerBioConnected } from '../../components/EngineerBio';
import ProjectSummary from '../../components/EngineerProjectSummaryCard/EngineerProjectSummaryCard';
import EngineerDashboardCard from '../../components/EngineerDashboardCard';
import EngineerVacancies from '../../components/EngineerVacancies';
import getD1FellowProfileDataAction from '../../redux/actionCreators/d1FellowProfileDataAction';
import WelcomeMessage from '../../components/WelcomeMessage';
import CadreLoader from '../../components/CustomLoader/CadreLoader';

import './index.scss';
import './CadreDashboard.scss';

export class D1FellowDashboardMain extends Component {
  constructor(props) {
    super(props);

    this.state = {
      vacanciesArray: null,
      certificationsArray: null,
      searchWord: ''
    };
  }

  componentDidMount() {
    const { getD1FellowProfileData } = this.props;
    getD1FellowProfileData();
  }

  fuzzySearchVacancies = (isProjectVacancy = true, searchWord) => {
    const { cadreVacancies } = this.props;
    let vacanciesArray = isProjectVacancy
      ? cadreVacancies.data.projectVacancies
      : [];
    if (!isProjectVacancy) {
      vacanciesArray = cadreVacancies.data.certificationVacancies || [];
    }

    const options = {
      pre: '<b>',
      post: '</b>',
      extract: el =>
        `${isProjectVacancy ? el.project.name : el.certification.name}${
          isProjectVacancy ? el.role.name : ''
        }`
    };

    const results = fuzzy.filter(searchWord, vacanciesArray, options);
    const searchResults = results.map(item => item.original);

    return searchResults;
  };

  handleSearchChange = e => {
    const { value } = e.target;

    const searchWord = value.replace(/\s/g, '');
    const vacanciesArray = this.fuzzySearchVacancies(true, searchWord) || [];
    const certificationsArray =
      this.fuzzySearchVacancies(false, searchWord) || [];

    this.setState({
      vacanciesArray,
      certificationsArray,
      searchWord
    });
  };

  render() {
    const { profile, loading, cadreVacancies } = this.props;
    const { vacanciesArray, certificationsArray, searchWord } = this.state;

    const vacanciesToRender =
      vacanciesArray || cadreVacancies.data.projectVacancies || [];
    const certificationsToRender =
      certificationsArray || cadreVacancies.data.certificationVacancies || [];

    const vacanciesLength =
      vacanciesToRender.length + certificationsToRender.length;
    return (
      <Fragment>
        {loading ? (
          <CadreLoader />
        ) : (
          <div className="cadre-content">
            <div className="cadre-side-card-dashboard">
              <CadreSideCard />
            </div>
            <div className="dashboard-wrapper">
              <div className="dashboard-greeting">
                <WelcomeMessage {...this.props} />
              </div>
              <div className="fellow-dashboard-main">
                <EngineerBioConnected {...this.props} />
                <ProjectSummary profile={profile} />
                <EngineerDashboardCard
                  header="Vacancies"
                  handleSearch={this.handleSearchChange}
                  vacancyLength={vacanciesLength}
                >
                  <EngineerVacancies
                    cadreVacancies={cadreVacancies}
                    vacanciesArray={vacanciesToRender}
                    certificationsArray={certificationsToRender}
                    searchWord={searchWord}
                  />
                </EngineerDashboardCard>
              </div>
            </div>
          </div>
        )}
      </Fragment>
    );
  }
}

D1FellowDashboardMain.propTypes = {
  getD1FellowProfileData: PropTypes.func.isRequired,
  profile: PropTypes.shape().isRequired,
  loading: PropTypes.bool.isRequired,
  cadreVacancies: PropTypes.shape().isRequired
};

const mapStateToProps = state => ({
  profile: state.d1Fellow.fellow,
  loading: state.d1Fellow.loading,
  cadreVacancies: state.cadreVacancies
});

const mapDispatchToProps = dispatch => ({
  getD1FellowProfileData: () => dispatch(getD1FellowProfileDataAction())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(D1FellowDashboardMain);
