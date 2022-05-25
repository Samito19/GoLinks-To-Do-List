const currentProjectReducer = (state = "Default project", action) => {
  switch (action.type) {
    case "CHANGE_PROJECT":
      return action.payload;
    default:
      return state;
  }
};

export default currentProjectReducer;
