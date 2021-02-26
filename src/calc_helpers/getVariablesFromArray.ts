import { T_CalcArr } from "./calcTypes"
import math from "./math"

export default function getVariablesFromArray(arr: T_CalcArr): object {
  let variables = {}
  // iterate through array
  arr.forEach(item => {
    // check if type is array or string
    if (Array.isArray(item)) {
      variables = { ...variables, ...getVariablesFromArray(item) }
    } else if (typeof item === "string" && typeof math[item] === "undefined") {
      variables[item] = 0
    }
  })

  return variables
}
