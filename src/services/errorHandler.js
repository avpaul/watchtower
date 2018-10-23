export default (error) => {
  let errorMessage;
  if (error.response && error.response.data) {
    errorMessage = error.response.data.message;
  } else if (error.message) {
    errorMessage = error.message;
  } else {
    errorMessage = 'Request was not sent';
  }
  return errorMessage;
};
