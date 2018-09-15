import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form'

import { retrieveRandomNumbers } from '../actions/retrieveRandomNumbers';

import LineChart from '../components/LineChart'
import SubmitNumberForm from '../components/SubmitNumberForm'

// const data = [
// 	{
// 		"month": "January",
// 		"revenue": "13432",
// 		"profit": "8342"
// 	},
// 	{
// 		"month": "February",
// 		"revenue": "19342",
// 		"profit": "10342"
// 	},
// 	{
// 		"month": "March",
// 		"revenue": "17443",
// 		"profit": "15423"
// 	},
// 	{
// 		"month": "April",
// 		"revenue": "26342",
// 		"profit": "18432"
// 	},
// 	{
// 		"month": "May",
// 		"revenue": "34213",
// 		"profit": "29434"
// 	},
// 	{
// 		"month": "June",
// 		"revenue": "50321",
// 		"profit": "45343"
// 	},
// 	{
// 		"month": "July",
// 		"revenue": "54273",
// 		"profit": "47452"
// 	}
// ]

const App = props => {
  console.log('numbers!', props.numbers);
  return (
    <div>
      <h2 className="headline">Random Number Graphing</h2>
			<LineChart data={props ? props.numbers : []} size={[500,500]} />
      <div className="form-container">
        <SubmitNumberForm retrieveRandomNumbers={props.retrieveRandomNumbers}/>
      </div>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    retrieveRandomNumbers: (input) => dispatch(retrieveRandomNumbers(input))
  }
}

const mapStateToProps = (state) => {
  return({
    numbers: state.retrieveNumbers.numbers
  })}

export default connect(mapStateToProps, mapDispatchToProps)(App);
