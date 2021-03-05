import { I_Math } from "./calcTypes"

const math: I_Math = {
  "+": (val1: number, val2: number): number => val1 + val2,
  "-": (val1: number, val2: number): number => val1 - val2,
  "*": (val1: number, val2: number): number => val1 * val2,
  "/": (val1: number, val2: number): number => val1 / val2,
  "^": (val1: number, val2: number): number => Math.pow(val1, val2),
}

export default math
