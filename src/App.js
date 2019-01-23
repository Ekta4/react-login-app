import React, { Component } from 'react';
import store from './stores';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from "react-router-dom";
import '../node_modules/grommet-css';
import LoginForm from './login';
import SignUpForm from './signUp';
import Dashboard from './dashboard';


import './App.css';

const routes = [
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
    path: "/",
    component: LoginForm
  }
];
class App extends Component {
  render() {
    return (
      <Router>
        <Provider store={store}>
            {routes.map((route) => (
              <Route path={route.path} component={route.component} key={route.path} exact={true} />
            ))}
        </Provider>
</Router>
    );
  }
}

export default App;
