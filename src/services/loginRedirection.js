const loginRedirectionHandler = {
  set: location => {
    localStorage.setItem('loginRedirect', JSON.stringify({ location }));
  },
  get: () => JSON.parse(localStorage.getItem('loginRedirect')),
  prune: () => {
    localStorage.removeItem('loginRedirect');
  }
};

export default loginRedirectionHandler;
