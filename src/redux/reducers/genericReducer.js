const genericReducer = (types, state, action) => {
  switch (action.type) {
    case types[0]:
      return {
        ...state,
        loading: true
      };
    case types[1]:
      return {
        ...state,
        loading: false,
        data: action.successData
      };
    case types[2]:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    default:
      return state;
  }
};

export default genericReducer;
