import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import CadreSubmenu from '../../components/CadreSubmenu';
import ProjectsDashboard from './ProjectsDashboard';
import RolesDashboard from './RolesDashboard';
import ReportsDashboard from './ReportsDashboard';
import VacanciesDashboard from './VacanciesDashboard';
import CertificationsDashboard from './CertificationsDashboard';

import './CadreDashboard.css';

class CadreDashboard extends Component {
  /**
   * Creates the CadreDashboard Component and initializes state
   * @constructor
   * @param {*} props - Super props inherited by Component
   */
  constructor(props) {
    super(props);
    this.state = {
      routes: [
        `${props.match.url}/projects`,
        `${props.match.url}/vacancies`,
        `${props.match.url}/roles`,
        `${props.match.url}/certifications`,
        `${props.match.url}/reports`
      ]
    };
  }

  /**
   * Listens to events specifically click events
   *  @param {*} event
   */
  handleCardclick = e => {
    const { history } = this.props;
    const { routes } = this.state;
    const id = e.target.getAttribute('data-key');
    if (routes[id]) history.replace(routes[id]);
  };

  renderSubMenu = () => {
    const { routes } = this.state;
    const { location } = this.props;
    const routeIndex = routes.findIndex(
      route => location.pathname.search(route) === 0
    );
    return (
      <div className="col-sm-3 sidebar-submenu">
        <CadreSubmenu
          handleCardclick={this.handleCardclick}
          activeItem={`${routeIndex}`}
        />
      </div>
    );
  };

  renderRoute = (RouteComponent, url) => (
    <Route
      path={url}
      component={newProps => (
        <RouteComponent {...{ ...this.props, match: newProps.match }} />
      )}
    />
  );

  render() {
    const { routes } = this.state;
    return (
      <div className="container-fluid page-content">
        <div className="row">
          {this.renderSubMenu()}
          <div className="col-sm-12 col-sm-9">
            <Switch>
              {this.renderRoute(ProjectsDashboard, routes[0])}
              {this.renderRoute(VacanciesDashboard, routes[1])}
              {this.renderRoute(RolesDashboard, routes[2])}
              {this.renderRoute(CertificationsDashboard, routes[3])}
              {this.renderRoute(ReportsDashboard, routes[4])}
            </Switch>
          </div>
        </div>
      </div>
    );
  }
}

CadreDashboard.propTypes = {
  history: PropTypes.shape().isRequired,
  match: PropTypes.shape().isRequired,
  location: PropTypes.shape().isRequired
};

export default CadreDashboard;
