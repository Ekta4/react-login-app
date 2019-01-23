import initialState from '../stores/initialState';
import { LOGIN_USER } from './actions';


const loginReducer = (state = initialState.login, action) => {
  const retState = state;
  switch (action.type) {
    case LOGIN_USER: {
      return {...retState, loggedIn: true};
    }
    default:
      return retState;
  }
};

export default loginReducer;