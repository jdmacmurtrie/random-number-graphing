export const RETRIEVING_NUMBER = "RETRIEVING_NUMBER"
export const RETRIEVE_NUMBER_SUCCESS = "RETRIEVE_NUMBER_SUCCESS"
export const RETRIEVE_NUMBER_FAILURE = "RETRIEVE_NUMBER_FAILURE"

export const retrievingNumber = (loading) => {
  return {
    type: RETRIEVING_NUMBER,
    loading
  }
}

export const retrieveNumberSuccess = (result) => {
  return {
    type: RETRIEVE_NUMBER_SUCCESS,
    numbers: result.numbers,
    time: result.time
  }
}

export const retrieveNumberFailure = (error) => {
  return {
    type: RETRIEVE_NUMBER_FAILURE,
    error
  }
}

export const retrieveRandomNumbers = (input) => {
  return (dispatch) => {
    dispatch(retrievingNumber(true))
    const RandomOrg = require('random-org');
    const random = new RandomOrg({ apiKey: String(process.env.REACT_APP_RANDOM_KEY) });
    random.generateIntegers({ min: -100, max: 1000, n: input })
    .then(response => {
      dispatch(retrievingNumber(false));
      return ({
        numbers: response.random.data,
        time: response.random.completionTime
      })
    })
    .then(result => dispatch(retrieveNumberSuccess(result)))
    .catch(response => {
      dispatch(retrievingNumber(false));
      dispatch(retrieveNumberFailure(true))})
  }
}
