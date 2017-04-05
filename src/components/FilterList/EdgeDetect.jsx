import React from 'react'
import {reduxForm} from 'redux-form'

export default reduxForm({form: 'edge-detect'})(({handleSubmit}) =>
  <form onSubmit={handleSubmit}>
    <h1>Edge Detect</h1>
    <summary>Uses the <b>homogenity</b> strategy to detect edges.</summary>
    <button type="submit">Apply</button>
  </form>
)
