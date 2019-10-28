export const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";

export const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value
    };
    const updateValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid
    };
    let updatedFormIsValid = true;
    for (const key in updateValidities) {
      updatedFormIsValid = updatedFormIsValid && updateValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updateValidities,
      inputValues: updatedValues
    };
  }
  return state;
};
