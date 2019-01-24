import React from 'react';
import Box from 'grommet/components/Box';
import Label from 'grommet/components/Label';
import Button from 'grommet/components/Button';
import Toast from 'grommet/components/Toast';
import { Field, reduxForm, getFormSyncErrors } from 'redux-form'
import { connect } from 'react-redux';
import RenderField from '../common/RenderField';
import { required, maxLength30, maxLength80, email, phoneNumber } from '../common/validationUtils';
import LoginIcon from 'grommet/components/icons/base/Login';
import GroupIcon from 'grommet/components/icons/base/Group';

import './styles.css';

class FieldFileInput extends React.Component {
  getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }
  onChange = async (e) => {
    const { input: { onChange } } = this.props
    const targetFile = e.target.files[0]
    if (targetFile) {
      const val = await this.getBase64(targetFile)
      onChange(val)
    } else {
      onChange(null);
    }
  }

  render() {
    const { label } = this.props  //whatever props you send to the component from redux-form Field
    return (
      <div><label>{label}</label>
        <div>
          <input
            type='file'
            accept='.jpg, .png, .jpeg'
            onChange={this.onChange}
          />
        </div>
      </div>
    )
  }
}
class SignUpForm extends React.Component {
  state = {
    error: ''
  }
  submit = (values) => {
    let url = "http://localhost:3001/users";
    fetch(url)
      .then(resp => resp.json())
      .then(data => {
        if (data[values.email]) {
          localStorage.setItem('loginId', values.email);
          this.setState({ error: 'this email account is already registered please sign-in' });
        } else if (values.email) {
          url = "http://localhost:3001/users";
          data = { ...data, [values.email]: values };
          fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          })
            .then(resp => resp.json())
            .then(data => {
              window.location = '/login'
            });
        } else {
          this.setState({ error: 'email empty' });
        }
      });
  }
  onErrorClose = () => {
    this.setState({ error: '' });
  }
  onFileUpload = (e) => {
    console.log(e);
  }
  render() {
    console.log("props..:", this.props.submitErrors);
    return (
      <Box justify="center" align="center">
        {this.state.error &&
          <Toast status="critical" onClose={this.onErrorClose} size="small">
            {this.state.error}
          </Toast>
        }
        <form onSubmit={this.props.handleSubmit(this.submit)}>
          <Box justify="end" align="center" margin="small" direction="row">
            <Label className="label-signup">First Name</Label>
            <Field onBlur={this.props.onBlur} validate={[required, maxLength30]} name="first name" component={RenderField} type="text" />
          </Box>
          <Box justify="end" align="center" margin="small" direction="row">
            <Label className="label-signup">Last Name</Label>
            <Field validate={[required, maxLength30]} name="last name" component={RenderField} type="text" />
          </Box>
          <Box justify="end" align="center" margin="small" direction="row">
            <Label className="label-signup">Surname</Label>
            <Field validate={[required, maxLength30]} name="surname" component={RenderField} type="text" />
          </Box>
          <Box justify="end" align="center" margin="small" direction="row">
            <Label className="label-signup">Mobile</Label>
            <Field validate={[required, phoneNumber]} name="mobile" component={RenderField} type="number" />
          </Box>
          <Box justify="end" align="center" margin="small" direction="row">
            <Label className="label-signup">Email</Label>
            <Field validate={[required, email]} name="email" component={RenderField} type="text" />
          </Box>
          <Box justify="end" align="center" margin="small" direction="row">
            <Label className="label-signup">Password</Label>
            <Field validate={[required]} name="password" component={RenderField} type="password" />
          </Box>
          <Box justify="end" align="center" margin="small" direction="row">
            <Label className="label-signup">Confirm Password</Label>
            <Field validate={[required]} name="confirm password" component={RenderField} type="password" />
          </Box>
          <Box justify="end" align="center" margin="small" direction="row">
            <Label className="label-signup">Profile Picture</Label>
            <Field name="profile picture" component={FieldFileInput} type="file" />
          </Box>
          <Box justify="end" align="center" margin="small" direction="row">
            <Label className="label-signup">Address</Label>
            <Field validate={[required, maxLength80]} name="address" component={RenderField} type="text" />
          </Box>
          <Box justify="end" align="center" margin="small" direction="row">
            <Label className="label-signup">Date of Birth</Label>
            <Field validate={[required]} name="dob" component={RenderField} type="date" />
          </Box>
          <Box justify="end" align="center" direction="row">
            <Button margin="small" align="center" icon={<GroupIcon />} direction="row" box colorIndex="accent-1-a" label="Sign Up" type="submit" />
            <Button align="center" icon={<LoginIcon />} direction="row" colorIndex="unknown" box label='Login' href='/login' />
          </Box>
        </form>
      </Box>
    );
  }
}

SignUpForm = reduxForm({
  form: 'signup'
})(SignUpForm);

export default connect(
  state => ({
    submitErrors: getFormSyncErrors('signup')(state)
  })
)(SignUpForm)