export const SUBMITNUMBER = "SUBMITNUMBER"

let submitNumber = (input) => {
  return {
    type: SUBMITNUMBER,
    input
  }
}

export { submitNumber };
