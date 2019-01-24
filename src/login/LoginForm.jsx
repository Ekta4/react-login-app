import React from 'react';
import Box from 'grommet/components/Box';
import Label from 'grommet/components/Label';
import Button from 'grommet/components/Button';
import Toast from 'grommet/components/Toast';
import { Field, reduxForm, getFormSyncErrors } from 'redux-form'
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";
import LoginIcon from 'grommet/components/icons/base/Login';
import GroupIcon from 'grommet/components/icons/base/Group';

import './styles.css';

const required = value => (value ? undefined : 'Required')

const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} placeholder={label} type={type} />
      {touched &&
        ((error && <span className="error-span">{error}</span>) ||
          (warning && <span>{warning}</span>))}
    </div>
  </div>
);
class LoginForm extends React.Component {
  state = { error: '' };
  // componentDidMount() {
  //   localStorage.removeItem('loginId');
  // }
  submit = (values) => {
    let url = "http://localhost:3001/users";
    fetch(url)
      .then(resp => resp.json())
      .then(data => {
        if (data[values.email] && (data[values.email].password === values.password)) {
          localStorage.setItem('loginId', values.email);
          window.location = '/dashboard'
        } else {
          this.setState({ error: 'No record found for this email account. Please sign-up' });
        }
      });
  }
  onErrorClose = () => {
    this.setState({ error: '' });
  }
  render() {
    const userId = localStorage.getItem('loginId');
    const loginRedirect = (<Redirect to='/dashboard' />);
    const lofinForm = (
      <Box justify="center" align="center">
        {this.state.error &&
          <Toast status="critical" onClose={this.onErrorClose} size="small">
            {this.state.error}
          </Toast>
        }
        <form onSubmit={this.props.handleSubmit(this.submit)}>
          <Box justify="end" align="center" margin="small" direction="row">
            <Label className="label-signup">Email</Label>
            <Field validate={required} name="email" component={renderField} type="text" />
          </Box>
          <Box justify="end" align="center" margin="small" direction="row">
            <Label className="label-signup">Password</Label>
            <Field validate={required} name="password" component={renderField} type="password" />
          </Box>
          <Box justify="end" align="center" direction="row">
            <Button margin="small" align="center" icon={<LoginIcon  />} direction="row" box colorIndex="accent-1-a" label="Login" type="submit" />
            <Button align="center" icon={<GroupIcon  />} direction="row" colorIndex="unknown" box label='SignUp' href='/signup' />
          </Box>
        </form>
      </Box>);

    return (userId ? loginRedirect : lofinForm);
  }
}

LoginForm = reduxForm({
  form: 'login'
})(LoginForm);

export default connect(
  state => ({
    submitErrors: getFormSyncErrors('login')(state)
  })
)(LoginForm)