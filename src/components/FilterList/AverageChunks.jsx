import React from 'react'
import {Field, reduxForm} from 'redux-form'

export default reduxForm({form: 'average-chunks'})(({handleSubmit}) =>
  <form onSubmit={handleSubmit}>
    <h1>Average Chunks</h1>
    <summary>Makes histogram look weird.</summary>
    <div>
      <Field name="k" component="input" type="number"/>
    </div>
    <button type="submit">Apply</button>
  </form>
)
