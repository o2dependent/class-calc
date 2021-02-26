export interface I_Math {
  "+": (val1: number, val2: number) => number
  "-": (val1: number, val2: number) => number
  "*": (val1: number, val2: number) => number
  "/": (val1: number, val2: number) => number
  "^": (val1: number, val2: number) => number
}

export type T_Operators = keyof I_Math
export type T_CalcArr =
  | [string, T_Operators, string]
  | [T_CalcArr, T_Operators, string]
  | [T_CalcArr, T_Operators, T_CalcArr]
  | [string, T_Operators, T_CalcArr]

export type T_BaseParsedArr = [number, T_Operators, number]
export type T_ParsedArr =
  | [T_BaseParsedArr, T_Operators, number]
  | [T_BaseParsedArr, T_Operators, T_BaseParsedArr]
  | [number, T_Operators, T_BaseParsedArr]
  | [T_ParsedArr, T_Operators, number]
  | [number, T_Operators, T_ParsedArr]
  | [T_ParsedArr, T_Operators, T_ParsedArr]
