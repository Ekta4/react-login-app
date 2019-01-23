import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form'

class ContactForm extends Component {
  handleSubmit = () => {
    console.log("in submit");
  }
  render() {
    // const { handleSubmit } = this.props;
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <label>First Name</label>
          <Field name="firstName" component="input" type="text"/>
        </div>
        <div>
          <label>Last Name</label>
          <Field name="lastName" component="input" type="text"/>
        </div>
        <div>
          <label>Email</label>
          <Field name="email" component="input" type="email"/>
        </div>
        <button type="submit">Submit</button>
      </form>
    );
  }
}

// Decorate the form component
ContactForm = reduxForm({
  form: 'contact' // a unique name for this form
})(ContactForm);

export default ContactForm;