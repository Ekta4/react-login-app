import React from 'react';
import Box from 'grommet/components/Box';
import Label from 'grommet/components/Label';
import Button from 'grommet/components/Button';
import Toast from 'grommet/components/Toast';
import { Field, reduxForm } from 'redux-form'

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
    const { input: { value } } = this.props
    const { input, label, required, meta, } = this.props  //whatever props you send to the component from redux-form Field
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
    return (
      <Box>
        {this.state.error &&
          <Toast status="critical" onClose={this.onErrorClose} size="small">
            {this.state.error}
          </Toast>
        }
        <form onSubmit={this.props.handleSubmit(this.submit)}>
          <Box margin="small" direction="row">
            <Label>First Name</Label>
            <Field name="first name" component="input" type="text" />
          </Box>
          <Box margin="small" direction="row">
            <Label>Last Name</Label>
            <Field name="last name" component="input" type="text" />
          </Box>
          <Box margin="small" direction="row">
            <Label>Surname</Label>
            <Field name="surname" component="input" type="text" />
          </Box>
          <Box margin="small" direction="row">
            <Label>Mobile</Label>
            <Field name="mobile" component="input" type="number" />
          </Box>
          <Box margin="small" direction="row">
            <Label>Email</Label>
            <Field name="email" component="input" type="text" />
          </Box>
          <Box margin="small" direction="row">
            <Label>Password</Label>
            <Field name="password" component="input" type="password" />
          </Box>
          <Box margin="small" direction="row">
            <Label>Confirm Password</Label>
            <Field name="confirm password" component="input" type="password" />
          </Box>
          <Box margin="small" direction="row">
            <Label>Profile Picture</Label>
            <Field name="profile picture" component={FieldFileInput} type="file" />
          </Box>
          <Box margin="small" direction="row">
            <Label>Address</Label>
            <Field name="address" component="input" type="text" />
          </Box>
          <Box margin="small" direction="row">
            <Label>Date of Birth</Label>
            <Field name="dob" component="input" type="date" />
          </Box>
          <Button primary label="Submit" type="submit" />
        </form>
      </Box>
    );
  }
}

export default reduxForm({
  form: 'signup'
})(SignUpForm);

