import React from 'react';
import { Link } from 'react-router-dom';
import LoaderComponent from '../../components/CustomLoader/LoaderComponent';
import NotFound from '../../static/NotFound.svg';
import { CadreMainButton } from '../../components/Buttons';

/**
 * Defines component for rendering 404 error
 * @function
 */
const NotFoundPage = () => (
  <>
    <LoaderComponent img={NotFound} />
    <div className="row">
      <div className="col-md-12 text-center">
        <p>Sorry, This Page Cannot Be Found</p>
        <Link to="/dashboard">
          <CadreMainButton label="Go Back Home" />
        </Link>
      </div>
    </div>
  </>
);

export default NotFoundPage;
