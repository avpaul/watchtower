const paginationExtract = (response) => {
  const { payload, summary, ...rest } = response;
  return { ...rest };
};
export default paginationExtract;
