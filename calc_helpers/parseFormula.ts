// store in an array and iterate over each index to apply
// each array within the array will be a function that will return a value
// * to check if the index is a function<Array>, variable<string>, value<number>, or operator<string> check for the type
// * if the type is string check if it exists on the math object
// * if the type is a string and not an operator the create a variable with the name
// after that function is executed return the result to the array index
// once all of the nested functions are complete repeat till their is only one index in the array
// x + y looks like[["x", "+", "y"]]
// check if val is in math obj

import { T_CalcArr } from './calcTypes';
import formulaFromArray from './formulaFromArray';
import getNumberFromFormula from './getNumberFromFormula';

export default function parseFormula(
	arr: T_CalcArr,
	variables: object
): number {
	// get formula
	const formula = formulaFromArray(arr, variables);
	// get result
	const result = getNumberFromFormula(formula);
	console.log({ result });
	return result;
}
