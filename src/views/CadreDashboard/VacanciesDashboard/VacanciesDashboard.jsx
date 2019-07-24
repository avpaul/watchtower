import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Title from '../../../components/Title';
import { CadreMainButton } from '../../../components/Buttons';
import AddVacanciesModal from './AddVacanciesModal';
import DeleteVacanciesModal from './DeleteVacanciesModal';
import ViewVacancies from './ViewVacancies/ViewVacancies';
import PMloader from '../../../components/CustomLoader/PMLoader';
import arrayOfObjectsSorter from '../../../utils/sortArray';

import './vacancyDashboard.scss';

class VacanciesDashboard extends Component {
  componentDidMount() {
    const { getAllVacanciesAction } = this.props;
    getAllVacanciesAction();
  }

  clearProjectVacanciesOnFocus = () => {
    const { setProjectVacanciesOnFocus } = this.props;
    setProjectVacanciesOnFocus({});
  };

  renderTopBar = data => {
    let totalCount = 0;
    let projectVacanciesCount = 0;
    let certificationVacanciesCount = 0;
    if (data.projectVacancies) {
      projectVacanciesCount = data.projectVacancies.length;
      certificationVacanciesCount = data.certificationVacancies.length;
      totalCount = projectVacanciesCount + certificationVacanciesCount;
    }
    return (
      <React.Fragment>
        <div className="col-9">
          <Title
            title={`${totalCount} Vacanc${
              totalCount === 1 ? 'y' : 'ies'
            } (${projectVacanciesCount} Project${
              projectVacanciesCount === 1 ? '' : 's'
            }, ${certificationVacanciesCount} Certification${
              certificationVacanciesCount === 1 ? '' : 's'
            })`}
          />
        </div>
        <div className="col-3">
          <CadreMainButton
            buttonProps={{
              'data-toggle': 'modal',
              'data-target': '#addProjectVacanciesModal',
              onClick: this.clearProjectVacanciesOnFocus
            }}
            label="ADD VACANCIES"
          />
        </div>
      </React.Fragment>
    );
  };

  renderBody = () => {
    let {
      getAllVacancies: { data }
    } = this.props;
    const {
      getAllVacancies: { loading },
      user,
      history
    } = this.props;
    if (data.projectVacancies) {
      data = {
        projectVacancies: data.projectVacancies.sort(
          arrayOfObjectsSorter('project.name')
        ),
        certificationVacancies: data.certificationVacancies.sort(
          arrayOfObjectsSorter('certification.name')
        )
      };
    }
    return (
      <React.Fragment>
        <AddVacanciesModal user={user} history={history} />
        <DeleteVacanciesModal history={history} />
        {loading ? (
          <PMloader />
        ) : (
          <React.Fragment>
            <div className="row">{this.renderTopBar(!data ? {} : data)}</div>
            <ViewVacancies vacancies={data} />
          </React.Fragment>
        )}
      </React.Fragment>
    );
  };

  render() {
    return (
      <div className="vacancies-dashboard cadre__page">{this.renderBody()}</div>
    );
  }
}

VacanciesDashboard.propTypes = {
  getAllVacanciesAction: PropTypes.func.isRequired,
  getAllVacancies: PropTypes.shape({}).isRequired,
  setProjectVacanciesOnFocus: PropTypes.func.isRequired,
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    picture: PropTypes.string.isRequired
  }).isRequired,
  history: PropTypes.shape({}).isRequired
};

export default VacanciesDashboard;
