import analytics from '../../services/analytics';

export default ({ location }) => {
  analytics.activatePageView(location);
  return null;
};
