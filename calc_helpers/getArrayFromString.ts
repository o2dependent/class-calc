import { T_CalcArr } from './calcTypes';

export default function getArrayFromString(functionString: string): T_CalcArr {
	// check if string is valid to be converted

	// order of operations
	const PEMDAS = ['*', '/', '+', '-'];
	// split string
	let split: string[] | any = functionString.split('');

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
			console.log({ opIdxArr, split, op });
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

// input "a+b-c"
// output [["a","+","b"],"-","c"]

// --- steps ---
// extract out all parentheses and exponents
// - call getArrayFromString on this and return value
// extract out all * and /
// extract out all + and -
