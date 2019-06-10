import React, { Component, Fragment } from 'react';
import CadreSubmenu from '../../components/CadreSubmenu';
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
      activeItem: '0'
    };
  }

  /**
   * Listens to events specifically click events
   *  @param {*} event
   */
  handleCardclick = e => {
    const id = e.target.getAttribute('data-key');

    this.setState({ activeItem: id });
  };

  render() {
    const { activeItem } = this.state;

    return (
      <Fragment>
        <div className="container-fluid page-content">
          <div className="row">
            <div className="col-sm-3 sidebar-submenu">
              <CadreSubmenu
                handleCardclick={this.handleCardclick}
                activeItem={activeItem}
              />
            </div>
            <div className="col-sm-9">
              <div className="tab-content">
                <div role="tabpanel" className="tab-pane active" id="tab1">
                  <h1>Content</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default CadreDashboard;
