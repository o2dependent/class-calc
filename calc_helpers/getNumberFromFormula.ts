import { T_BaseParsedArr, T_ParsedArr } from './calcTypes';
import math from './math';

export default function getNumberFromFormula(
	formula: T_ParsedArr | T_BaseParsedArr
): number {
	// --- steps ---
	// if the formula does not include additional arrays go about parsing the formula
	// then parse the array and get the return value
	// do this until you have one number

	// if the formula does not include additional arrays go about parsing the formula
	if (Array.isArray(formula[2])) {
		formula[2] = getNumberFromFormula(formula[2]);
	}
	if (Array.isArray(formula[0])) {
		formula[0] = getNumberFromFormula(formula[0]);
	}

	// then parse the array and get the return value
	if (
		formula.length === 3 &&
		typeof formula[0] === 'number' &&
		typeof formula[1] === 'string' &&
		Object.keys(math).includes(formula[1]) &&
		typeof formula[2] === 'number' &&
		typeof math[formula[1]] === 'function'
	) {
		console.log({
			formula,
			formulaResult: math[formula[1]](formula[0], formula[2]),
		});
		return math[formula[1]](formula[0], formula[2]);
	}
}
