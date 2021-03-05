import { T_CalcArr } from "./calcTypes"

const baseFormulas: I_Formulas = {
  Slope: [["y2", "-", "y1"], "/", ["x2", "-", "x1"]],
}

interface I_Formulas {
  Slope: T_CalcArr
}

export default baseFormulas
