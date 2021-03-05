import { T_BaseParsedArr, T_CalcArr, T_ParsedArr } from './calcTypes';
import math from './math';

// --- variables ---
// a = 1
// b = 2
// c = 3
// input [['a','+','b'],'*','c']
// output [[1,'+',2],'*',3]

export default function formulaFromArray(
	arr: T_CalcArr,
	variables: object
): T_ParsedArr | T_BaseParsedArr {
	let parsedArr: T_ParsedArr | T_BaseParsedArr = [null, null, null];
	console.log({ arr });

	// if index 0 is array => getFormulaFromArray
	// else if index 0 is string => get variables value of index
	if (Array.isArray(arr[0])) {
		parsedArr[0] = formulaFromArray(arr[0], variables);
	} else if (Object.keys(variables).includes(arr[0])) {
		parsedArr[0] = variables[arr[0]];
	}

	// if index 1 is a math function => add to parsedArr
	if (Object.keys(math).includes(arr[1])) {
		parsedArr[1] = arr[1];
	}

	// if index 2 is array => getFormulaFromArray
	// else if index 2 is string => get variables value of index
	if (Array.isArray(arr[2])) {
		parsedArr[2] = formulaFromArray(arr[2], variables);
	} else if (Object.keys(variables).includes(arr[2])) {
		parsedArr[2] = variables[arr[2]];
	}

	if (!parsedArr.includes(null)) {
		return parsedArr;
	}
}
