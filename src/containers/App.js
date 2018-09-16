import React from 'react';
import { connect } from 'react-redux';

import { retrieveRandomNumbers } from '../actions/retrieveRandomNumbers';

import LineChart from '../components/LineChart'
import SubmitNumberForm from '../components/SubmitNumberForm'

const App = props => {
  return (
    <div>
      <h2 className="headline">Random Number Graphing</h2>
      <div className="form-container">
        <SubmitNumberForm retrieveRandomNumbers={props.retrieveRandomNumbers}/>
      </div>
      <LineChart {...props} />
    </div>
  )
}

const mapDispatchToProps = (dispatch) => (
  {retrieveRandomNumbers: (input) => dispatch(retrieveRandomNumbers(input))}
)

const mapStateToProps = (state) => ({
  numbers: state.retrieveNumbers.numbers,
  time: state.retrieveNumbers.time
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
