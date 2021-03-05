import { NextApiRequest, NextApiResponse } from 'next';
import getArrayFromString from '../../../calc_helpers/getArrayFromString';
import getFormulaFromArray from '../../../calc_helpers/getFormulaFromArray';
import parseFormula from '../../../calc_helpers/parseFormula';

export default async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method === 'GET') {
		// GET req
		console.log('GET');
		res.status(200).json({ body: 'big body' });
	} else if (req.method === 'POST') {
		// Post req
		console.log('POST');

		const {
			variables,
			user_formula,
		}: { variables: object; user_formula: string } = req.body;
		// 400 => body not found
		if (!variables || !user_formula) {
			res.status(400).json({
				SUCCESS: false,
				MESSAGE: 'REQUEST BODY VARIABLES WAS NOT FOUND',
			});
		}

		try {
			console.log(user_formula);
			const arr = await getArrayFromString(user_formula);
			const val = await parseFormula(arr, variables);
			res.status(200).json(val);
		} catch (err) {
			// 400 => could not parse formula
			console.error(err);
			res.status(400).json({
				SUCCESS: false,
				MESSAGE:
					'REQUEST BODY WAS NOT ABLE TO BE PROCESSED - CHECK DOCS FOR FORMATING GUIDLINES',
			});
		}
	}
};
