const formatFeedbackInstance = value => {
  const firstRemainder = value % 10;
  const secondRemainder = value % 100;

  if (firstRemainder === 1 && secondRemainder !== 11) {
    return `${value}st`;
  }
  if (firstRemainder === 2 && secondRemainder !== 12) {
    return `${value}nd`;
  }
  if (firstRemainder === 3 && secondRemainder !== 13) {
    return `${value}rd`;
  }
  return `${value}th`;
};

const getFeedbackIndex = (feedbackDateArray = [], feedbackDate) =>
  formatFeedbackInstance(feedbackDateArray.indexOf(feedbackDate) + 1);

export default getFeedbackIndex;
