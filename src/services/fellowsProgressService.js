import axios from 'axios';

const groupByLevel = cohorts => {
  const levelGroups = {};

  cohorts.forEach((cohort) => {
    if(!levelGroups[cohort.level]) levelGroups[cohort.level] = [];
    levelGroups[cohort.level].push(cohort);
  });

  return levelGroups;
}

const fetchFellowsProgress = url => axios
    .get(url)
    .then(response => {
      const group = groupByLevel(Object.values(response.data) || []);
      return group;
    })
    .catch(error => {
      throw error;
    });

export default { fetchFellowsProgress };
