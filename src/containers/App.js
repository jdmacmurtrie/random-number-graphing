import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form'

import { submitNumber } from '../actions/submitNumber';

import SubmitNumberForm from '../components/SubmitNumberForm'

const App = props => {
  console.log(props.number, 'submitted');
  return (
    <div>
      <h2 className="headline">Random Number Graphing</h2>
      <div className="form-container">
        <SubmitNumberForm submitNumber={props.submitNumber}/>
      </div>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    submitNumber: (number) => dispatch(submitNumber(number))
  }
}

const mapStateToProps = (state) => ({
    number: state.submitNumber.number
  })

export default connect(mapStateToProps, mapDispatchToProps)(App);
