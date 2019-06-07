export default error => {
  if (error.response && error.response.data) {
    if (error.response.data.errors) return error.response.data.errors;
    return error.response.data.message;
  }
  if (error.message) return error.message;
  return 'Request was not sent';
};
