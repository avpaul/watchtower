import ReactGA from 'react-ga';
// import AmplitudeAnalytics from 'amplitude-js';

ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS_ID, {
  debug: process.env.NODE_ENV === 'development',
  testMode: process.env.NODE_ENV === 'test'
});

/*
AmplitudeAnalytics.getInstance().init(
  process.env.REACT_APP_AMPLITUDE_ANALYTICS_ID
);
*/

const activatePageView = ({ pathname, search }) => {
  ReactGA.set({ page: pathname });
  ReactGA.pageview(pathname + search);

  /*
  const { host } = window.location;
  AmplitudeAnalytics.getInstance().logEvent(pathname + search, { host });
*/
};

const fireloginEvent = id => {
  ReactGA.set({ id });
  ReactGA.event({
    category: 'Authentication',
    action: 'Login'
  });
};

const firelogoutEvent = () => {
  ReactGA.set({ id: null });
  ReactGA.event({
    category: 'Authentication',
    action: 'Logout'
  });
};

export default { fireloginEvent, firelogoutEvent, activatePageView };
