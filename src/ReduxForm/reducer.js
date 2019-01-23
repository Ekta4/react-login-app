import initialState from '../stores/initialState';
import { SUBMIT_FORM } from './actions';


const operationsListReducer = (state = initialState.form, action) => {
  const retState = state;
  switch (action.type) {
    case SUBMIT_FORM: {
      return retState;
    }
    default:
      return retState;
  }
};

export default operationsListReducer;