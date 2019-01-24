import React from 'react';
import Box from 'grommet/components/Box';
import Label from 'grommet/components/Label';
import Button from 'grommet/components/Button';
import Toast from 'grommet/components/Toast';
import { Field, reduxForm, getFormSyncErrors } from 'redux-form'
import { connect } from 'react-redux';

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
  componentDidMount() {
    localStorage.removeItem('loginId');
  }
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
    return (
      <Box justify="center" align="center">
        {this.state.error &&
          <Toast status="critical" onClose={this.onErrorClose} size="small">
            {this.state.error}
          </Toast>
        }
        <form onSubmit={this.props.handleSubmit(this.submit)}>
          <Box justify="center" align="center" margin="small" direction="row">
            <Label className="label-signup">Email</Label>
            <Field validate={required} name="email" component={renderField} type="text" />
          </Box>
          <Box justify="center" align="center" margin="small" direction="row">
            <Label className="label-signup">Password</Label>
            <Field validate={required} name="password" component={renderField} type="password" />
          </Box>
          <Box justify="center" align="center" direction="row">
            <Button primary label="Login" type="submit" />
            <Button label='SignUp' href='/signup' primary />
          </Box>
        </form>
      </Box>
    );
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