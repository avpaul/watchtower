export default (option, inputArray) => {
  if (option === 'All') {
    return inputArray;
  }
  return inputArray.map(({ name, ...rest }) => ({
    name,
    [option]: rest[option]
  }));
};
