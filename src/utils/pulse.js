import moment from 'moment';

export const findScores = (scoreArray, attributeKey) =>
  scoreArray.find(score => score.attribute === attributeKey);

export const formatRating = rating => {
  const getScore = attribute =>
    findScores(rating.scores, attribute)
      ? `${findScores(rating.scores, attribute).score}.00`
      : 'N/A';

  const formatedRating = {
    week: moment(rating.created_at).format('L'),
    quantity: getScore('Quantity'),
    quality: getScore('Quality'),
    initiative: getScore('Initiative'),
    communication: getScore('Communication'),
    professionalism: getScore('Professionalism'),
    integration: getScore('Integration')
  };
  return formatedRating;
};

export const formatRollingAveragePerAttribute = (level, ratings) => {
  let count = 0;
  const averageRating = {
    quantity: 0,
    quality: 0,
    initiative: 0,
    communication: 0,
    professionalism: 0,
    integration: 0
  };
  if (!ratings) return averageRating;
  ratings.forEach(rating => {
    if (rating.level === level) {
      Object.keys(averageRating).forEach(key => {
        averageRating[key] += Number.parseFloat(formatRating(rating)[key]);
      });
      count += 1;
    }
  });
  Object.keys(averageRating).forEach(key => {
    averageRating[key] /= count;
  });
  return averageRating;
};

export const formatAveragePulseValues = attribute => {
  if (typeof attribute !== 'number') return attribute;

  if (attribute === 1 || attribute === 2) return attribute.toFixed(2);

  const decimalPlaces = `${attribute}`.split('.')[1].length;
  return decimalPlaces === 1
    ? attribute.toFixed(2)
    : attribute.toString().substring(0, 4);
};
