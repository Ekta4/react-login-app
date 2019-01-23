import React, { Component } from 'react';
// import Form from '../src/ReduxForm';
import store from './stores';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import '../node_modules/grommet-css';
import LoginForm from './login';
import SignUpForm from './signUp';
import Dashboard from './dashboard';


// @import '../../node_modules/grommet/scss/grommet-core/index';
import './App.css';

const routes = [
  {
    path: "/",
    component: LoginForm
  },
  {
    path: "/login",
    component: LoginForm,
  },
  {
    path: "/signup",
    component: SignUpForm
  },
  {
    path: "/dashboard",
    component: Dashboard
  },
  {
    path: "/dashboard/friends",
    component: Dashboard
  }
];
class App extends Component {
  render() {
    return (
      <Router>
        <Provider store={store}>
          <div className="App">
          <ul>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">SignUp</Link>
            </li>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
          </ul>
            {routes.map((route) => (
              <Route path={route.path} component={route.component} key={route.path} exact={true} />
            ))}
          </div>
        </Provider>
      </Router>
    );
  }
}

export default App;
