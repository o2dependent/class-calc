import { T_CalcArr } from './calcTypes';

export default function getArrayFromString(functionString: string): T_CalcArr {
	// split string
	let split: string[] | any = functionString.split('');

	// check for parenthesis
	// store objects of begining and ending of paren statement
	let hasParens = false;
	let stopper = 0;
	while (split.includes('(') && split.includes(')') && stopper <= 10) {
		let startParenIdx;
		let endParenIdx;
		for (let idx = 0; idx < split.length; idx++) {
			const val = split[idx];
			if (val === '(') {
				startParenIdx = idx;
			} else if (val === ')') {
				endParenIdx = idx;
			}
			// condense parens
			if (
				typeof startParenIdx === 'number' &&
				typeof endParenIdx === 'number'
			) {
				const condensed = split.slice(startParenIdx + 1, endParenIdx);
				const slice1 = split.slice(0, startParenIdx);
				const slice2 = split.slice(endParenIdx + 1, split.length);
				split = [...slice1, condensed, ...slice2];

				startParenIdx = undefined;
				endParenIdx = undefined;
				if (!hasParens) {
					hasParens = true;
				}
				break;
			}
		}
		stopper++;
	}

	if (!hasParens) return crunchFormula(split);
	console.log({ cruchParens: crunchParensFormula(split) });
	return crunchParensFormula(split);
}

function crunchFormula(split) {
	// order of operations
	const PEMDAS = ['*', '/', '+', '-'];
	// iteratate over PEMDAS and join ajacent indexes
	// ['a','+','b','*','c'] => ['a','+',['b','*','c']]
	PEMDAS.forEach((op) => {
		// find and store operators index that is in split arr
		// store operator indexes
		let opIdxArr = [];
		split.forEach((val, idx) => {
			if (val === op) {
				opIdxArr.push(idx);
			}
		});

		if (opIdxArr.length > 0 && split.length !== 3) {
			let opIdxOffset = 0;
			opIdxArr.forEach((rawSplitOpIdx) => {
				// offset idx by how many items have been removed
				const opIdx = rawSplitOpIdx - opIdxOffset;
				const condensed = [split[opIdx - 1], split[opIdx], split[opIdx + 1]];
				const slice1 = split.slice(0, opIdx - 1);
				const slice2 = split.slice(opIdx + 2, split.length);

				let newSplit = [];
				if (split.length !== 3) {
					if (slice1.length > 0) {
						newSplit = [...slice1];
					}

					newSplit = [...newSplit, condensed];

					if (slice2.length > 0) {
						newSplit = [...newSplit, ...slice2];
					}
					split = newSplit;

					opIdxOffset += 2;
				}
			});
		}
	});

	return split;
}

function crunchParensFormula(split) {
	split.forEach((el, idx) => {
		if (typeof el === 'object') {
			const condensed = crunchParensFormula(el);
			const slice1 = split.slice(0, idx);
			const slice2 = split.slice(idx + 1, split.length);
			split = [...slice1, condensed, ...slice2];
		}
	});

	return crunchFormula(split);
}

// input "a+b-c"
// output [["a","+","b"],"-","c"]

// --- steps ---
// extract out all parentheses and exponents
// - call getArrayFromString on this and return value
// extract out all * and /
// extract out all + and -
