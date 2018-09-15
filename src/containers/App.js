import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form'

import { submitNumber } from '../actions/submitNumber';

import LineChart from '../components/LineChart'
import SubmitNumberForm from '../components/SubmitNumberForm'

const data = [
	{
		"month": "January",
		"revenue": "13432",
		"profit": "8342"
	},
	{
		"month": "February",
		"revenue": "19342",
		"profit": "10342"
	},
	{
		"month": "March",
		"revenue": "17443",
		"profit": "15423"
	},
	{
		"month": "April",
		"revenue": "26342",
		"profit": "18432"
	},
	{
		"month": "May",
		"revenue": "34213",
		"profit": "29434"
	},
	{
		"month": "June",
		"revenue": "50321",
		"profit": "45343"
	},
	{
		"month": "July",
		"revenue": "54273",
		"profit": "47452"
	}
]

const App = props => {
  console.log(props.number, 'submitted');
  return (
    <div>
      <h2 className="headline">Random Number Graphing</h2>
      <LineChart data={data} size={[500,500]} />
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
