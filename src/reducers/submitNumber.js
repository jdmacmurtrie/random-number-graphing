import { SUBMITNUMBER } from '../actions/submitNumber'

let initialState = {
  number: [""]
}

const submitNumber = (state = initialState, action) => {
  switch (action.type) {
    case SUBMITNUMBER:
      return Object.assign({}, state, {
        number: action.input
      })
    default:
      return state;
  }
}

export default submitNumber
