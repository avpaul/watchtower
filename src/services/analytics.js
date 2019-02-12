import ReactGA from 'react-ga';

ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS_ID, {
  debug: process.env.NODE_ENV === 'development',
  testMode: process.env.NODE_ENV === 'test'
});

const activatePageView = ({ pathname, search }) => {
  ReactGA.set({ page: pathname });
  ReactGA.pageview(pathname + search);
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
