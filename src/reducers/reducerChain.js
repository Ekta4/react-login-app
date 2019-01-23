import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
// import initialState from '../stores/initialState';

const reducers = {
  form: formReducer
};

export default combineReducers(reducers);