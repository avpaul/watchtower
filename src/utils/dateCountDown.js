const dateCountDown = date => {
  const formatedDate = new Date(date).setHours(23, 59, 59, 99);
  const currentDate = new Date();
  if (currentDate > new Date(formatedDate)) {
    return -1;
  }
  const millisecondsToEnd = new Date(formatedDate) - currentDate;
  const daysToEnd = millisecondsToEnd / (1000 * 60 * 60 * 24);
  if (daysToEnd <= 1) {
    return 0;
  }
  return Math.ceil(daysToEnd);
};

export const formatCountDown = days => {
  if (days === -1) {
    return 'Closed';
  }
  if (days === 0) {
    return 'Closing today';
  }
  if (days === 1) {
    return '01 day';
  }
  if (String(days).length === 1) {
    return `0${days} days`;
  }
  return `${days} days`;
};

export default dateCountDown;
