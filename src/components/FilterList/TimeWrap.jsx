import React from 'react'
import {Field, reduxForm} from 'redux-form'

export default reduxForm({form: 'time-wrap'})(({handleSubmit}) =>
  <form onSubmit={handleSubmit}>
    <h1>Time Warp</h1>
    <summary>Applies some weird stuff.</summary>
    <div>
      <Field name="factor" component="input" type="number"/>
    </div>
    <button type="submit">Apply</button>
  </form>
)
