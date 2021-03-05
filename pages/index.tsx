import Head from 'next/head';
import { useState } from 'react';
import { T_CalcArr } from '../calc_helpers/calcTypes';
import getArrayFromString from '../calc_helpers/getArrayFromString';
import getVariablesFromArray from '../calc_helpers/getVariablesFromArray';
import parseFormula from '../calc_helpers/parseFormula';
import styles from '../styles/Home.module.css';

export default function Home() {
	const stringFormula = '(a+b)/(a*c+(b+c))';
	const arr: T_CalcArr = getArrayFromString(stringFormula);
	const [variablesInput, setVariablesInput] = useState<object>(
		getVariablesFromArray(arr)
	);
	const [result, setResult] = useState<undefined | number>();

	return (
		<div className={styles.container}>
			<Head>
				<title>Create Next App</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<p>{stringFormula}</p>
			{result && <p>{result}</p>}
			<div
				style={{
					display: 'grid',
					gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
				}}
			>
				{Object.keys(variablesInput).map((variable) => (
					<div>
						<p>{variable}</p>
						<input
							type='number'
							key={variable}
							value={variablesInput[variable]}
							onChange={(e) =>
								setVariablesInput({
									...variablesInput,
									[variable]: Number(e.target.value),
								})
							}
						/>
					</div>
				))}
			</div>
			<button onClick={() => setResult(parseFormula(arr, variablesInput))}>
				Do thing
			</button>
			<button
				onClick={async () => {
					try {
						const res = await fetch('/api/formula/a+b*c', {
							method: 'GET',
						});
						const data = await res.json();
						console.log(data);
					} catch (err) {
						console.error(err);
					}
				}}
			>
				GET
			</button>
			<button
				onClick={async () => {
					try {
						const res = await fetch('/api/formula/', {
							method: 'POST',
							headers: {
								'Content-Type': 'application/json',
							},
							body: JSON.stringify({
								variables: { a: 2, b: 2, c: 3 },
								user_formula: 'a+b*c/b+a /c',
							}),
						});
						const data = await res.json();
						console.log(data);
					} catch (err) {
						console.error(err);
					}
				}}
			>
				POST
			</button>
		</div>
	);
}
