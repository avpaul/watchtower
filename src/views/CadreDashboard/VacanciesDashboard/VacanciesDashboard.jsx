import React, { Component } from 'react';
import Title from '../../../components/Title';
import { CadreMainButton } from '../../../components/Buttons';
import AddVacanciesModal from './AddVacanciesModal';
import { underDevelopment } from '../../../utils';

import './vacancyDashboard.css';
import WorkInProgress from '../../../components/WorkInProgress';

class VacanciesDashboard extends Component {
  renderTopBar = () => (
    <React.Fragment>
      <div className="col-9">
        <Title title={`${0} Vacancies`} />
      </div>
      <div className="col-3">
        <CadreMainButton
          buttonProps={{
            'data-toggle': 'modal',
            'data-target': '#addProjectVacanciesModal'
          }}
          label="ADD VACANCIES"
        />
      </div>
    </React.Fragment>
  );

  renderBody = () => (
    <React.Fragment>
      <AddVacanciesModal />
      <div className="row">{this.renderTopBar()}</div>
      <WorkInProgress />
    </React.Fragment>
  );

  render() {
    return (
      <div className="vacancies-dashboard cadre__page">
        {underDevelopment(this.renderBody())}
      </div>
    );
  }
}

export default VacanciesDashboard;
