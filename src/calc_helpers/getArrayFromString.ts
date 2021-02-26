import { T_CalcArr } from "./calcTypes"

export default function getArrayFromString(functionString: string): T_CalcArr {
  let arr: T_CalcArr
  ;['*','/',"+", "-"].forEach(op => {
    console.log(op)
    let split: T_CalcArr = [null, null, null]
    functionString.split(op).forEach((item, idx) => {
      // FIX this currently does not account for variables with a length longer than 2
      if (item.length >= 3 /* replace with a regex of all operators */) {
        split[idx] = getArrayFromString(item)
      }
    })
    arr.push(split)
  })
  return split
}

// input "a+b-c"
// output [["a","+","b"],"-","c"]

// --- steps ---
// extract out all parentheses and exponents
// - call getArrayFromString on this and return value
// extract out all * and /
// extract out all + and -
