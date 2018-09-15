import { RETRIEVE_NUMBER_SUCCESS, RETRIEVE_NUMBER_FAILURE, RETRIEVING_NUMBER } from '../actions/retrieveRandomNumbers'

let initialState = {
  numbers: [],
  time: '',
  loading: '',
  error: ''
}

const retrieveNumbers = (state = initialState, action) => {
  switch (action.type) {
    case RETRIEVE_NUMBER_SUCCESS:
      return Object.assign({}, state, {
        numbers: action.numbers,
        time: action.time
      })
    case RETRIEVE_NUMBER_FAILURE:
      return Object.assign({}, state, {
        error: action.error
      })
    case RETRIEVING_NUMBER:
      return Object.assign({}, state, {
        loading: action.loading
      })
    default:
      return state;
  }
}

export default retrieveNumbers
