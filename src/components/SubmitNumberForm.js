import React from 'react'
import { Field, reduxForm, SubmissionError, reset, dispatch } from 'redux-form'

const renderField = ({ type, label, input, meta: { touched, error }}) => (
  <div className="input-row">
    <label>{label}</label>
    <input {...input} type={type}/>
    {touched && error &&
     <span className="error">{error}</span>}
  </div>
)

let SubmitNumberForm = ({ handleSubmit, retrieveRandomNumbers }) => {
  const submit = ({ number='' }, dispatch) => {
    let error = {};
    let isError = false;

    if (number.trim() === '' || !Number(number)) {
      error.number = 'Please input a number';
      isError = true;
    }
    if (isError) {
      throw new SubmissionError(error);
    } else {
      retrieveRandomNumbers(number)
      dispatch(reset('submitNumber'))
    }
  }

  return (
    <form onSubmit={handleSubmit(submit)} className="number-form">
      <Field name="number" component={renderField} type="text" />
      <button type="submit">Load</button>
    </form>
  )
}

SubmitNumberForm = reduxForm({ form: 'submitNumber' })(SubmitNumberForm)

export default SubmitNumberForm
