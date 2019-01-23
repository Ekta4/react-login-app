import { connect } from 'react-redux';
import Form from './Form';
import { submitForm } from './actions';

const mapStateToProps = (state) => ({
  form: state.form
});

const mapDispatchToProps = (dispatch) => ({
  submitForm: () => dispatch(submitForm())
});
const FormContainer = connect(mapStateToProps, mapDispatchToProps)(Form);

export default FormContainer;
export { FormContainer as Form, mapStateToProps, mapDispatchToProps };