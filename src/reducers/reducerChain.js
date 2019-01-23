import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
// import initialState from '../stores/initialState';
import { loginReducer } from '../login';

const reducers = {
  form: formReducer,
  login: loginReducer
};

export default combineReducers(reducers);