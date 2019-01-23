import React from 'react';
import Box from 'grommet/components/Box';
import Label from 'grommet/components/Label';
import Button from 'grommet/components/Button';
import Toast from 'grommet/components/Toast';
import { Field, reduxForm } from 'redux-form'
import { loginUser } from './actions';
import { connect } from 'react-redux';

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
    this.setState({error: ''});
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
            <Label>Email</Label>
            <Field name="email" component="input" type="text" />
          </Box>
          <Box margin="small" direction="row">
            <Label>Password</Label>
            <Field name="password" component="input" type="password" />
          </Box>
          <Button primary label="Submit" type="submit" />
        </form>
      </Box>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  loginUser: () => dispatch(loginUser()),
});

LoginForm = connect(
  null,
  mapDispatchToProps
)(LoginForm);

export default reduxForm({
  form: 'login'
})(LoginForm);


// import React, { Component } from 'react';
// import { Field, reduxForm } from 'redux-form'

// class ContactForm extends Component {
//   handleSubmit = (e) => {
//     console.log("in submit", e);
//     // e.preventDefault();
//   }
//   render() {
//     // const { handleSubmit } = this.props;
//     return (
//       <form onSubmit={this.handleSubmit}>
//         <div>
//           <label>First Name</label>
//           <Field name="firstName" component="input" type="text" />
//         </div>
//         <div>
//           <label>Last Name</label>
//           <Field name="lastName" component="input" type="text" />
//         </div>
//         <div>
//           <label>Email</label>
//           <Field name="email" component="input" type="email" />
//         </div>
//         <button type="submit">Submit</button>
//       </form>
//     );
//   }
// }

// // Decorate the form component
// ContactForm = reduxForm({
//   form: 'contact' // a unique name for this form
// })(ContactForm);

// export default ContactForm;