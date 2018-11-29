const truncate = (str, length) => {
  const dots = str.length > length ? '...' : '';
  return str.substring(0, length) + dots;
};

export const getScoreStatus = score => (score > 1 ? 'blue' : 'red');

export const getReviewStatus = (isReviewed, score) =>
  isReviewed ? getScoreStatus(score) : 'grey';

export const getOutputStatus = output =>
  output.submitted ? getReviewStatus(output.reviewed, output.score) : 'orange';

export default truncate;
