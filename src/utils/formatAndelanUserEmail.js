const andelanEmailToName = (email = '') =>
  email
    .split('@')[0]
    .split('.')
    .join(' ');
export default andelanEmailToName;
