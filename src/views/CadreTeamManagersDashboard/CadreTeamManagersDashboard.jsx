import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import Reports from './Reports/Reports';
import MyTeams from './MyTeams/MyTeams';
import CadreSubmenu from '../../components/CadreSubmenu';
import NotFoundPage from '../NotFoundPage';
import Applications from './Applications';

class CadreTeamManagersDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      routes: [
        `${props.match.url}/myteams`,
        `${props.match.url}/applications`,
        `${props.match.url}/reports`
      ]
    };
  }

  /**
   * Listens to events specifically click events (e)
   *  @param {*} event
   */
  handleCardClick = e => {
    const { history } = this.props;
    const { routes } = this.state;
    const id = e.target.getAttribute('data-key');
    if (routes[id]) history.replace(routes[id]);
  };

  renderSideBar = id => (
    <div className="col-sm-3 sidebar-submenu">
      <CadreSubmenu
        handleCardclick={this.handleCardClick}
        activeItem={`${id}`}
        submenuType="tmSubmenus"
      />
    </div>
  );

  renderTMSubMenu = () => {
    const { location } = this.props;
    const { routes } = this.state;
    const routeIndex = routes.findIndex(
      route => location.pathname.search(route) === 0
    );
    return this.renderSideBar(routeIndex);
  };

  renderRoute = (CadreTeamManagerRouteComponent, url) => (
    <Route
      path={url}
      component={newProps => (
        <CadreTeamManagerRouteComponent
          {...{ ...this.props, match: newProps.match }}
        />
      )}
    />
  );

  render() {
    const { routes } = this.state;
    return (
      <div
        id="cadre-dashboard-container"
        className="container-fluid page-content"
      >
        <div className="row">
          {this.renderTMSubMenu()}
          <div className="col-sm-9 main-content">
            <div>
              <Switch>
                {this.renderRoute(MyTeams, routes[0])}
                {this.renderRoute(Applications, routes[1])}
                {this.renderRoute(Reports, routes[2])}
                <Route component={NotFoundPage} />
              </Switch>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CadreTeamManagersDashboard.propTypes = {
  history: PropTypes.shape().isRequired,
  match: PropTypes.shape().isRequired,
  location: PropTypes.shape().isRequired
};

export default CadreTeamManagersDashboard;
