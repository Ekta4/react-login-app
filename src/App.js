import React, { Component } from 'react';
import store from './stores';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
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
  }
];
class App extends Component {
  render() {
    return (
      <Router>
        <Provider store={store}>
          <Switch>
            {routes.map((route) => (
              <Route path={route.path} component={route.component} key={route.path} />
            ))}
            <Redirect to="/login" />
          </Switch>
        </Provider>
</Router>
    );
  }
}

export default App;
