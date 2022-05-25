export const changeProject = (newValue) => {
  return {
    type: "CHANGE_PROJECT",
    payload: newValue
  };
};

export const changeUsername = (newValue) => {
  return {
    type: "CHANGE_USERNAME",
    payload: newValue
  };
};
