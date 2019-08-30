import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import fuzzy from 'fuzzy';
import CadreSideCard from './CadreSideCard';
import { EngineerBioConnected } from '../../components/EngineerBio';
import ProjectSummary from '../../components/EngineerProjectSummaryCard/EngineerProjectSummaryCard';
import EngineerDashboardCard from '../../components/EngineerDashboardCard';
import EngineerVacancies from '../../components/EngineerVacancies';
import { fetchAllVacancies } from '../../redux/actionCreators/getCadreVacanciesAction';
import WelcomeMessage from '../../components/WelcomeMessage';
import dateCountDown from '../../utils/dateCountDown';

import './index.scss';
import './CadreDashboard.scss';
import Loader from '../../components/Loader/Loader';

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
    const { getCadreVacancies } = this.props;
    const { vacanciesAreNotAvailable } = this;
    if (vacanciesAreNotAvailable()) {
      getCadreVacancies();
    }
  }

  vacanciesAreNotAvailable = () => {
    const {
      cadreVacancies: { data }
    } = this.props;
    return !!Object.keys(data).length < 1;
  };

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

  vancancyHandler = () => {
    const { cadreVacancies } = this.props;
    const { vacanciesArray, certificationsArray } = this.state;

    const vacanciesToRender =
      vacanciesArray || cadreVacancies.data.projectVacancies || [];
    const certificationsToRender =
      certificationsArray || cadreVacancies.data.certificationVacancies || [];
    const vacancies = vacanciesToRender.filter(
      vacancy => dateCountDown(vacancy.vacancy.closing_date) !== -1 && vacancy
    );
    const certification = certificationsToRender.filter(
      vacancy =>
        dateCountDown(vacancy.vacancy_details.closing_date) !== -1 && vacancy
    );
    return [vacancies, certification];
  };

  render() {
    const { profile, cadreVacancies, d1Engineer } = this.props;
    const { loading } = cadreVacancies;
    const { searchWord } = this.state;
    const [vacanciesToRender, certificationsToRender] = this.vancancyHandler();

    const vacancyLength =
      vacanciesToRender.length + certificationsToRender.length;

    return (
      <Fragment>
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
                vacancyLength={vacancyLength}
                loading
              >
                {loading ? (
                  <div className="d-flex justify-content-center">
                    <Loader size="small" />
                  </div>
                ) : (
                  <EngineerVacancies
                    cadreVacancies={cadreVacancies}
                    vacanciesArray={vacanciesToRender}
                    certificationsArray={certificationsToRender}
                    searchWord={searchWord}
                    loggedInUser={d1Engineer}
                  />
                )}
              </EngineerDashboardCard>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

D1FellowDashboardMain.propTypes = {
  getD1FellowProfileData: PropTypes.func.isRequired,
  profile: PropTypes.shape().isRequired,
  loading: PropTypes.bool.isRequired,
  cadreVacancies: PropTypes.shape(),
  d1Engineer: PropTypes.instanceOf(Object).isRequired,
  getCadreVacancies: PropTypes.func.isRequired
};

D1FellowDashboardMain.defaultProps = {
  cadreVacancies: {
    data: {
      projectVacancies: [],
      certificationVacancies: []
    }
  }
};

const mapStateToProps = state => ({
  profile: state.d1Fellow.fellow,
  loading: state.d1Fellow.loading,
  cadreVacancies: state.cadreVacancies
});

const mapDispatchToProps = dispatch => ({
  getCadreVacancies: () => dispatch(fetchAllVacancies())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(D1FellowDashboardMain);
