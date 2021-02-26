import React, { useState } from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import parseFormula from "../calc_helpers/parseFormula"
import { T_CalcArr } from "../calc_helpers/calcTypes"
import getVariablesFromArray from "../calc_helpers/getVariablesFromArray"
import baseFormulas from "../calc_helpers/baseFormulas"
import getArrayFromString from "../calc_helpers/getArrayFromString"

const IndexPage = () => {
  const arr: T_CalcArr = baseFormulas["Slope"]
  const [variablesInput, setVariablesInput] = useState<object>(
    getVariablesFromArray(arr)
  )
  const [result, setResult] = useState<undefined | number>()

  getArrayFromString("a+b-c")

  return (
    <Layout>
      {result && <p>{result}</p>}
      <Grid>
        {Object.keys(variablesInput).map(variable => (
          <div>
            <Label>{variable}</Label>
            <input
              type="number"
              value={variablesInput[variable]}
              onChange={e =>
                setVariablesInput({
                  ...variablesInput,
                  [variable]: Number(e.target.value),
                })
              }
            />
          </div>
        ))}
      </Grid>
      <button onClick={() => setResult(parseFormula(arr, variablesInput))}>
        Do thing
      </button>
    </Layout>
  )
}

export default IndexPage

// --- styled-components ---
const Grid = styled.a`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
`

const Label = styled.p`
  margin: 0;
  margin-bottom: 0.5rem;
  font-size: 1.2rem;
`
