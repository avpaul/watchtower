const lmsResult = data => {
  if (!data.satisfied && !data.total) {
    return 'N/A';
  }
  if (!data.satisfied && data.total) {
    return `0/${data.total}`;
  }
  return `${data.satisfied}/${data.total}`;
};

export default lmsResult;
